import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate, useMatch, Routes, Route } from 'react-router-dom';
import Breadcrumbs from './components/Breadcrumbs';
import Home from './components/Home';
import Shop from './components/Shop';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Tools from './components/Tools';
import Sounds from './components/Sounds';
import PRODUCTS from './content/products.json';
import BLOG_POSTS from './content/blogPosts.json';
import TOOLS_DATA from './content/tools.json';

const BRAND_COLORS = {
  teal: '#1A5F7A',
  gold: '#C8963E',
  ivory: '#FAF7F0'
};

// AdminPage.jsx is gitignored (local-only tooling) — glob it so the build
// doesn't fail when the file isn't present (e.g. fresh checkouts, production).
const adminPageModules = import.meta.glob('./components/AdminPage.jsx');
const AdminPageLazy = adminPageModules['./components/AdminPage.jsx']
  ? lazy(adminPageModules['./components/AdminPage.jsx'])
  : null;

const NAV_PAGES = ['home', 'shop', 'blog', 'tools', 'sounds'];
const NAV_LABELS = { home: 'Home', shop: 'Shop', blog: 'Journal', tools: 'Tools', sounds: 'Sounds' };

export default function App() {
  const location = useLocation();
  const navigateRouter = useNavigate();
  const products = PRODUCTS;
  const blogPosts = BLOG_POSTS;
  const toolsData = TOOLS_DATA;
  const blogMatch = useMatch('/blog/:postId');
  const activePost = blogMatch ? blogPosts.find((p) => p.id.toString() === blogMatch.params.postId) : null;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentPage = blogMatch
    ? 'blogPost'
    : location.pathname === '/' ? 'home'
    : location.pathname === '/shop' ? 'shop'
    : location.pathname === '/blog' ? 'blog'
    : location.pathname === '/tools' ? 'tools'
    : location.pathname === '/sounds' ? 'sounds'
    : location.pathname === '/admin' ? 'admin'
    : 'home';

  const navigate = (page, data = null) => {
    const paths = { shop: '/shop', blog: '/blog', blogPost: data?.id ? `/blog/${data.id}` : '/blog', tools: '/tools', sounds: '/sounds', admin: '/admin' };
    navigateRouter(paths[page] ?? '/');
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden" style={{ backgroundColor: BRAND_COLORS.ivory, fontFamily: "'DM Sans', system-ui, sans-serif", color: BRAND_COLORS.teal }}>

      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-[#FAF7F0]/96 backdrop-blur-sm" style={{ borderBottom: '1px solid rgba(200,150,62,0.18)' }}>
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button onClick={() => navigate('home')} className="flex-shrink-0">
              <span className="text-lg md:text-xl font-bold tracking-[0.18em]" style={{ fontFamily: "'Cinzel', serif", color: BRAND_COLORS.teal }}>
                NOOR <span style={{ color: BRAND_COLORS.gold }}>CREATIVE</span> ATELIER
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_PAGES.map((page) => (
                <button
                  key={page}
                  onClick={() => navigate(page)}
                  className="relative text-[11px] font-medium tracking-[0.18em] uppercase transition-colors pb-0.5"
                  style={{ color: currentPage === page ? BRAND_COLORS.gold : BRAND_COLORS.teal }}
                >
                  {NAV_LABELS[page]}
                  {currentPage === page && (
                    <span className="absolute -bottom-px left-0 right-0 h-[1.5px]" style={{ backgroundColor: BRAND_COLORS.gold }} />
                  )}
                </button>
              ))}
            </nav>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 -mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-slideDown" style={{ borderTop: '1px solid rgba(26,95,122,0.08)', backgroundColor: '#FAF7F0' }}>
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_PAGES.map((page) => (
                <button
                  key={page}
                  onClick={() => navigate(page)}
                  className="text-left py-3 text-[11px] font-medium tracking-[0.18em] uppercase border-b"
                  style={{ color: currentPage === page ? BRAND_COLORS.gold : BRAND_COLORS.teal, borderColor: 'rgba(26,95,122,0.06)' }}
                >
                  {NAV_LABELS[page]}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* BREADCRUMBS */}
      <Breadcrumbs currentPage={currentPage} activePost={activePost} navigate={navigate} brandColors={BRAND_COLORS} />

      {/* MAIN */}
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Home navigate={navigate} products={products} brandColors={BRAND_COLORS} />} />
          <Route path="/shop" element={<Shop products={products} brandColors={BRAND_COLORS} />} />
          <Route path="/blog" element={<Blog navigate={navigate} posts={blogPosts} brandColors={BRAND_COLORS} />} />
          <Route path="/blog/:postId" element={<BlogPost post={activePost} navigate={navigate} brandColors={BRAND_COLORS} />} />
          <Route path="/tools" element={<Tools brandColors={BRAND_COLORS} toolsData={toolsData} />} />
          <Route path="/sounds" element={<Sounds brandColors={BRAND_COLORS} />} />
          {AdminPageLazy && (
            <Route
              path="/admin"
              element={
                <Suspense fallback={<div className="py-32 text-center text-sm opacity-50">Loading admin…</div>}>
                  <AdminPageLazy brandColors={BRAND_COLORS} />
                </Suspense>
              }
            />
          )}
          <Route path="*" element={<Home navigate={navigate} products={products} brandColors={BRAND_COLORS} />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: BRAND_COLORS.teal, color: BRAND_COLORS.ivory }}>
        <div className="w-full px-6 md:px-12 lg:px-20 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Brand */}
            <div>
              <p className="text-base font-bold tracking-[0.18em] mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
                NOOR <span style={{ color: BRAND_COLORS.gold }}>CREATIVE</span> ATELIER
              </p>
              <p className="text-sm opacity-60 leading-relaxed max-w-xs">
                Premium Islamic digital resources for Muslim families at every stage of life.
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="text-[10px] font-medium tracking-[0.2em] uppercase mb-5 opacity-50">Explore</p>
              <ul className="space-y-3">
                {[['shop', 'Digital Shop'], ['tools', 'Islamic Tools'], ['sounds', 'Ambient Sounds'], ['blog', 'The Journal']].map(([page, label]) => (
                  <li key={page}>
                    <button onClick={() => navigate(page)} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                      {label}
                    </button>
                  </li>
                ))}
                {AdminPageLazy && (
                  <li><button onClick={() => navigate('admin')} className="text-sm opacity-40 hover:opacity-60 transition-opacity">Admin</button></li>
                )}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-[10px] font-medium tracking-[0.2em] uppercase mb-5 opacity-50">Newsletter</p>
              <p className="text-sm opacity-60 leading-relaxed mb-5">
                Get a free <em>'30 Days of Dua Chart'</em> printable when you sign up.
              </p>
              <form className="flex gap-0" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 text-sm bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 text-[11px] font-medium tracking-[0.15em] uppercase text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: BRAND_COLORS.gold }}
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-sm opacity-60 font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
            <p className="text-xs opacity-40 tracking-wide">&copy; 2026 Noor Creative Atelier. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
