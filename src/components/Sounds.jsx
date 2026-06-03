import { Volume2, Play } from 'lucide-react';

export default function Sounds({ brandColors, soundscapes }) {
  return (
    <div className="animate-fadeIn w-full">
      {/* Hero */}
      <section className="w-full py-28 text-center" style={{ backgroundColor: brandColors.teal }}>
        <div className="w-full px-6 md:px-12 lg:px-20 max-w-2xl mx-auto">
          <div className="w-12 h-12 flex items-center justify-center mx-auto mb-8 rounded-full" style={{ backgroundColor: 'rgba(200,150,62,0.2)' }}>
            <Volume2 size={22} style={{ color: brandColors.gold }} />
          </div>
          <p className="text-[10px] tracking-[0.28em] uppercase font-medium mb-4" style={{ color: brandColors.gold }}>
            Halal Ambient Audio
          </p>
          <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.ivory }}>
            Focus. Reflect. Worship.
          </h1>
          <p className="text-sm opacity-65 leading-relaxed mb-10" style={{ color: brandColors.ivory }}>
            Pure Islamic ambient soundscapes — no musical instruments. Designed for Quran recitation focus, sleep, study, and ibadah.
          </p>
          <a
            href="#"
            className="inline-block px-10 py-4 text-[11px] font-medium tracking-[0.2em] uppercase text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: brandColors.gold }}
          >
            Subscribe on YouTube
          </a>
        </div>
      </section>

      {/* Grid */}
      <section className="w-full px-6 md:px-12 lg:px-20 py-20">
        <div className="text-center mb-14">
          <p className="text-[10px] font-medium tracking-[0.28em] uppercase mb-3" style={{ color: brandColors.gold }}>
            Latest
          </p>
          <h2 className="text-4xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal }}>
            Soundscapes
          </h2>
          <div className="w-10 h-px mx-auto mt-5" style={{ backgroundColor: brandColors.gold }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {soundscapes.map((sound) => (
            <a
              key={sound.id}
              href={sound.link || '#'}
              target="_blank"
              rel="noreferrer"
              className="group block bg-white overflow-hidden hover:shadow-xl transition-shadow"
              style={{ border: '1px solid rgba(26,95,122,0.08)' }}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                <img
                  src={sound.image}
                  alt={sound.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(26,95,122,0.5)' }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: brandColors.ivory }}>
                    <Play size={18} fill={brandColors.teal} style={{ color: brandColors.teal, marginLeft: '2px' }} />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-medium leading-snug mb-1.5" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal, fontSize: '1.1rem' }}>
                  {sound.title}
                </h3>
                <p className="text-xs opacity-50">{sound.subtitle}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Info strip */}
      <section className="w-full py-16" style={{ backgroundColor: '#fff' }}>
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              { label: 'No Instruments', desc: 'All soundscapes are free of musical instruments, keeping them fully permissible for Muslim listeners.' },
              { label: 'Long-Form Audio', desc: 'Tracks run 1–4 hours so you can work, rest, or worship without interruption.' },
              { label: 'Free on YouTube', desc: 'All audio is available free on our YouTube channel. Subscribe and listen anytime.' },
            ].map(({ label, desc }) => (
              <div key={label}>
                <div className="w-8 h-px mx-auto mb-5" style={{ backgroundColor: brandColors.gold }} />
                <h3 className="text-lg font-medium mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal }}>
                  {label}
                </h3>
                <p className="text-sm leading-relaxed opacity-55">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
