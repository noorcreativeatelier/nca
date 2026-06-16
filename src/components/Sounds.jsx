import { Volume2 } from 'lucide-react';

export default function Sounds({ brandColors }) {
  return (
    <div className="animate-fadeIn w-full">
      <section className="w-full py-32 text-center" style={{ backgroundColor: brandColors.teal }}>
        <div className="w-full px-6 md:px-12 lg:px-20 max-w-2xl mx-auto">
          <div className="w-12 h-12 flex items-center justify-center mx-auto mb-8 rounded-full" style={{ backgroundColor: 'rgba(200,150,62,0.2)' }}>
            <Volume2 size={22} style={{ color: brandColors.gold }} />
          </div>
          <p className="text-[10px] tracking-[0.28em] uppercase font-medium mb-4" style={{ color: brandColors.gold }}>
            Halal Ambient Audio
          </p>
          <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.ivory }}>
            Coming Soon
          </h1>
          <p className="text-sm opacity-65 leading-relaxed" style={{ color: brandColors.ivory }}>
            We're preparing a collection of pure Islamic ambient soundscapes — no musical instruments. Designed for Quran recitation focus, sleep, study, and ibadah. Check back soon.
          </p>
        </div>
      </section>
    </div>
  );
}
