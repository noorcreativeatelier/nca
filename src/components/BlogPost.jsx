import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function markdownComponents(brandColors) {
  const teal = brandColors.teal;
  const gold = brandColors.gold;
  const serif = "'Cormorant Garamond', serif";

  return {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-light mt-12 mb-4" style={{ fontFamily: serif, color: teal }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium mt-8 mb-3" style={{ fontFamily: serif, color: teal }}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-semibold mt-6 mb-2" style={{ color: teal }}>
        {children}
      </h4>
    ),
    p: ({ children, node }) => {
      const hasImage = node?.children?.some((c) => c.tagName === 'img');
      if (hasImage) return <>{children}</>;
      return <p className="text-base leading-[1.85] opacity-75 mb-1">{children}</p>;
    },
    strong: ({ children }) => (
      <strong className="font-semibold" style={{ color: teal, opacity: 1 }}>{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic" style={{ opacity: 0.85 }}>{children}</em>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="pl-5 my-6 py-1"
        style={{ borderLeft: `3px solid ${gold}`, color: teal, opacity: 0.85 }}
      >
        {children}
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 my-4 text-base leading-[1.85] opacity-75">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 my-4 text-base leading-[1.85] opacity-75">{children}</ol>
    ),
    li: ({ children }) => <li>{children}</li>,
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="underline transition-opacity hover:opacity-70"
        style={{ color: gold }}
      >
        {children}
      </a>
    ),
    img: ({ src, alt }) => (
      <figure className="my-8">
        <img
          src={src}
          alt={alt || ''}
          className="w-full h-auto"
          style={{ border: '1px solid rgba(26,95,122,0.08)' }}
        />
        {alt && (
          <figcaption className="text-xs text-center opacity-50 mt-3">{alt}</figcaption>
        )}
      </figure>
    ),
    hr: () => (
      <hr className="my-10 border-0 h-px" style={{ backgroundColor: gold, opacity: 0.35 }} />
    ),
    code: ({ inline, children }) =>
      inline ? (
        <code
          className="px-1.5 py-0.5 text-[0.9em] rounded"
          style={{ backgroundColor: 'rgba(26,95,122,0.07)', color: teal }}
        >
          {children}
        </code>
      ) : (
        <pre
          className="overflow-x-auto p-5 my-6 text-sm leading-relaxed rounded"
          style={{ backgroundColor: 'rgba(26,95,122,0.05)', color: teal }}
        >
          <code>{children}</code>
        </pre>
      ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="text-left px-3 py-2 text-xs font-medium uppercase tracking-wider" style={{ borderBottom: `2px solid ${gold}`, color: teal }}>
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-3 py-2" style={{ borderBottom: '1px solid rgba(26,95,122,0.1)' }}>
        {children}
      </td>
    ),
  };
}

export default function BlogPost({ post, navigate, brandColors }) {
  if (!post) {
    return (
      <div className="w-full px-6 py-32 text-center animate-fadeIn">
        <p className="text-sm opacity-50">Post not found.</p>
        <button onClick={() => navigate('blog')} className="mt-6 text-xs tracking-[0.15em] uppercase font-medium underline" style={{ color: brandColors.teal }}>
          Back to Journal
        </button>
      </div>
    );
  }

  const components = markdownComponents(brandColors);

  return (
    <div className="animate-fadeIn w-full">
      {/* Hero image */}
      <div
        className="w-full"
        style={{
          height: '50vh',
          minHeight: '320px',
          backgroundImage: `url('${post.banner || `https://placehold.co/1600x800/${brandColors.teal.replace('#', '')}/FAF7F0?text=`}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto">
          {/* Back */}
          <button
            onClick={() => navigate('blog')}
            className="flex items-center gap-2 mt-10 mb-10 text-[10px] tracking-[0.18em] uppercase font-medium transition-opacity hover:opacity-60"
            style={{ color: brandColors.teal }}
          >
            <ArrowLeft size={14} /> Back to Journal
          </button>

          {/* Meta */}
          <p className="text-[10px] tracking-[0.22em] uppercase font-medium mb-4" style={{ color: brandColors.gold }}>
            {post.category} · {post.date}
          </p>

          {/* Title */}
          <h1
            className="text-4xl md:text-5xl font-light leading-tight mb-10"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal }}
          >
            {post.title}
          </h1>

          {/* Divider */}
          <div className="w-10 h-px mb-10" style={{ backgroundColor: brandColors.gold }} />

          {/* Body */}
          <div className="pb-16">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Share bar */}
          <div
            className="flex items-center justify-between py-6 mb-12"
            style={{ borderTop: '1px solid rgba(26,95,122,0.1)', borderBottom: '1px solid rgba(26,95,122,0.1)' }}
          >
            <p className="text-[10px] tracking-[0.18em] uppercase opacity-50">Share</p>
            <div className="flex gap-6">
              {['Facebook', 'Twitter', 'Email'].map((platform) => (
                <button key={platform} className="text-[10px] tracking-[0.15em] uppercase font-medium transition-opacity hover:opacity-60" style={{ color: brandColors.teal }}>
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="w-full py-20" style={{ backgroundColor: brandColors.teal }}>
        <div className="max-w-xl mx-auto text-center px-6">
          <p className="text-[10px] tracking-[0.25em] uppercase font-medium mb-4" style={{ color: brandColors.gold }}>
            Continue the Journey
          </p>
          <h2 className="text-3xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.ivory }}>
            Explore Related Resources
          </h2>
          <p className="text-sm opacity-60 mb-8" style={{ color: brandColors.ivory }}>
            Browse our premium digital collection designed to complement your Islamic parenting journey.
          </p>
          <button
            onClick={() => navigate('shop')}
            className="px-10 py-4 text-[11px] font-medium tracking-[0.18em] uppercase text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: brandColors.gold }}
          >
            Shop Resources
          </button>
        </div>
      </div>
    </div>
  );
}
