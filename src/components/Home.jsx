import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

function SectionHeading({ overline, title, brandColors }) {
  return (
    <div className="text-center mb-14">
      <p className="text-[10px] font-medium tracking-[0.28em] uppercase mb-3" style={{ color: brandColors.gold }}>
        {overline}
      </p>
      <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal }}>
        {title}
      </h2>
      <div className="w-10 h-px mx-auto mt-5" style={{ backgroundColor: brandColors.gold }} />
    </div>
  );
}

export default function Home({ navigate, products, brandColors }) {
  return (
    <div className="animate-fadeIn w-full">

      {/* HERO */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: brandColors.teal, minHeight: '88vh' }}>
        {/* Background image */}
        <img
          src="banner.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-0 mix-blend-luminosity"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(26,95,122,0.82) 0%, rgba(26,95,122,0.6) 100%)' }} />

        {/* Content */}
        <div className="relative w-full h-full flex items-center justify-center px-6 md:px-12 lg:px-20" style={{ minHeight: '88vh' }}>
          <div className="text-center max-w-3xl" style={{ color: brandColors.ivory }}>
            <p className="text-[10px] tracking-[0.35em] uppercase mb-6 font-medium" style={{ color: brandColors.gold }}>
              Islamic Education &amp; Creativity
            </p>
            <h1
              className="text-5xl md:text-7xl font-light leading-tight mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Meaningful Islamic Learning,{' '}
              <em>Beautifully Made</em>
            </h1>
            <p className="text-base md:text-lg opacity-70 max-w-xl mx-auto mb-10 leading-relaxed">
              Premium children's books, printables, and ambient audio for Muslim families who seek beautiful, purposeful resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('shop')}
                className="px-10 py-4 text-[11px] font-medium tracking-[0.2em] uppercase text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: brandColors.gold }}
              >
                Explore Collection
              </button>
              <button
                onClick={() => navigate('blog')}
                className="px-10 py-4 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors"
                style={{ border: '1px solid rgba(250,247,240,0.3)', color: brandColors.ivory }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(250,247,240,0.6)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(250,247,240,0.3)'}
              >
                Read the Journal
              </button>
            </div>
          </div>
        </div>

        {/* Decorative bottom */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8 opacity-30">
          <div className="flex gap-2">
            {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: brandColors.gold }} />)}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="w-full px-6 md:px-12 lg:px-20 py-24">
        <SectionHeading overline="Our Collection" title="Latest Releases" brandColors={brandColors} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
          {products.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} brandColors={brandColors} />
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('shop')}
            className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase pb-0.5 transition-opacity hover:opacity-70"
            style={{ color: brandColors.teal, borderBottom: `1px solid ${brandColors.gold}` }}
          >
            View All Products <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* VALUE PILLARS */}
      <section className="w-full py-20" style={{ backgroundColor: '#fff' }}>
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {[
              { label: 'Authentic', body: 'Every resource is rooted in Quran and Sunnah, created with care for accuracy and spiritual depth.' },
              { label: 'Purposeful', body: 'Designed to educate, inspire, and engage — not just entertain. Every page has intention.' },
              { label: 'Beautiful', body: 'Premium design that reflects the beauty of Islam, suitable for modern Muslim homes.' },
            ].map(({ label, body }) => (
              <div key={label} className="text-center">
                <div className="w-8 h-px mx-auto mb-6" style={{ backgroundColor: brandColors.gold }} />
                <h3 className="text-xl font-medium mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal }}>{label}</h3>
                <p className="text-sm leading-relaxed opacity-60">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION QUOTE */}
      <section className="w-full py-24" style={{ backgroundColor: brandColors.teal }}>
        <div className="max-w-2xl mx-auto text-center px-6">
          <div className="w-px h-12 mx-auto mb-10" style={{ backgroundColor: 'rgba(200,150,62,0.5)' }} />
          <blockquote
            className="text-3xl md:text-4xl font-light leading-relaxed mb-8"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.ivory }}
          >
            "Serving both Deen and Dunya through premium, trusted Islamic digital content."
          </blockquote>
          <p className="text-xs tracking-[0.2em] uppercase opacity-40" style={{ color: brandColors.ivory }}>
            Our Mission
          </p>
          <div className="w-px h-12 mx-auto mt-10" style={{ backgroundColor: 'rgba(200,150,62,0.5)' }} />
        </div>
      </section>
    </div>
  );
}
