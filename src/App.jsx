import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate, useMatch, Routes, Route } from 'react-router-dom';
import Breadcrumbs from './components/Breadcrumbs';
import Home from './components/Home';
import Shop from './components/Shop';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Tools from './components/Tools';
import Sounds from './components/Sounds';
import AdminPanel from './components/AdminPanel';

const BRAND_COLORS = {
  teal: '#1A5F7A',
  gold: '#C8963E',
  ivory: '#FAF7F0'
};

const PRODUCTS = [
  {
    id: 1,
    title: 'Noor Quest Book 1 (PDF)',
    price: 6.99,
    type: 'eBook',
    category: 'eBooks & Stories',
    image: 'https://placehold.co/400x500/1A5F7A/FAF7F0?text=Noor+Quest+Book+1',
    purchaseLinks: [
      { platform: 'Etsy', url: 'https://www.etsy.com/search?q=noor+quest+book' },
      { platform: 'Gumroad', url: 'https://gumroad.com/search?q=noor+quest+book' },
    ],
  },
  {
    id: 2,
    title: '99 Names of Allah Coloring Book',
    price: 4.99,
    type: 'Printable',
    category: 'Coloring & Activities',
    image: 'https://placehold.co/400x500/1A5F7A/FAF7F0?text=99+Names+Coloring',
    purchaseLinks: [
      { platform: 'Etsy', url: 'https://www.etsy.com/search?q=99+names+coloring+book' },
      { platform: 'Gumroad', url: 'https://gumroad.com/search?q=99+names+coloring+book' },
    ],
  },
  {
    id: 3,
    title: 'Ramadan Activity Planner',
    price: 3.99,
    type: 'Printable',
    category: 'Planners & Journals',
    image: 'https://placehold.co/400x500/1A5F7A/FAF7F0?text=Ramadan+Planner',
    purchaseLinks: [
      { platform: 'Etsy', url: 'https://www.etsy.com/search?q=ramadan+activity+planner' },
      { platform: 'Gumroad', url: 'https://gumroad.com/search?q=ramadan+activity+planner' },
    ],
  },
  {
    id: 4,
    title: 'Islamic Kids Journal — My Dua Book',
    price: 5.99,
    type: 'Printable',
    category: 'Planners & Journals',
    image: 'https://placehold.co/400x500/1A5F7A/FAF7F0?text=My+Dua+Book',
    purchaseLinks: [
      { platform: 'Etsy', url: 'https://www.etsy.com/search?q=my+dua+book' },
      { platform: 'Gumroad', url: 'https://gumroad.com/search?q=my+dua+book' },
    ],
  },
  {
    id: 5,
    title: '99 Names Flash Cards',
    price: 2.99,
    type: 'Printable',
    category: 'Coloring & Activities',
    image: 'https://placehold.co/400x500/1A5F7A/FAF7F0?text=99+Names+Flashcards',
    purchaseLinks: [
      { platform: 'Etsy', url: 'https://www.etsy.com/search?q=99+names+flashcards' },
      { platform: 'Gumroad', url: 'https://gumroad.com/search?q=99+names+flashcards' },
    ],
  },
];

const BLOG_POSTS = [
  { id: 1, title: 'How to Teach Your Child the 99 Names of Allah at Home', category: 'Parenting', date: 'Oct 12, 2026', content: "Teaching the 99 Names of Allah (Asma ul Husna) to children is one of the most beautiful ways to introduce them to their Creator.\n\nStart by incorporating just one name a day into your daily routine. For example, when feeding them, remind them that Allah is Ar-Razzaq (The Provider). When they make a mistake and you forgive them, teach them about Al-Ghafoor (The Forgiving).\n\nConsistency is key. Use visual aids like flashcards or coloring books to make the learning process engaging and interactive." },
  { id: 2, title: 'The Best Islamic Coloring Books for Muslim Children (2026)', category: 'Resources', date: 'Oct 15, 2026', content: "Finding high-quality Islamic coloring books can be challenging, but it's an excellent way to combine creativity with deen.\n\nOur top picks for 2026 focus on books that not only provide beautiful illustrations but also include educational snippets. Look for coloring books that cover topics like the Prophets, the 99 Names of Allah, and basic daily duas.\n\nArt is a powerful medium for young minds to absorb complex concepts in a simplified, enjoyable manner." },
  { id: 3, title: '10 Ramadan Activities for Kids That Actually Work', category: 'Ramadan', date: 'Oct 18, 2026', content: "Ramadan is a magical time, and making it special for children helps instill a lifelong love for the holy month.\n\nInstead of just focusing on fasting (which may be difficult for young ones), create a festive atmosphere. Decorate the house together, make a 'Good Deeds' jar, and involve them in preparing Iftar.\n\nA Ramadan Activity Planner can keep them engaged with daily tasks, simple crafts, and age-appropriate learning goals, making them feel like active participants in the blessed month." },
  { id: 4, title: 'Why Islamic Journaling is Sunnah for Muslim Children', category: 'Spiritual', date: 'Oct 22, 2026', content: "Journaling is more than just keeping a diary; it's a tool for self-reflection (Muhasabah), which is deeply rooted in Islamic tradition.\n\nEncouraging children to journal their thoughts, duas, and things they are grateful for helps them develop a strong connection with Allah. It teaches them mindfulness and emotional regulation through an Islamic lens.\n\nStart with guided journals that prompt them to think about their blessings, their daily prayers, and their goals for the hereafter." },
];

const TOOLS_DATA = [
  { id: 'tool-1', type: 'zakat', title: 'Zakat Calculator', description: 'Calculate your 2.5% Zakat on total eligible wealth (savings, gold, investments).', buttonLabel: 'Calculate Zakat', buttonUrl: '#', extraInfo: '' },
  { id: 'tool-2', type: 'hijri', title: 'Hijri Converter', description: 'Convert Gregorian dates to the Islamic Hijri calendar.', buttonLabel: 'Convert Date', buttonUrl: '#', extraInfo: 'Today: 14 Jumada al-Ula, 1448 AH' },
  { id: 'tool-3', type: 'prayer', title: 'Prayer Time Finder', description: 'Local prayer times based on your city.', buttonLabel: 'Detect Location', buttonUrl: '#', extraInfo: '' },
  { id: 'tool-4', type: 'countdown', title: 'Ramadan 2027 Countdown', description: 'Countdown to the next Ramadan with an easy reference display.', buttonLabel: '', buttonUrl: '', extraInfo: '112 Days • 14 Hours • 30 Mins' },
];

const SOUNDS_DATA = [
  { id: 'sound-1', title: 'Raindrops & Distant Thunder for Deep Focus', subtitle: '2 Hours • No Instruments', image: 'https://placehold.co/800x450/1A5F7A/FAF7F0?text=Ambient+Soundscape+1', link: '#' },
  { id: 'sound-2', title: 'Soft Prayer Room Ambience', subtitle: '1.5 Hours • Pure Vocal Focus', image: 'https://placehold.co/800x450/1A5F7A/FAF7F0?text=Ambient+Soundscape+2', link: '#' },
  { id: 'sound-3', title: 'Oud-Free Evening Remembrance', subtitle: '3 Hours • Subtle Wind Chimes', image: 'https://placehold.co/800x450/1A5F7A/FAF7F0?text=Ambient+Soundscape+3', link: '#' },
];

const NAV_PAGES = ['home', 'shop', 'blog', 'tools', 'sounds'];
const NAV_LABELS = { home: 'Home', shop: 'Shop', blog: 'Journal', tools: 'Tools', sounds: 'Sounds' };

export default function App() {
  const location = useLocation();
  const navigateRouter = useNavigate();
  const [products, setProducts] = useState(PRODUCTS);
  const [blogPosts, setBlogPosts] = useState(BLOG_POSTS);
  const [toolsData, setToolsData] = useState(TOOLS_DATA);
  const [soundscapes, setSoundscapes] = useState(SOUNDS_DATA);
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
          <Route path="/sounds" element={<Sounds brandColors={BRAND_COLORS} soundscapes={soundscapes} />} />
          <Route path="/admin" element={<AdminPanel products={products} setProducts={setProducts} posts={blogPosts} setPosts={setBlogPosts} toolsData={toolsData} setToolsData={setToolsData} soundscapes={soundscapes} setSoundscapes={setSoundscapes} brandColors={BRAND_COLORS} />} />
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
                <li><button onClick={() => navigate('admin')} className="text-sm opacity-40 hover:opacity-60 transition-opacity">Admin</button></li>
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
