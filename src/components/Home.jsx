import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

export default function Home({ navigate, products, brandColors }) {
  return (
    <div className="animate-fadeIn w-full">
      {/* HERO SECTION */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: '60vh', backgroundColor: brandColors.teal }}>
        <img
          src="banner.png"
          alt="Noor Creative Atelier Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
          onError={(e) => {
            e.target.src = `https://placehold.co/1920x800/${brandColors.teal.replace('#', '')}/${brandColors.gold.replace('#', '')}?text=Noor+Creative+Atelier`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A5F7A]/90 to-[#1A5F7A]/40 md:to-transparent"></div>
        <div className="relative w-full px-4 md:px-12 lg:px-24 2xl:px-32 h-full flex items-center" style={{ minHeight: '60vh' }}>
          <div className="max-w-3xl text-[#FAF7F0] py-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
              Inspiring Meaningful Islamic Learning
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Premium children's activity books, educational resources, and halal ambient audio for Muslim families.
            </p>
            <button
              onClick={() => navigate('shop')}
              className="px-8 py-4 text-lg font-bold rounded-sm text-white shadow-lg transform transition hover:-translate-y-1"
              style={{ backgroundColor: brandColors.gold, fontFamily: "'Cinzel', serif" }}
            >
              Explore Collection
            </button>
          </div>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <div className="w-full px-4 md:px-12 lg:px-24 2xl:px-32 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Latest Digital Releases</h2>
          <div className="w-24 h-1 mx-auto" style={{ backgroundColor: brandColors.gold }}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {products.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} brandColors={brandColors} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('shop')}
            className="flex items-center mx-auto text-lg font-bold hover:underline"
            style={{ color: brandColors.teal }}
          >
            View All Products <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>

      {/* MISSION STRIP */}
      <div className="py-20 text-center text-[#FAF7F0] w-full" style={{ backgroundColor: brandColors.teal }}>
        <div className="w-full max-w-5xl mx-auto px-4 md:px-12">
          <h3 className="text-2xl md:text-4xl font-bold mb-6 leading-relaxed" style={{ fontFamily: "'Cinzel', serif" }}>
            "Serving both Deen and Dunya through premium, trusted Islamic digital content."
          </h3>
          <p className="text-lg opacity-80">Our resources are designed specifically for modern Muslim parents seeking authentic, beautiful, and engaging educational tools.</p>
        </div>
      </div>
    </div>
  );
}
