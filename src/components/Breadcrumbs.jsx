import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ currentPage, activePost, navigate, brandColors }) {
  if (currentPage === 'home') return null;

  const getBreadcrumbData = () => {
    const base = [{ label: 'Home', page: 'home' }];
    switch (currentPage) {
      case 'shop':
        return [...base, { label: 'Digital Store', page: 'shop' }];
      case 'blog':
        return [...base, { label: 'The Atelier Journal', page: 'blog' }];
      case 'blogPost':
        return [...base, { label: 'The Atelier Journal', page: 'blog' }, { label: activePost?.title, page: 'blogPost', data: activePost }];
      case 'tools':
        return [...base, { label: 'Islamic Utility Tools', page: 'tools' }];
      case 'sounds':
        return [...base, { label: 'Halal Ambient Audio', page: 'sounds' }];
      default:
        return base;
    }
  };

  const crumbs = getBreadcrumbData();

  return (
    <div className="bg-[#FAF7F0] border-b border-[#1A5F7A]/10 py-3 w-full">
      <div className="w-full px-4 md:px-12 lg:px-24 2xl:px-32 flex items-center text-xs md:text-sm font-bold opacity-80 overflow-x-auto whitespace-nowrap scrollbar-hide" style={{ fontFamily: "'Cinzel', serif", color: brandColors.teal }}>
        {crumbs.map((crumb, idx) => (
          <span key={idx} className="flex items-center">
            {idx > 0 && <ChevronRight size={14} className="mx-2 flex-shrink-0 opacity-50" />}
            <button
              onClick={() => navigate(crumb.page, crumb.data)}
              className={`hover:text-[#C8963E] transition-colors truncate max-w-[200px] md:max-w-xs ${idx === crumbs.length - 1 ? 'text-[#C8963E] cursor-default' : ''}`}
              disabled={idx === crumbs.length - 1}
            >
              {crumb.label}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
