import { useState } from 'react';
import { Calculator, Calendar, MapPin, Clock } from 'lucide-react';

const TOOL_ICONS = {
  zakat: Calculator,
  hijri: Calendar,
  prayer: MapPin,
  countdown: Clock,
};

export default function Tools({ brandColors, toolsData }) {
  const [zakatWealth, setZakatWealth] = useState('');
  const zakatAmount = zakatWealth ? (parseFloat(zakatWealth) * 0.025).toFixed(2) : null;

  return (
    <div className="animate-fadeIn w-full">
      {/* Page Header */}
      <div className="w-full px-6 md:px-12 lg:px-20 pt-16 pb-12 text-center">
        <p className="text-[10px] font-medium tracking-[0.28em] uppercase mb-3" style={{ color: brandColors.gold }}>
          Free Utilities
        </p>
        <h1 className="text-5xl md:text-6xl font-light mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal }}>
          Islamic Tools
        </h1>
        <p className="text-sm opacity-60 max-w-md mx-auto leading-relaxed">
          Free, easy-to-use calculators and tools for your daily spiritual needs.
        </p>
        <div className="w-10 h-px mx-auto mt-5" style={{ backgroundColor: brandColors.gold }} />
      </div>

      <div className="w-full px-6 md:px-12 lg:px-20 pb-24">
        {/* Zakat Calculator — prominent */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <div className="bg-white p-8 md:p-10" style={{ border: '1px solid rgba(26,95,122,0.08)' }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: 'rgba(200,150,62,0.1)' }}>
                <Calculator size={20} style={{ color: brandColors.gold }} />
              </div>
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase opacity-50 mb-0.5">Free Tool</p>
                <h2 className="text-xl font-medium" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal }}>
                  Zakat Calculator
                </h2>
              </div>
            </div>

            <p className="text-sm opacity-60 mb-8 leading-relaxed">
              Calculate your 2.5% Zakat on total eligible wealth — savings, gold, and investments.
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase font-medium opacity-60 mb-2">
                  Total Eligible Wealth (USD)
                </label>
                <input
                  type="number"
                  value={zakatWealth}
                  onChange={(e) => setZakatWealth(e.target.value)}
                  placeholder="e.g. 5,000"
                  className="w-full px-4 py-3 text-sm bg-[#FAF7F0] focus:outline-none transition-colors"
                  style={{ border: '1px solid rgba(26,95,122,0.15)', color: brandColors.teal }}
                  onFocus={(e) => e.target.style.borderColor = brandColors.gold}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(26,95,122,0.15)'}
                />
              </div>

              <div className="p-5" style={{ backgroundColor: brandColors.teal }}>
                <p className="text-[9px] tracking-[0.18em] uppercase opacity-60 mb-1" style={{ color: brandColors.ivory }}>
                  Zakat Due (2.5%)
                </p>
                <p className="text-3xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: zakatAmount ? brandColors.gold : 'rgba(250,247,240,0.4)' }}>
                  {zakatAmount ? `$${zakatAmount}` : '—'}
                </p>
              </div>
            </div>
          </div>

          {/* Hijri Converter */}
          <div className="bg-white p-8 md:p-10 flex flex-col" style={{ border: '1px solid rgba(26,95,122,0.08)' }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: 'rgba(26,95,122,0.06)' }}>
                <Calendar size={20} style={{ color: brandColors.teal }} />
              </div>
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase opacity-50 mb-0.5">Free Tool</p>
                <h2 className="text-xl font-medium" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal }}>
                  Hijri Converter
                </h2>
              </div>
            </div>

            <p className="text-sm opacity-60 mb-8 leading-relaxed">
              Convert Gregorian dates to the Islamic Hijri calendar.
            </p>

            <div className="mt-auto p-6 text-center" style={{ backgroundColor: '#FAF7F0', border: '1px solid rgba(26,95,122,0.08)' }}>
              <p className="text-[9px] tracking-[0.18em] uppercase opacity-50 mb-3">Today's Hijri Date</p>
              <p className="text-2xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.gold }}>
                14 Jumada al-Ula
              </p>
              <p className="text-sm opacity-60 mt-1">1448 AH</p>
            </div>
          </div>
        </div>

        {/* Additional Tools — exclude zakat and hijri which are featured above */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {toolsData.filter((t) => t.type !== 'zakat' && t.type !== 'hijri').map((tool) => {
            const Icon = TOOL_ICONS[tool.type] || Calculator;
            return (
              <div key={tool.id} className="bg-white p-6" style={{ border: '1px solid rgba(26,95,122,0.08)' }}>
                <div className="w-9 h-9 flex items-center justify-center mb-5" style={{ backgroundColor: 'rgba(26,95,122,0.06)' }}>
                  <Icon size={18} style={{ color: brandColors.teal }} />
                </div>
                <h3 className="font-medium mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal, fontSize: '1.1rem' }}>
                  {tool.title}
                </h3>
                <p className="text-xs leading-relaxed opacity-55 mb-5">{tool.description}</p>
                {tool.extraInfo && (
                  <p className="text-xs font-medium mb-4" style={{ color: brandColors.gold }}>{tool.extraInfo}</p>
                )}
                {tool.buttonLabel ? (
                  <a
                    href={tool.buttonUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center py-2.5 text-[10px] font-medium tracking-[0.15em] uppercase text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: brandColors.teal }}
                  >
                    {tool.buttonLabel}
                  </a>
                ) : (
                  <p className="text-[9px] tracking-[0.15em] uppercase opacity-35 font-medium py-2.5 text-center" style={{ border: '1px solid rgba(26,95,122,0.1)' }}>
                    Coming Soon
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
