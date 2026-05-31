import { useState } from 'react';
import { Calculator, Calendar, BookOpen } from 'lucide-react';

export default function Tools({ brandColors, toolsData }) {
  const [zakatWealth, setZakatWealth] = useState('');
  const zakatAmount = zakatWealth ? (parseFloat(zakatWealth) * 0.025).toFixed(2) : '0.00';

  return (
    <div className="w-full px-4 md:px-12 lg:px-24 2xl:px-32 py-16 animate-fadeIn">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Islamic Utility Tools</h1>
        <p className="text-xl max-w-2xl mx-auto opacity-80">Free, easy-to-use calculators and tools for your daily spiritual needs.</p>
        <div className="w-24 h-1 mx-auto mt-6" style={{ backgroundColor: brandColors.gold }}></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-[#1A5F7A]/10">
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-full mr-4 text-white" style={{ backgroundColor: brandColors.gold }}>
              <Calculator size={28} />
            </div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Cinzel', serif" }}>Zakat Calculator</h2>
          </div>
          <p className="mb-6 opacity-80">Calculate your 2.5% Zakat on total eligible wealth (savings, gold, investments).</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">Total Eligible Wealth (USD)</label>
              <input
                type="number"
                value={zakatWealth}
                onChange={(e) => setZakatWealth(e.target.value)}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 bg-[#FAF7F0]"
                style={{ borderColor: brandColors.teal, color: brandColors.teal }}
                placeholder="e.g. 5000"
              />
            </div>
            <div className="p-4 rounded-md mt-4" style={{ backgroundColor: brandColors.teal, color: brandColors.ivory }}>
              <span className="block text-sm opacity-80">Zakat Due (2.5%)</span>
              <span className="text-3xl font-bold" style={{ fontFamily: "'Cinzel', serif" }}>${zakatAmount}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-[#1A5F7A]/10 flex flex-col justify-center items-center text-center">
          <div className="p-3 rounded-full mb-4 text-white" style={{ backgroundColor: brandColors.teal }}>
            <Calendar size={28} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Cinzel', serif" }}>Hijri Converter</h2>
          <p className="opacity-80 mb-6">Convert Gregorian dates to the Islamic Hijri calendar.</p>
          <div className="p-4 border rounded w-full bg-[#FAF7F0] border-gray-200">
            <p className="font-bold">Today's Date</p>
            <p className="text-lg mt-2" style={{ color: brandColors.gold }}>14 Jumada al-Ula, 1448 AH</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {toolsData.map((tool) => (
          <div key={tool.id} className="bg-white p-8 rounded-lg shadow-sm border border-[#1A5F7A]/10">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full mr-3 text-white" style={{ backgroundColor: brandColors.teal }}>
                {tool.type === 'zakat' ? <Calculator size={24} /> : tool.type === 'hijri' ? <Calendar size={24} /> : <BookOpen size={24} />}
              </div>
              <h3 className="text-2xl font-bold" style={{ fontFamily: "'Cinzel', serif" }}>{tool.title}</h3>
            </div>
            <p className="opacity-80 mb-4">{tool.description}</p>
            {tool.extraInfo && <p className="mb-4 text-sm text-[#1A5F7A]/80">{tool.extraInfo}</p>}
            {tool.buttonLabel ? (
              <a href={tool.buttonUrl || '#'} target="_blank" rel="noreferrer" className="inline-block w-full text-center py-3 rounded font-bold text-white" style={{ backgroundColor: brandColors.gold }}>
                {tool.buttonLabel}
              </a>
            ) : (
              <div className="py-3 px-4 rounded bg-[#FAF7F0] border border-[#1A5F7A]/10 text-center text-sm font-semibold text-[#1A5F7A]">
                More coming soon
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
