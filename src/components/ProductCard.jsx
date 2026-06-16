import { ExternalLink } from 'lucide-react';

export default function ProductCard({ product, brandColors }) {
  const purchaseLinks = product.purchaseLinks || [];

  return (
    <div className="group bg-white flex flex-col overflow-hidden transition-shadow hover:shadow-lg" style={{ border: '1px solid rgba(26,95,122,0.08)' }}>
      {/* Image */}
      <div className="relative overflow-hidden" style={{ paddingBottom: '125%' }}>
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {/* Type badge */}
        <div
          className="absolute top-3 left-3 text-[9px] font-medium tracking-[0.15em] uppercase px-2.5 py-1"
          style={{ backgroundColor: 'rgba(250,247,240,0.92)', color: brandColors.teal, backdropFilter: 'blur(4px)' }}
        >
          {product.type}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-[9px] tracking-[0.18em] uppercase opacity-50 mb-1.5">{product.category}</p>
        <h3
          className="font-medium leading-snug mb-2 flex-grow"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal, fontSize: '1rem' }}
        >
          {product.title}
        </h3>
        <p
          className="text-base font-semibold mb-4"
          style={{ color: brandColors.gold, fontFamily: "'DM Sans', sans-serif" }}
        >
          ${product.price.toFixed(2)}
        </p>

        {/* Purchase links */}
        <div className="flex flex-col gap-2 mt-auto">
          {purchaseLinks.map((link) => (
            <a
              key={link.platform || link.type}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-medium tracking-[0.12em] uppercase transition-colors"
              style={{
                border: '1px solid rgba(26,95,122,0.15)',
                color: brandColors.teal,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = brandColors.teal; e.currentTarget.style.color = '#FAF7F0'; e.currentTarget.style.borderColor = brandColors.teal; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = brandColors.teal; e.currentTarget.style.borderColor = 'rgba(26,95,122,0.15)'; }}
            >
              <ExternalLink size={11} />
              {link.platform || link.type}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
