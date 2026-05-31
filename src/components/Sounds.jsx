import { Volume2 } from 'lucide-react';

export default function Sounds({ brandColors, soundscapes }) {
  return (
    <div className="animate-fadeIn w-full">
      <div className="py-24 text-center w-full" style={{ backgroundColor: brandColors.teal, color: brandColors.ivory }}>
        <div className="w-full max-w-4xl mx-auto px-4 md:px-12">
          <Volume2 size={48} className="mx-auto mb-6 text-[#C8963E]" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Cinzel', serif" }}>Halal Ambient Audio</h1>
          <p className="text-xl opacity-90 leading-relaxed mb-8">
            Pure Islamic ambient soundscapes — no musical instruments. Perfect for Quran recitation focus, sleep, and ibadah.
          </p>
          <a href="#" className="inline-block px-8 py-4 font-bold rounded shadow-lg transition hover:-translate-y-1" style={{ backgroundColor: brandColors.gold, color: 'white' }}>
            Subscribe on YouTube
          </a>
        </div>
      </div>

      <div className="w-full px-4 md:px-12 lg:px-24 2xl:px-32 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center" style={{ fontFamily: "'Cinzel', serif" }}>Latest Soundscapes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {soundscapes.map((sound) => (
            <div key={sound.id} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-[#1A5F7A]/10">
              <div className="relative pb-[56.25%] bg-gray-100">
                <img src={sound.image} alt={sound.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Cinzel', serif" }}>{sound.title}</h3>
                <p className="opacity-70 mb-4">{sound.subtitle}</p>
                <a
                  href={sound.link || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block py-3 px-4 rounded font-bold text-white text-center w-full"
                  style={{ backgroundColor: brandColors.teal }}
                >
                  Listen Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
