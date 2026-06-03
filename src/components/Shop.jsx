import { useState } from 'react';
import ProductCard from './ProductCard';

export default function Shop({ products, brandColors }) {
  const categories = ['All', ...new Set(products.map((p) => p.category))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory);

  return (
    <div className="animate-fadeIn w-full">
      {/* Page Header */}
      <div className="w-full px-6 md:px-12 lg:px-20 pt-16 pb-12 text-center">
        <p className="text-[10px] font-medium tracking-[0.28em] uppercase mb-3" style={{ color: brandColors.gold }}>
          Digital Store
        </p>
        <h1 className="text-5xl md:text-6xl font-light mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal }}>
          The Collection
        </h1>
        <p className="text-sm opacity-60 max-w-md mx-auto leading-relaxed">
          Instant downloads. Print at home or read on any device.
        </p>
        <div className="w-10 h-px mx-auto mt-5" style={{ backgroundColor: brandColors.gold }} />
      </div>

      {/* Category Filter */}
      <div className="w-full px-6 md:px-12 lg:px-20 pb-12">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative py-2 text-[11px] font-medium tracking-[0.15em] uppercase transition-colors"
              style={{ color: activeCategory === cat ? brandColors.gold : brandColors.teal }}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 right-0 h-px" style={{ backgroundColor: brandColors.gold }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="w-full px-6 md:px-12 lg:px-20 pb-6">
        <p className="text-xs opacity-40 tracking-wide">
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      {/* Grid */}
      <div className="w-full px-6 md:px-12 lg:px-20 pb-24">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} brandColors={brandColors} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-sm opacity-40 italic">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
