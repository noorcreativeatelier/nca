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

// --- CONFIGURATION & DATA ---
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
  {
    id: 'tool-1',
    type: 'zakat',
    title: 'Zakat Calculator',
    description: 'Calculate your 2.5% Zakat on total eligible wealth (savings, gold, investments).',
    buttonLabel: 'Calculate Zakat',
    buttonUrl: '#',
    extraInfo: '',
  },
  {
    id: 'tool-2',
    type: 'hijri',
    title: 'Hijri Converter',
    description: 'Convert Gregorian dates to the Islamic Hijri calendar.',
    buttonLabel: 'Convert Date',
    buttonUrl: '#',
    extraInfo: 'Today: 14 Jumada al-Ula, 1448 AH',
  },
  {
    id: 'tool-3',
    type: 'prayer',
    title: 'Prayer Time Finder',
    description: 'Local prayer times based on your city.',
    buttonLabel: 'Detect Location',
    buttonUrl: '#',
    extraInfo: '',
  },
  {
    id: 'tool-4',
    type: 'countdown',
    title: 'Ramadan 2027 Countdown',
    description: 'Countdown to the next Ramadan with an easy reference display.',
    buttonLabel: '',
    buttonUrl: '',
    extraInfo: '112 Days • 14 Hours • 30 Mins',
  },
];

const SOUNDS_DATA = [
  {
    id: 'sound-1',
    title: 'Raindrops & Distant Thunder for Deep Focus',
    subtitle: '2 Hours • No Instruments',
    image: 'https://placehold.co/800x450/1A5F7A/FAF7F0?text=Ambient+Soundscape+1',
    link: '#',
  },
  {
    id: 'sound-2',
    title: 'Soft Prayer Room Ambience',
    subtitle: '1.5 Hours • Pure Vocal Focus',
    image: 'https://placehold.co/800x450/1A5F7A/FAF7F0?text=Ambient+Soundscape+2',
    link: '#',
  },
  {
    id: 'sound-3',
    title: 'Oud-Free Evening Remembrance',
    subtitle: '3 Hours • Subtle Wind Chimes',
    image: 'https://placehold.co/800x450/1A5F7A/FAF7F0?text=Ambient+Soundscape+3',
    link: '#',
  },
];

// --- MAIN APP COMPONENT ---
export default function App() {
  const location = useLocation();
  const navigateRouter = useNavigate();
  const [products, setProducts] = useState(PRODUCTS);
  const [blogPosts, setBlogPosts] = useState(BLOG_POSTS);
  const [toolsData, setToolsData] = useState(TOOLS_DATA);
  const [soundscapes, setSoundscapes] = useState(SOUNDS_DATA);
  const blogMatch = useMatch('/blog/:postId');
  const activePost = blogMatch ? blogPosts.find((post) => post.id.toString() === blogMatch.params.postId) : null;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentPage = blogMatch
    ? 'blogPost'
    : location.pathname === '/'
    ? 'home'
    : location.pathname === '/shop'
    ? 'shop'
    : location.pathname === '/blog'
    ? 'blog'
    : location.pathname === '/tools'
    ? 'tools'
    : location.pathname === '/sounds'
    ? 'sounds'
    : location.pathname === '/admin'
    ? 'admin'
    : 'home';

  const navigate = (page, data = null) => {
    let path = '/';

    switch (page) {
      case 'shop':
        path = '/shop';
        break;
      case 'blog':
        path = '/blog';
        break;
      case 'blogPost':
        path = data?.id ? `/blog/${data.id}` : '/blog';
        break;
      case 'tools':
        path = '/tools';
        break;
      case 'sounds':
        path = '/sounds';
        break;
      case 'admin':
        path = '/admin';
        break;
      default:
        path = '/';
    }

    navigateRouter(path);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Inject Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@400;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-serif w-full overflow-x-hidden" style={{ backgroundColor: BRAND_COLORS.ivory, color: BRAND_COLORS.teal, fontFamily: "'Amiri', serif" }}>
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-[#FAF7F0]/95 backdrop-blur shadow-sm border-b border-[#C8963E]/20">
        <div className="w-full px-4 md:px-12 lg:px-24 2xl:px-32">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer flex flex-col justify-center" onClick={() => navigate('home')}>
              <h1 className="text-2xl md:text-3xl font-bold tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
                NOOR <span style={{ color: BRAND_COLORS.gold }}>CREATIVE</span> ATELIER
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {['home', 'shop', 'blog', 'tools', 'sounds'].map((page) => (
                <button
                  key={page}
                  onClick={() => navigate(page)}
                  className={`text-lg uppercase tracking-widest hover:text-[#C8963E] transition-colors ${currentPage === page ? 'text-[#C8963E] font-bold' : ''}`}
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {page}
                </button>
              ))}
            </nav>

            {/* Cart & Mobile Toggle */}
                  <div className="flex items-center space-x-4">
              <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#FAF7F0] border-b border-[#1A5F7A]/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['home', 'shop', 'blog', 'tools', 'sounds'].map((page) => (
                <button
                  key={page}
                  onClick={() => navigate(page)}
                  className="block w-full text-left px-3 py-2 text-base font-medium uppercase tracking-widest hover:bg-[#1A5F7A]/5 hover:text-[#C8963E]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* BREADCRUMBS */}
      <Breadcrumbs currentPage={currentPage} activePost={activePost} navigate={navigate} brandColors={BRAND_COLORS} />

      {/* MAIN CONTENT AREA */}
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

      {/* FOOTER - Email List (Rule #5) */}
      <footer className="w-full" style={{ backgroundColor: BRAND_COLORS.teal, color: BRAND_COLORS.ivory }}>
        <div className="w-full px-4 md:px-12 lg:px-24 2xl:px-32 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Noor Creative Atelier</h2>
              <p className="opacity-80 text-lg">Inspiring meaningful Islamic learning for every stage of life.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Cinzel', serif", color: BRAND_COLORS.gold }}>Quick Links</h3>
              <ul className="space-y-2 opacity-80">
                <li><button onClick={() => navigate('shop')} className="hover:text-[#C8963E]">Digital Shop</button></li>
                <li><button onClick={() => navigate('tools')} className="hover:text-[#C8963E]">Islamic Tools</button></li>
                <li><button onClick={() => navigate('sounds')} className="hover:text-[#C8963E]">Ambient Sounds</button></li>
                <li><button onClick={() => navigate('admin')} className="hover:text-[#C8963E]">Admin Panel</button></li>
                <li><a href="#" className="hover:text-[#C8963E]">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Cinzel', serif", color: BRAND_COLORS.gold }}>Join Our Newsletter</h3>
              <p className="opacity-80 mb-4">Get a free '30 Days of Dua Chart' printable when you sign up.</p>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-2 w-full rounded-l text-[#1A5F7A] focus:outline-none"
                />
                <button className="px-4 py-2 rounded-r font-bold text-white hover:opacity-90" style={{ backgroundColor: BRAND_COLORS.gold }}>
                  Join
                </button>
              </form>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/20 text-center opacity-60 text-sm">
            <p>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
            <p>&copy; 2026 Noor Creative Atelier. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

