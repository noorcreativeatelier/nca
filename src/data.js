// --- MOCK DATABASE (Simulating MongoDB/Express Backend) ---
export const CATEGORIES = [
  { id: 'cat-1', name: 'Activity Books', description: 'Coloring and quest books', color: 'bg-teal-100 text-teal-800' },
  { id: 'cat-2', name: 'Printables', description: 'Planners and charts', color: 'bg-amber-100 text-amber-800' },
  { id: 'cat-3', name: 'Journals', description: 'Daily reflection and dua', color: 'bg-emerald-100 text-emerald-800' },
  { id: 'cat-4', name: 'Educational', description: 'Flash cards and tools', color: 'bg-sky-100 text-sky-800' }
];

export const PRODUCTS = [
  { id: 'p1', categoryId: 'cat-1', name: 'Noor Quest Book 1 (PDF)', price: 6.99, description: 'An Islamic adventure activity book for kids. High-quality printable PDF.', image: 'https://placehold.co/400x300/1A5F7A/FAF7F0?text=Noor+Quest', externalLink: 'https://gumroad.com', platform: 'Gumroad' },
  { id: 'p2', categoryId: 'cat-1', name: '99 Names of Allah Coloring Book', price: 4.99, description: 'Learn the beautiful names of Allah through engaging coloring pages.', image: 'https://placehold.co/400x300/1A5F7A/FAF7F0?text=99+Names+Coloring', externalLink: 'https://etsy.com', platform: 'Etsy' },
  { id: 'p3', categoryId: 'cat-2', name: 'Ramadan Activity Planner', price: 3.99, description: 'Printable daily activities, trackers, and goals for Ramadan.', image: 'https://placehold.co/400x300/1A5F7A/FAF7F0?text=Ramadan+Planner', externalLink: 'https://etsy.com', platform: 'Etsy' },
  { id: 'p4', categoryId: 'cat-3', name: 'Islamic Kids Journal — My Dua Book', price: 5.99, description: 'A daily journal to encourage mindfulness, gratitude, and daily dua.', image: 'https://placehold.co/400x300/1A5F7A/FAF7F0?text=Dua+Journal', externalLink: 'https://kdp.amazon.com', platform: 'KDP' },
  { id: 'p5', categoryId: 'cat-4', name: '99 Names Flash Cards', price: 2.99, description: 'Printable PDF flash cards to help memorize the 99 Names of Allah.', image: 'https://placehold.co/400x300/1A5F7A/FAF7F0?text=Flash+Cards', externalLink: 'https://gumroad.com', platform: 'Gumroad' },
];