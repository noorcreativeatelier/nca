import { useEffect, useState } from 'react';

const initialForms = {
  products: {
    title: '',
    category: '',
    type: 'Printable',
    price: '',
    image: '',
    purchaseLinks: '',
  },
  blog: {
    title: '',
    category: '',
    date: '',
    content: '',
  },
  tools: {
    title: '',
    description: '',
    type: 'zakat',
    buttonLabel: '',
    buttonUrl: '',
    extraInfo: '',
  },
  sounds: {
    title: '',
    subtitle: '',
    image: '',
    link: '',
  },
};

const formatPurchaseLinks = (links = []) =>
  links.map((link) => `${link.platform}|${link.url}`).join(', ');

const parsePurchaseLinks = (value) =>
  value
    .split(',')
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [platform, url] = chunk.split('|').map((part) => part.trim());
      return { platform, url };
    })
    .filter((link) => link.platform && link.url);

export default function AdminPanel({
  products,
  setProducts,
  posts,
  setPosts,
  toolsData,
  setToolsData,
  soundscapes,
  setSoundscapes,
  brandColors,
}) {
  const [tab, setTab] = useState('products');
  const [form, setForm] = useState(initialForms.products);
  const [editId, setEditId] = useState(null);

  const items =
    tab === 'products'
      ? products
      : tab === 'blog'
      ? posts
      : tab === 'tools'
      ? toolsData
      : soundscapes;

  useEffect(() => {
    setEditId(null);
    setForm(initialForms[tab]);
  }, [tab]);

  const handleField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    if (tab === 'products') {
      setForm({
        title: item.title,
        category: item.category,
        type: item.type,
        price: item.price.toString(),
        image: item.image,
        purchaseLinks: formatPurchaseLinks(item.purchaseLinks),
      });
    } else if (tab === 'blog') {
      setForm({
        title: item.title,
        category: item.category,
        date: item.date,
        content: item.content,
      });
    } else if (tab === 'tools') {
      setForm({
        title: item.title,
        description: item.description,
        type: item.type,
        buttonLabel: item.buttonLabel || '',
        buttonUrl: item.buttonUrl || '',
        extraInfo: item.extraInfo || '',
      });
    } else {
      setForm({
        title: item.title,
        subtitle: item.subtitle,
        image: item.image,
        link: item.link || '',
      });
    }
  };

  const handleRemove = (id) => {
    if (tab === 'products') {
      setProducts(products.filter((item) => item.id !== id));
    } else if (tab === 'blog') {
      setPosts(posts.filter((item) => item.id !== id));
    } else if (tab === 'tools') {
      setToolsData(toolsData.filter((item) => item.id !== id));
    } else {
      setSoundscapes(soundscapes.filter((item) => item.id !== id));
    }
  };

  const handleSave = () => {
    if (tab === 'products') {
      const product = {
        id: editId || Date.now().toString(),
        title: form.title,
        category: form.category,
        type: form.type,
        price: parseFloat(form.price) || 0,
        image: form.image,
        purchaseLinks: parsePurchaseLinks(form.purchaseLinks),
      };
      if (editId) {
        setProducts(products.map((item) => (item.id === editId ? product : item)));
      } else {
        setProducts([...products, product]);
      }
    } else if (tab === 'blog') {
      const post = {
        id: editId || Date.now().toString(),
        title: form.title,
        category: form.category,
        date: form.date,
        content: form.content,
      };
      if (editId) {
        setPosts(posts.map((item) => (item.id === editId ? post : item)));
      } else {
        setPosts([...posts, post]);
      }
    } else if (tab === 'tools') {
      const tool = {
        id: editId || Date.now().toString(),
        title: form.title,
        description: form.description,
        type: form.type,
        buttonLabel: form.buttonLabel,
        buttonUrl: form.buttonUrl,
        extraInfo: form.extraInfo,
      };
      if (editId) {
        setToolsData(toolsData.map((item) => (item.id === editId ? tool : item)));
      } else {
        setToolsData([...toolsData, tool]);
      }
    } else {
      const sound = {
        id: editId || Date.now().toString(),
        title: form.title,
        subtitle: form.subtitle,
        image: form.image,
        link: form.link,
      };
      if (editId) {
        setSoundscapes(soundscapes.map((item) => (item.id === editId ? sound : item)));
      } else {
        setSoundscapes([...soundscapes, sound]);
      }
    }

    setEditId(null);
    setForm(initialForms[tab]);
  };

  const renderFormFields = () => {
    if (tab === 'products') {
      return (
        <>
          <label className="block font-bold mb-1">Title</label>
          <input value={form.title} onChange={(e) => handleField('title', e.target.value)} className="w-full p-3 rounded border" />
          <label className="block font-bold mb-1 mt-4">Category</label>
          <input value={form.category} onChange={(e) => handleField('category', e.target.value)} className="w-full p-3 rounded border" />
          <label className="block font-bold mb-1 mt-4">Type</label>
          <input value={form.type} onChange={(e) => handleField('type', e.target.value)} className="w-full p-3 rounded border" />
          <label className="block font-bold mb-1 mt-4">Price</label>
          <input value={form.price} onChange={(e) => handleField('price', e.target.value)} type="number" step="0.01" className="w-full p-3 rounded border" />
          <label className="block font-bold mb-1 mt-4">Image URL</label>
          <input value={form.image} onChange={(e) => handleField('image', e.target.value)} className="w-full p-3 rounded border" />
          <label className="block font-bold mb-1 mt-4">Purchase Links</label>
          <textarea
            value={form.purchaseLinks}
            onChange={(e) => handleField('purchaseLinks', e.target.value)}
            className="w-full p-3 rounded border h-28"
            placeholder="Gumroad|https://gumroad.com/..., Etsy|https://etsy.com/..."
          />
        </>
      );
    }

    if (tab === 'blog') {
      return (
        <>
          <label className="block font-bold mb-1">Title</label>
          <input value={form.title} onChange={(e) => handleField('title', e.target.value)} className="w-full p-3 rounded border" />
          <label className="block font-bold mb-1 mt-4">Category</label>
          <input value={form.category} onChange={(e) => handleField('category', e.target.value)} className="w-full p-3 rounded border" />
          <label className="block font-bold mb-1 mt-4">Date</label>
          <input value={form.date} onChange={(e) => handleField('date', e.target.value)} className="w-full p-3 rounded border" />
          <label className="block font-bold mb-1 mt-4">Content</label>
          <textarea value={form.content} onChange={(e) => handleField('content', e.target.value)} className="w-full p-3 rounded border h-40" />
        </>
      );
    }

    if (tab === 'tools') {
      return (
        <>
          <label className="block font-bold mb-1">Title</label>
          <input value={form.title} onChange={(e) => handleField('title', e.target.value)} className="w-full p-3 rounded border" />
          <label className="block font-bold mb-1 mt-4">Description</label>
          <textarea value={form.description} onChange={(e) => handleField('description', e.target.value)} className="w-full p-3 rounded border h-28" />
          <label className="block font-bold mb-1 mt-4">Type</label>
          <select value={form.type} onChange={(e) => handleField('type', e.target.value)} className="w-full p-3 rounded border">
            <option value="zakat">Zakat Calculator</option>
            <option value="hijri">Hijri Converter</option>
            <option value="prayer">Prayer Time Finder</option>
            <option value="countdown">Countdown</option>
          </select>
          <label className="block font-bold mb-1 mt-4">Button Label</label>
          <input value={form.buttonLabel} onChange={(e) => handleField('buttonLabel', e.target.value)} className="w-full p-3 rounded border" />
          <label className="block font-bold mb-1 mt-4">Button URL</label>
          <input value={form.buttonUrl} onChange={(e) => handleField('buttonUrl', e.target.value)} className="w-full p-3 rounded border" />
          <label className="block font-bold mb-1 mt-4">Extra Info</label>
          <textarea value={form.extraInfo} onChange={(e) => handleField('extraInfo', e.target.value)} className="w-full p-3 rounded border h-24" />
        </>
      );
    }

    return (
      <>
        <label className="block font-bold mb-1">Title</label>
        <input value={form.title} onChange={(e) => handleField('title', e.target.value)} className="w-full p-3 rounded border" />
        <label className="block font-bold mb-1 mt-4">Subtitle</label>
        <input value={form.subtitle} onChange={(e) => handleField('subtitle', e.target.value)} className="w-full p-3 rounded border" />
        <label className="block font-bold mb-1 mt-4">Image URL</label>
        <input value={form.image} onChange={(e) => handleField('image', e.target.value)} className="w-full p-3 rounded border" />
        <label className="block font-bold mb-1 mt-4">Link</label>
        <input value={form.link} onChange={(e) => handleField('link', e.target.value)} className="w-full p-3 rounded border" />
      </>
    );
  };

  return (
    <div className="w-full px-4 md:px-12 lg:px-24 2xl:px-32 py-16 animate-fadeIn">
      <div className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold" style={{ fontFamily: "'Cinzel', serif" }}>Admin Dashboard</h1>
          <p className="opacity-80 mt-3">Manage products, blog content, tools and soundscapes from one place.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {['products', 'blog', 'tools', 'sounds'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`px-4 py-2 rounded-full font-bold transition ${tab === item ? 'bg-[#1A5F7A] text-white' : 'bg-white border border-[#1A5F7A]/30 text-[#1A5F7A]'}`}
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="bg-white rounded-xl shadow-sm border border-[#1A5F7A]/10 p-6">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
            {tab === 'products' ? 'Products' : tab === 'blog' ? 'Blog Posts' : tab === 'tools' ? 'Tools' : 'Soundscapes'}
          </h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={item.id} className="border border-[#1A5F7A]/10 rounded-lg p-4 bg-[#FAF7F0]/80">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-lg" style={{ fontFamily: "'Cinzel', serif" }}>{item.title}</h3>
                    {tab === 'products' && <p className="text-sm opacity-80">{item.category} • ${item.price.toFixed(2)}</p>}
                    {tab === 'blog' && <p className="text-sm opacity-80">{item.category} • {item.date}</p>}
                    {tab === 'tools' && <p className="text-sm opacity-80">{item.type}</p>}
                    {tab === 'sounds' && <p className="text-sm opacity-80">{item.subtitle}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => handleEdit(item)} className="px-3 py-2 rounded bg-[#1A5F7A] text-white font-bold hover:opacity-90">Edit</button>
                    <button type="button" onClick={() => handleRemove(item.id)} className="px-3 py-2 rounded bg-[#C8963E] text-white font-bold hover:opacity-90">Remove</button>
                  </div>
                </div>
              </div>
            ))}
            {items.length === 0 && <p className="text-sm opacity-70">No items found. Add a new one below.</p>}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#1A5F7A]/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Cinzel', serif" }}>{editId ? 'Edit Item' : 'Create New Item'}</h2>
            {editId && (
              <button type="button" onClick={() => { setEditId(null); setForm(initialForms[tab]); }} className="text-[#1A5F7A] font-bold">Clear</button>
            )}
          </div>
          <div className="space-y-4">{renderFormFields()}</div>
          <button type="button" onClick={handleSave} className="mt-6 w-full py-3 rounded text-white font-bold" style={{ backgroundColor: brandColors.teal }}>
            {editId ? 'Save Changes' : 'Add Item'}
          </button>
        </div>
      </div>
    </div>
  );
}
