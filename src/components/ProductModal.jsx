import { useEffect } from 'react';
import { X, ExternalLink, Eye } from 'lucide-react';

export default function ProductModal({ product, brandColors, onClose }) {
  const purchaseLinks = product.purchaseLinks || [];
  const details = product.details || [];

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-modalBackdrop"
      style={{ backgroundColor: 'rgba(26,95,122,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative bg-[#FAF7F0] w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-modalSlide"
        style={{ border: '1px solid rgba(26,95,122,0.1)' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 transition-opacity hover:opacity-60"
          style={{ color: brandColors.teal }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative flex items-center justify-center p-6 md:p-10" style={{ backgroundColor: 'rgba(26,95,122,0.04)', minHeight: 320 }}>
            <img
              src={product.image}
              alt={product.title}
              className="w-auto max-w-full object-contain rounded-sm"
              style={{ maxHeight: '65vh', boxShadow: '0 8px 30px rgba(26,95,122,0.12)' }}
            />
            <div
              className="absolute top-3 left-3 text-[9px] font-medium tracking-[0.15em] uppercase px-2.5 py-1"
              style={{ backgroundColor: 'rgba(250,247,240,0.92)', color: brandColors.teal, backdropFilter: 'blur(4px)' }}
            >
              {product.type}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10 flex flex-col">
            <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: brandColors.gold }}>
              {product.category}
            </p>

            <h2
              className="text-2xl md:text-3xl font-light leading-snug mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal }}
            >
              {product.title}
            </h2>

            {product.subtitle && (
              <p className="text-sm opacity-50 mb-4 italic">{product.subtitle}</p>
            )}

            <p
              className="text-xl font-semibold mb-5"
              style={{ color: brandColors.gold, fontFamily: "'DM Sans', sans-serif" }}
            >
              ${product.price.toFixed(2)}
            </p>

            {/* Description */}
            {product.description && (
              <>
                <div className="w-8 h-px mb-4" style={{ backgroundColor: brandColors.gold }} />
                <p className="text-sm leading-[1.8] opacity-70 mb-6">{product.description}</p>
              </>
            )}

            {/* Details */}
            {details.length > 0 && (
              <div className="mb-6">
                <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-3 opacity-40">Details</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {details.map((d) => (
                    <div key={d.label} className="flex flex-col">
                      <span className="text-[10px] tracking-wider uppercase opacity-40">{d.label}</span>
                      <span className="text-sm" style={{ color: brandColors.teal }}>{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sample link */}
            {product.sampleLink && (
              <a
                href={product.sampleLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 text-[11px] font-medium tracking-[0.14em] uppercase transition-colors"
                style={{ border: `1px solid ${brandColors.gold}`, color: brandColors.gold }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = brandColors.gold; e.currentTarget.style.color = '#FAF7F0'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = brandColors.gold; }}
              >
                <Eye size={13} />
                Preview Free Sample
              </a>
            )}

            {/* Purchase links */}
            <div className="flex flex-col gap-2 mt-auto pt-2">
              {purchaseLinks.map((link) => (
                <a
                  key={link.platform || link.type}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 text-[11px] font-medium tracking-[0.14em] uppercase transition-colors"
                  style={{ backgroundColor: brandColors.teal, color: '#FAF7F0' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = brandColors.gold; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = brandColors.teal; }}
                >
                  <ExternalLink size={13} />
                  Buy on {link.platform || link.type}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
