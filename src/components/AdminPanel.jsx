import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const initialForms = {
  products: { title: '', category: '', type: 'Printable', price: '', image: '', purchaseLinks: '' },
  blog: { title: '', category: '', date: '', content: '' },
  tools: { title: '', description: '', type: 'zakat', buttonLabel: '', buttonUrl: '', extraInfo: '' },
  sounds: { title: '', subtitle: '', image: '', link: '' },
};

const formatPurchaseLinks = (links = []) => links.map((l) => `${l.platform}|${l.url}`).join(', ');

const parsePurchaseLinks = (value) =>
  value.split(',').map((c) => c.trim()).filter(Boolean)
    .map((c) => { const [platform, url] = c.split('|').map((s) => s.trim()); return { platform, url }; })
    .filter((l) => l.platform && l.url);

const TAB_LABELS = { products: 'Products', blog: 'Blog Posts', tools: 'Tools', sounds: 'Sounds' };

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.15em] uppercase font-medium opacity-55 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3.5 py-2.5 text-sm bg-[#FAF7F0] focus:outline-none transition-colors";

export default function AdminPanel({ products, setProducts, posts, setPosts, toolsData, setToolsData, soundscapes, setSoundscapes, brandColors }) {
  const inputStyle = { border: '1px solid rgba(26,95,122,0.15)', color: brandColors.teal };
  const [tab, setTab] = useState('products');
  const [form, setForm] = useState(initialForms.products);
  const [editId, setEditId] = useState(null);

  const items = tab === 'products' ? products : tab === 'blog' ? posts : tab === 'tools' ? toolsData : soundscapes;

  useEffect(() => {
    setEditId(null);
    setForm(initialForms[tab]);
  }, [tab]);

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleEdit = (item) => {
    setEditId(item.id);
    if (tab === 'products') {
      setForm({ title: item.title, category: item.category, type: item.type, price: item.price.toString(), image: item.image, purchaseLinks: formatPurchaseLinks(item.purchaseLinks) });
    } else if (tab === 'blog') {
      setForm({ title: item.title, category: item.category, date: item.date, content: item.content });
    } else if (tab === 'tools') {
      setForm({ title: item.title, description: item.description, type: item.type, buttonLabel: item.buttonLabel || '', buttonUrl: item.buttonUrl || '', extraInfo: item.extraInfo || '' });
    } else {
      setForm({ title: item.title, subtitle: item.subtitle, image: item.image, link: item.link || '' });
    }
  };

  const handleRemove = (id) => {
    if (tab === 'products') setProducts(products.filter((i) => i.id !== id));
    else if (tab === 'blog') setPosts(posts.filter((i) => i.id !== id));
    else if (tab === 'tools') setToolsData(toolsData.filter((i) => i.id !== id));
    else setSoundscapes(soundscapes.filter((i) => i.id !== id));
  };

  const handleSave = () => {
    const newId = editId || Date.now().toString();
    if (tab === 'products') {
      const item = { id: newId, title: form.title, category: form.category, type: form.type, price: parseFloat(form.price) || 0, image: form.image, purchaseLinks: parsePurchaseLinks(form.purchaseLinks) };
      setProducts(editId ? products.map((i) => (i.id === editId ? item : i)) : [...products, item]);
    } else if (tab === 'blog') {
      const item = { id: newId, title: form.title, category: form.category, date: form.date, content: form.content };
      setPosts(editId ? posts.map((i) => (i.id === editId ? item : i)) : [...posts, item]);
    } else if (tab === 'tools') {
      const item = { id: newId, title: form.title, description: form.description, type: form.type, buttonLabel: form.buttonLabel, buttonUrl: form.buttonUrl, extraInfo: form.extraInfo };
      setToolsData(editId ? toolsData.map((i) => (i.id === editId ? item : i)) : [...toolsData, item]);
    } else {
      const item = { id: newId, title: form.title, subtitle: form.subtitle, image: form.image, link: form.link };
      setSoundscapes(editId ? soundscapes.map((i) => (i.id === editId ? item : i)) : [...soundscapes, item]);
    }
    setEditId(null);
    setForm(initialForms[tab]);
  };

  const renderFields = () => {
    if (tab === 'products') return (
      <div className="space-y-4">
        <Field label="Title"><input value={form.title} onChange={(e) => set('title', e.target.value)} className={inputCls} style={inputStyle} /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Category"><input value={form.category} onChange={(e) => set('category', e.target.value)} className={inputCls} style={inputStyle} /></Field>
          <Field label="Type"><input value={form.type} onChange={(e) => set('type', e.target.value)} className={inputCls} style={inputStyle} /></Field>
        </div>
        <Field label="Price (USD)"><input type="number" step="0.01" value={form.price} onChange={(e) => set('price', e.target.value)} className={inputCls} style={inputStyle} /></Field>
        <Field label="Image URL"><input value={form.image} onChange={(e) => set('image', e.target.value)} className={inputCls} style={inputStyle} /></Field>
        <Field label="Purchase Links (Platform|URL, separated by commas)">
          <textarea value={form.purchaseLinks} onChange={(e) => set('purchaseLinks', e.target.value)} className={`${inputCls} h-20 resize-none`} style={inputStyle} placeholder="Gumroad|https://..., Etsy|https://..." />
        </Field>
      </div>
    );
    if (tab === 'blog') return (
      <div className="space-y-4">
        <Field label="Title"><input value={form.title} onChange={(e) => set('title', e.target.value)} className={inputCls} style={inputStyle} /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Category"><input value={form.category} onChange={(e) => set('category', e.target.value)} className={inputCls} style={inputStyle} /></Field>
          <Field label="Date"><input value={form.date} onChange={(e) => set('date', e.target.value)} className={inputCls} style={inputStyle} placeholder="Oct 12, 2026" /></Field>
        </div>
        <Field label="Content"><textarea value={form.content} onChange={(e) => set('content', e.target.value)} className={`${inputCls} h-36 resize-none`} style={inputStyle} /></Field>
      </div>
    );
    if (tab === 'tools') return (
      <div className="space-y-4">
        <Field label="Title"><input value={form.title} onChange={(e) => set('title', e.target.value)} className={inputCls} style={inputStyle} /></Field>
        <Field label="Description"><textarea value={form.description} onChange={(e) => set('description', e.target.value)} className={`${inputCls} h-20 resize-none`} style={inputStyle} /></Field>
        <Field label="Type">
          <select value={form.type} onChange={(e) => set('type', e.target.value)} className={`${inputCls} cursor-pointer`} style={inputStyle}>
            <option value="zakat">Zakat Calculator</option>
            <option value="hijri">Hijri Converter</option>
            <option value="prayer">Prayer Time Finder</option>
            <option value="countdown">Countdown</option>
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Button Label"><input value={form.buttonLabel} onChange={(e) => set('buttonLabel', e.target.value)} className={inputCls} style={inputStyle} /></Field>
          <Field label="Button URL"><input value={form.buttonUrl} onChange={(e) => set('buttonUrl', e.target.value)} className={inputCls} style={inputStyle} /></Field>
        </div>
        <Field label="Extra Info"><input value={form.extraInfo} onChange={(e) => set('extraInfo', e.target.value)} className={inputCls} style={inputStyle} /></Field>
      </div>
    );
    return (
      <div className="space-y-4">
        <Field label="Title"><input value={form.title} onChange={(e) => set('title', e.target.value)} className={inputCls} style={inputStyle} /></Field>
        <Field label="Subtitle"><input value={form.subtitle} onChange={(e) => set('subtitle', e.target.value)} className={inputCls} style={inputStyle} /></Field>
        <Field label="Image URL"><input value={form.image} onChange={(e) => set('image', e.target.value)} className={inputCls} style={inputStyle} /></Field>
        <Field label="Link URL"><input value={form.link} onChange={(e) => set('link', e.target.value)} className={inputCls} style={inputStyle} /></Field>
      </div>
    );
  };

  return (
    <div className="animate-fadeIn w-full px-6 md:px-12 lg:px-20 py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[10px] tracking-[0.25em] uppercase font-medium mb-2" style={{ color: brandColors.gold }}>Dashboard</p>
        <h1 className="text-4xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal }}>
          Admin Panel
        </h1>
        <p className="text-sm opacity-50 mt-2">Manage all content from one place.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-x-8 gap-y-2 mb-10" style={{ borderBottom: '1px solid rgba(26,95,122,0.08)' }}>
        {Object.entries(TAB_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className="relative pb-3 text-[11px] tracking-[0.15em] uppercase font-medium transition-colors"
            style={{ color: tab === key ? brandColors.gold : 'rgba(26,95,122,0.45)' }}
          >
            {label}
            <span className="ml-2 text-[9px] opacity-60">({(key === 'products' ? products : key === 'blog' ? posts : key === 'tools' ? toolsData : soundscapes).length})</span>
            {tab === key && <span className="absolute bottom-0 left-0 right-0 h-[1.5px]" style={{ backgroundColor: brandColors.gold }} />}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
        {/* Items List */}
        <div className="bg-white p-6" style={{ border: '1px solid rgba(26,95,122,0.08)' }}>
          <h2 className="text-sm font-medium tracking-[0.1em] uppercase opacity-50 mb-5">{TAB_LABELS[tab]}</h2>
          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
            {items.length === 0 && (
              <p className="text-sm opacity-40 text-center py-8">No items yet. Add one using the form.</p>
            )}
            {items.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-4 p-4 transition-colors" style={{ backgroundColor: '#FAF7F0', border: '1px solid rgba(26,95,122,0.06)' }}>
                <div className="min-w-0">
                  <p className="font-medium truncate" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal, fontSize: '1rem' }}>
                    {item.title}
                  </p>
                  <p className="text-[10px] opacity-45 mt-0.5">
                    {tab === 'products' && `${item.category} · $${item.price.toFixed(2)}`}
                    {tab === 'blog' && `${item.category} · ${item.date}`}
                    {tab === 'tools' && item.type}
                    {tab === 'sounds' && item.subtitle}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleEdit(item)} className="p-2 transition-colors hover:opacity-70" style={{ color: brandColors.teal }}>
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleRemove(item.id)} className="p-2 transition-colors hover:opacity-70" style={{ color: '#c0392b' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-6" style={{ border: '1px solid rgba(26,95,122,0.08)' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium tracking-[0.1em] uppercase opacity-50">
              {editId ? 'Edit Item' : 'New Item'}
            </h2>
            {editId && (
              <button
                onClick={() => { setEditId(null); setForm(initialForms[tab]); }}
                className="text-[10px] tracking-[0.12em] uppercase opacity-40 hover:opacity-70 transition-opacity"
                style={{ color: brandColors.teal }}
              >
                Cancel
              </button>
            )}
          </div>

          {renderFields()}

          <button
            onClick={handleSave}
            className="mt-6 w-full py-3 flex items-center justify-center gap-2 text-[11px] font-medium tracking-[0.15em] uppercase text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: brandColors.teal }}
          >
            {editId ? <><Pencil size={13} /> Save Changes</> : <><Plus size={13} /> Add Item</>}
          </button>
        </div>
      </div>
    </div>
  );
}
