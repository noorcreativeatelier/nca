import { useState } from 'react';
import ProductCard from './ProductCard';

export default function Shop({ products, brandColors }) {
  const categories = ['All', ...new Set(products.map((p) => p.category))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full px-4 md:px-12 lg:px-24 2xl:px-32 py-16 animate-fadeIn">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Digital Store</h1>
        <p className="text-xl max-w-2xl mx-auto opacity-80">Instant downloads. Print at home or use on your tablet.</p>
        <div className="w-24 h-1 mx-auto mt-6" style={{ backgroundColor: brandColors.gold }}></div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 font-bold rounded-full transition-all border-2 ${
              activeCategory === category
                ? 'bg-[#1A5F7A] text-white border-[#1A5F7A] shadow-md'
                : 'bg-transparent text-[#1A5F7A] border-[#1A5F7A]/30 hover:border-[#1A5F7A]'
            }`}
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-10">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} brandColors={brandColors} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center italic opacity-70 mt-8">No products found in this category.</p>
      )}
    </div>
  );
}
