import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const CONTENT_FILES = {
  products: 'products.json',
  blogPosts: 'blogPosts.json',
  tools: 'tools.json',
  hijriDays: 'hijriDays.json',
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => { data += chunk })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

// Turns raw extracted document text into our "blank line between paragraphs" format.
function normalizeExtractedText(raw) {
  // Strip pdf-parse's "-- N of M --" page-separator lines.
  const cleaned = raw.replace(/^--\s*\d+\s*of\s*\d+\s*--$/gm, '')

  let blocks = cleaned
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean)

  // PDFs often don't preserve blank lines between paragraphs — fall back to one paragraph per line.
  if (blocks.length <= 1) {
    blocks = cleaned.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  }

  return blocks.join('\n\n')
}

// Dev-only API so the (gitignored) admin page can read/write the content
// JSON files and store uploaded images on disk. Not present in production builds.
function adminApiPlugin() {
  const contentDir = path.join(__dirname, 'src/content')
  const uploadsDir = path.join(__dirname, 'public/images/uploads')

  return {
    name: 'admin-content-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/admin/')) return next()

        try {
          if (req.url.startsWith('/api/admin/content/')) {
            const key = req.url.slice('/api/admin/content/'.length).split('?')[0]
            const filename = CONTENT_FILES[key]
            if (!filename) {
              res.statusCode = 404
              res.end('Unknown content type')
              return
            }
            const filePath = path.join(contentDir, filename)

            if (req.method === 'GET') {
              res.setHeader('Content-Type', 'application/json')
              res.end(fs.readFileSync(filePath, 'utf-8'))
              return
            }

            if (req.method === 'POST' || req.method === 'PUT') {
              const body = await readRequestBody(req)
              const parsed = JSON.parse(body)
              fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2) + '\n', 'utf-8')
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: true }))
              return
            }
          }

          if (req.url === '/api/admin/upload' && req.method === 'POST') {
            const body = await readRequestBody(req)
            const { filename, dataUrl } = JSON.parse(body)
            const match = /^data:([^;]+);base64,(.*)$/.exec(dataUrl || '')
            if (!match) {
              res.statusCode = 400
              res.end('Invalid image data')
              return
            }
            const buffer = Buffer.from(match[2], 'base64')
            const safeName = `${Date.now()}-${String(filename || 'image').replace(/[^a-zA-Z0-9.\-_]/g, '_')}`
            fs.mkdirSync(uploadsDir, { recursive: true })
            fs.writeFileSync(path.join(uploadsDir, safeName), buffer)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ path: `/images/uploads/${safeName}` }))
            return
          }

          if (req.url === '/api/admin/extract' && req.method === 'POST') {
            const body = await readRequestBody(req)
            const { filename, dataUrl } = JSON.parse(body)
            const match = /^data:([^;]+);base64,(.*)$/.exec(dataUrl || '')
            if (!match) {
              res.statusCode = 400
              res.end('Invalid file data')
              return
            }
            const buffer = Buffer.from(match[2], 'base64')
            const ext = path.extname(String(filename || '')).toLowerCase()

            let rawText
            if (ext === '.docx') {
              const mammoth = await import('mammoth')
              rawText = (await mammoth.extractRawText({ buffer })).value
            } else if (ext === '.pdf') {
              const { PDFParse } = await import('pdf-parse')
              const parser = new PDFParse({ data: buffer })
              try {
                rawText = (await parser.getText()).text
              } finally {
                await parser.destroy()
              }
            } else {
              res.statusCode = 400
              res.end('Unsupported file type — upload a .docx or .pdf')
              return
            }

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ content: normalizeExtractedText(rawText) }))
            return
          }

          res.statusCode = 404
          res.end('Not found')
        } catch (err) {
          res.statusCode = 500
          res.end(String(err && err.message ? err.message : err))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    adminApiPlugin(),
  ],
})
