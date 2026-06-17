import { useState, useEffect, useMemo, useCallback } from 'react';
import { Calculator, Calendar, MapPin, Clock, Construction, Loader, MapPinOff } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Hijri helpers — uses the browser-native Intl islamic-umalqura     */
/* ------------------------------------------------------------------ */

const hijriLongFmt = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
  day: 'numeric', month: 'long', year: 'numeric',
});

const hijriPartsFmt = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
  day: 'numeric', month: 'numeric', year: 'numeric',
});

function hijriParts(date) {
  const p = hijriPartsFmt.formatToParts(date);
  return {
    day: parseInt(p.find((x) => x.type === 'day')?.value, 10),
    month: parseInt(p.find((x) => x.type === 'month')?.value, 10),
  };
}

function hijriLong(date) {
  const p = hijriLongFmt.formatToParts(date);
  return {
    day: p.find((x) => x.type === 'day')?.value,
    month: p.find((x) => x.type === 'month')?.value,
    year: p.find((x) => x.type === 'year')?.value,
  };
}

function getNextRamadan() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { month, day } = hijriParts(today);

  if (month === 9) {
    for (let i = 1; i <= 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const p = hijriParts(d);
      if (p.month === 10 && p.day === 1) return { inRamadan: true, daysLeft: i, ramadanDay: day };
    }
    return { inRamadan: true, daysLeft: null, ramadanDay: day };
  }

  for (let i = 1; i <= 400; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const p = hijriParts(d);
    if (p.month === 9 && p.day === 1) return { inRamadan: false, targetDate: d, daysUntil: i };
  }
  return { inRamadan: false, targetDate: null, daysUntil: null };
}

/* ------------------------------------------------------------------ */
/*  Reusable styles                                                   */
/* ------------------------------------------------------------------ */

const fieldInput = (teal) => ({
  width: '100%',
  padding: '10px 14px',
  fontSize: '13px',
  border: '1px solid rgba(26,95,122,0.15)',
  outline: 'none',
  color: teal,
  backgroundColor: '#FAF7F0',
});

/* ------------------------------------------------------------------ */
/*  Zakat Calculator                                                  */
/* ------------------------------------------------------------------ */

function ZakatCalculator({ brandColors }) {
  const [fields, setFields] = useState({ cash: '', gold: '', investments: '', other: '', debts: '' });
  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  const num = (k) => parseFloat(fields[k]) || 0;
  const totalAssets = num('cash') + num('gold') + num('investments') + num('other');
  const netWealth = Math.max(totalAssets - num('debts'), 0);
  const zakatDue = netWealth * 0.025;
  const hasInput = Object.values(fields).some((v) => v !== '');

  const rows = [
    ['Cash & Savings', 'cash', 'Bank accounts, cash on hand'],
    ['Gold & Silver Value', 'gold', 'Current market value'],
    ['Investments', 'investments', 'Stocks, crypto, mutual funds'],
    ['Other Assets', 'other', 'Business goods, rental income'],
    ['Debts to Subtract', 'debts', 'Immediate debts & liabilities'],
  ];

  return (
    <div className="bg-white p-8 md:p-10" style={{ border: '1px solid rgba(26,95,122,0.08)' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: 'rgba(200,150,62,0.1)' }}>
          <Calculator size={20} style={{ color: brandColors.gold }} />
        </div>
        <div>
          <p className="text-[9px] tracking-[0.2em] uppercase opacity-50 mb-0.5">Free Tool</p>
          <h2 className="text-xl font-medium" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal }}>Zakat Calculator</h2>
        </div>
      </div>

      <p className="text-sm opacity-60 mb-6 leading-relaxed">
        Enter your assets below to calculate 2.5% Zakat on your net eligible wealth.
      </p>

      <div className="space-y-3">
        {rows.map(([label, key, hint]) => (
          <div key={key}>
            <label className="block text-[10px] tracking-[0.12em] uppercase font-medium opacity-55 mb-1">{label}</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={fields[key]}
              onChange={set(key)}
              placeholder={hint}
              style={fieldInput(brandColors.teal)}
              onFocus={(e) => { e.target.style.borderColor = brandColors.gold; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(26,95,122,0.15)'; }}
            />
          </div>
        ))}
      </div>

      {/* Result */}
      <div className="mt-6 p-5" style={{ backgroundColor: brandColors.teal }}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-[9px] tracking-[0.15em] uppercase opacity-50 mb-0.5" style={{ color: brandColors.ivory }}>Total Assets</p>
            <p className="text-lg font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: hasInput ? brandColors.ivory : 'rgba(250,247,240,0.3)' }}>
              {hasInput ? `$${totalAssets.toFixed(2)}` : '—'}
            </p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.15em] uppercase opacity-50 mb-0.5" style={{ color: brandColors.ivory }}>Net Wealth</p>
            <p className="text-lg font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: hasInput ? brandColors.ivory : 'rgba(250,247,240,0.3)' }}>
              {hasInput ? `$${netWealth.toFixed(2)}` : '—'}
            </p>
          </div>
        </div>
        <div className="pt-4" style={{ borderTop: '1px solid rgba(250,247,240,0.15)' }}>
          <p className="text-[9px] tracking-[0.18em] uppercase opacity-60 mb-1" style={{ color: brandColors.ivory }}>Zakat Due (2.5%)</p>
          <p className="text-3xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: hasInput ? brandColors.gold : 'rgba(250,247,240,0.3)' }}>
            {hasInput ? `$${zakatDue.toFixed(2)}` : '—'}
          </p>
        </div>
      </div>

      <p className="text-[10px] opacity-40 mt-3 leading-relaxed">
        Nisab threshold: ~87.48g of gold or ~612.36g of silver in current value. Consult a scholar for your specific situation.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hijri Converter                                                   */
/* ------------------------------------------------------------------ */

function HijriConverter({ brandColors }) {
  const todayStr = new Date().toISOString().slice(0, 10);
  const [dateStr, setDateStr] = useState(todayStr);

  const hijri = useMemo(() => {
    if (!dateStr) return null;
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    if (isNaN(date.getTime())) return null;
    return hijriLong(date);
  }, [dateStr]);

  const today = useMemo(() => hijriLong(new Date()), []);

  return (
    <div className="bg-white p-8 md:p-10 flex flex-col" style={{ border: '1px solid rgba(26,95,122,0.08)' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: 'rgba(26,95,122,0.06)' }}>
          <Calendar size={20} style={{ color: brandColors.teal }} />
        </div>
        <div>
          <p className="text-[9px] tracking-[0.2em] uppercase opacity-50 mb-0.5">Free Tool</p>
          <h2 className="text-xl font-medium" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal }}>Hijri Converter</h2>
        </div>
      </div>

      <p className="text-sm opacity-60 mb-6 leading-relaxed">
        Select a Gregorian date to see its Islamic (Hijri) equivalent.
      </p>

      <div className="mb-6">
        <label className="block text-[10px] tracking-[0.12em] uppercase font-medium opacity-55 mb-1.5">Gregorian Date</label>
        <input
          type="date"
          value={dateStr}
          onChange={(e) => setDateStr(e.target.value)}
          style={fieldInput(brandColors.teal)}
          onFocus={(e) => { e.target.style.borderColor = brandColors.gold; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgba(26,95,122,0.15)'; }}
        />
      </div>

      {/* Converted result */}
      <div className="p-6 text-center mb-4" style={{ backgroundColor: '#FAF7F0', border: '1px solid rgba(26,95,122,0.08)' }}>
        <p className="text-[9px] tracking-[0.18em] uppercase opacity-50 mb-3">Hijri Date</p>
        {hijri ? (
          <>
            <p className="text-2xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.gold }}>
              {hijri.day} {hijri.month}
            </p>
            <p className="text-sm opacity-60 mt-1">{hijri.year} AH</p>
          </>
        ) : (
          <p className="text-sm opacity-40 italic">Select a valid date above</p>
        )}
      </div>

      {/* Today's date always visible */}
      <div className="mt-auto pt-4" style={{ borderTop: '1px solid rgba(26,95,122,0.08)' }}>
        <p className="text-[10px] tracking-[0.12em] uppercase opacity-40 mb-1">Today</p>
        <p className="text-sm" style={{ color: brandColors.teal }}>
          {today.day} {today.month}, {today.year} AH
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Prayer Time Finder                                                */
/* ------------------------------------------------------------------ */

const PRAYER_METHODS = [
  { id: 2, name: 'ISNA (North America)' },
  { id: 1, name: 'University of Karachi' },
  { id: 3, name: 'Muslim World League' },
  { id: 5, name: 'Egyptian General Authority' },
  { id: 4, name: 'Umm Al-Qura, Makkah' },
];

const PRAYER_KEYS = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

function PrayerTimeFinder({ brandColors }) {
  const [times, setTimes] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [method, setMethod] = useState(2);
  const [coords, setCoords] = useState(null);

  const fetchTimes = useCallback((lat, lng, m) => {
    setLoading(true);
    setError('');
    setCoords({ lat, lng });
    const today = new Date();
    const dateStr = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
    fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=${m}`)
      .then((r) => { if (!r.ok) throw new Error('API error'); return r.json(); })
      .then((data) => {
        setTimes(data.data.timings);
        setLocationName(data.data.meta.timezone?.replace(/_/g, ' ') || `${lat.toFixed(2)}, ${lng.toFixed(2)}`);
      })
      .catch(() => setError('Could not fetch prayer times. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) { setError('Geolocation is not supported by your browser.'); return; }
    setLoading(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchTimes(pos.coords.latitude, pos.coords.longitude, method),
      () => { setError('Location access was denied. Please enable location permissions.'); setLoading(false); },
      { timeout: 10000 },
    );
  }, [fetchTimes, method]);

  const handleMethodChange = (newMethod) => {
    setMethod(newMethod);
    if (coords) fetchTimes(coords.lat, coords.lng, newMethod);
  };

  return (
    <div className="bg-white p-6 flex flex-col" style={{ border: '1px solid rgba(26,95,122,0.08)' }}>
      <div className="w-9 h-9 flex items-center justify-center mb-5" style={{ backgroundColor: 'rgba(26,95,122,0.06)' }}>
        <MapPin size={18} style={{ color: brandColors.teal }} />
      </div>
      <h3 className="font-medium mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal, fontSize: '1.1rem' }}>
        Prayer Times
      </h3>
      <p className="text-xs leading-relaxed opacity-55 mb-4">
        Get today's prayer times based on your current location.
      </p>

      {/* Method selector */}
      <div className="mb-4">
        <label className="block text-[10px] tracking-[0.12em] uppercase font-medium opacity-45 mb-1.5">Calculation Method</label>
        <select
          value={method}
          onChange={(e) => handleMethodChange(Number(e.target.value))}
          className="w-full px-3 py-2 text-xs bg-[#FAF7F0] focus:outline-none"
          style={{ border: '1px solid rgba(26,95,122,0.15)', color: brandColors.teal }}
        >
          {PRAYER_METHODS.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>

      {/* Results or detect button */}
      {times ? (
        <div className="grow">
          <p className="text-[10px] tracking-[0.12em] uppercase opacity-40 mb-3">{locationName}</p>
          <div className="space-y-0">
            {PRAYER_KEYS.map((key) => (
              <div
                key={key}
                className="flex items-center justify-between py-2.5"
                style={{ borderBottom: '1px solid rgba(26,95,122,0.06)' }}
              >
                <span className="text-xs font-medium" style={{ color: key === 'Sunrise' ? brandColors.gold : brandColors.teal }}>
                  {key}
                </span>
                <span className="text-sm tabular-nums" style={{ color: brandColors.teal }}>
                  {times[key]}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={detectLocation}
            className="mt-4 w-full py-2 text-[10px] tracking-[0.12em] uppercase font-medium transition-opacity hover:opacity-70"
            style={{ border: '1px solid rgba(26,95,122,0.15)', color: brandColors.teal }}
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="mt-auto">
          {error && (
            <div className="flex items-start gap-2 mb-4 p-3" style={{ backgroundColor: 'rgba(179,71,63,0.06)' }}>
              <MapPinOff size={14} className="shrink-0 mt-0.5" style={{ color: '#b3473f' }} />
              <p className="text-xs leading-relaxed" style={{ color: '#b3473f' }}>{error}</p>
            </div>
          )}
          <button
            onClick={detectLocation}
            disabled={loading}
            className="w-full py-2.5 text-[10px] font-medium tracking-[0.15em] uppercase text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
            style={{ backgroundColor: brandColors.teal }}
          >
            {loading ? <><Loader size={13} className="animate-spin" /> Detecting…</> : 'Detect My Location'}
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Ramadan Countdown                                                 */
/* ------------------------------------------------------------------ */

function RamadanCountdown({ brandColors }) {
  const ramadan = useMemo(() => getNextRamadan(), []);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (ramadan.inRamadan || !ramadan.targetDate) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [ramadan]);

  let content;

  if (ramadan.inRamadan) {
    content = (
      <div className="text-center">
        <p className="text-2xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.gold }}>
          Ramadan Mubarak!
        </p>
        <p className="text-sm opacity-60">Day {ramadan.ramadanDay} of 30</p>
        {ramadan.daysLeft != null && (
          <p className="text-xs opacity-40 mt-2">{ramadan.daysLeft} days remaining</p>
        )}
      </div>
    );
  } else if (ramadan.targetDate) {
    const diff = ramadan.targetDate.getTime() - now;
    const totalSec = Math.max(Math.floor(diff / 1000), 0);
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;

    const units = [
      [days, 'Days'],
      [hours, 'Hours'],
      [mins, 'Mins'],
      [secs, 'Secs'],
    ];

    content = (
      <>
        <div className="grid grid-cols-4 gap-3 mb-4">
          {units.map(([val, label]) => (
            <div key={label} className="text-center p-2" style={{ backgroundColor: '#FAF7F0', border: '1px solid rgba(26,95,122,0.06)' }}>
              <p className="text-xl md:text-2xl font-light tabular-nums" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal }}>
                {String(val).padStart(2, '0')}
              </p>
              <p className="text-[8px] tracking-[0.15em] uppercase opacity-40 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
        <p className="text-[10px] opacity-40 text-center">
          Estimated start: {ramadan.targetDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </>
    );
  } else {
    content = <p className="text-sm opacity-40 italic text-center">Could not determine next Ramadan date.</p>;
  }

  const hijriYear = hijriLong(new Date()).year;
  const nextRamadanYear = ramadan.inRamadan ? hijriYear : parseInt(hijriYear, 10) + (hijriParts(new Date()).month >= 9 ? 1 : 0);

  return (
    <div className="bg-white p-6 flex flex-col" style={{ border: '1px solid rgba(26,95,122,0.08)' }}>
      <div className="w-9 h-9 flex items-center justify-center mb-5" style={{ backgroundColor: 'rgba(200,150,62,0.1)' }}>
        <Clock size={18} style={{ color: brandColors.gold }} />
      </div>
      <h3 className="font-medium mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal, fontSize: '1.1rem' }}>
        Ramadan {nextRamadanYear} Countdown
      </h3>
      <p className="text-xs leading-relaxed opacity-55 mb-5">
        {ramadan.inRamadan ? 'We are currently blessed with the month of Ramadan.' : 'Live countdown to the next blessed month.'}
      </p>
      <div className="mt-auto">{content}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tools Page                                                        */
/* ------------------------------------------------------------------ */

export default function Tools({ brandColors }) {
  return (
    <div className="animate-fadeIn w-full">
      {/* Page Header */}
      <div className="w-full px-6 md:px-12 lg:px-20 pt-16 pb-8 text-center">
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

      {/* Under Construction Banner */}
      <div className="w-full px-6 md:px-12 lg:px-20 pb-10">
        <div
          className="flex items-center justify-center gap-2.5 py-3 px-4 text-center"
          style={{ border: `1px dashed ${brandColors.gold}`, backgroundColor: 'rgba(200,150,62,0.05)' }}
        >
          <Construction size={15} style={{ color: brandColors.gold }} />
          <p className="text-[11px] tracking-[0.08em] font-medium" style={{ color: brandColors.teal }}>
            This page is under construction — more tools and refinements are coming soon, <span className="italic">in shaa Allah</span>.
          </p>
        </div>
      </div>

      <div className="w-full px-6 md:px-12 lg:px-20 pb-24">
        {/* Top row — prominent tools */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <ZakatCalculator brandColors={brandColors} />
          <HijriConverter brandColors={brandColors} />
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <PrayerTimeFinder brandColors={brandColors} />
          <RamadanCountdown brandColors={brandColors} />
        </div>
      </div>
    </div>
  );
}
