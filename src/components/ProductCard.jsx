import { ExternalLink } from 'lucide-react';

export default function ProductCard({ product, brandColors }) {
  const purchaseLinks = product.purchaseLinks || [];

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#1A5F7A]/10 hover:shadow-xl transition-shadow flex flex-col">
      <div className="relative pb-[120%] bg-gray-100">
        <img src={product.image} alt={product.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold tracking-wider rounded uppercase" style={{ color: brandColors.teal }}>
          {product.type}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>{product.title}</h3>
        <p className="text-2xl font-bold mb-4" style={{ color: brandColors.gold }}>${product.price.toFixed(2)}</p>
        <div className="grid gap-3 mt-auto">
          {purchaseLinks.map((link) => (
            <a
              key={link.platform || link.type}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded border border-[#1A5F7A]/20 text-[#1A5F7A] font-semibold transition hover:bg-[#1A5F7A]/5"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <ExternalLink size={16} />
              Buy on {link.platform || link.type}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
