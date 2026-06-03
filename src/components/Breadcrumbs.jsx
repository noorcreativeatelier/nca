import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ currentPage, activePost, navigate, brandColors }) {
  if (currentPage === 'home') return null;

  const crumbs = (() => {
    const base = [{ label: 'Home', page: 'home' }];
    switch (currentPage) {
      case 'shop':     return [...base, { label: 'Digital Store', page: 'shop' }];
      case 'blog':     return [...base, { label: 'The Journal', page: 'blog' }];
      case 'blogPost': return [...base, { label: 'The Journal', page: 'blog' }, { label: activePost?.title, page: 'blogPost', data: activePost }];
      case 'tools':    return [...base, { label: 'Islamic Tools', page: 'tools' }];
      case 'sounds':   return [...base, { label: 'Ambient Sounds', page: 'sounds' }];
      case 'admin':    return [...base, { label: 'Admin', page: 'admin' }];
      default:         return base;
    }
  })();

  return (
    <div className="w-full" style={{ borderBottom: '1px solid rgba(26,95,122,0.07)', backgroundColor: brandColors.ivory }}>
      <div className="w-full px-6 md:px-12 lg:px-20 py-3 flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase font-medium scrollbar-hide overflow-x-auto whitespace-nowrap" style={{ color: brandColors.teal }}>
        {crumbs.map((crumb, idx) => (
          <span key={idx} className="flex items-center gap-1.5">
            {idx > 0 && <ChevronRight size={11} className="opacity-30 flex-shrink-0" />}
            <button
              onClick={() => idx < crumbs.length - 1 && navigate(crumb.page, crumb.data)}
              disabled={idx === crumbs.length - 1}
              className="transition-opacity truncate max-w-[200px]"
              style={{ opacity: idx === crumbs.length - 1 ? 1 : 0.45, color: idx === crumbs.length - 1 ? brandColors.gold : undefined, cursor: idx === crumbs.length - 1 ? 'default' : 'pointer' }}
              onMouseEnter={(e) => { if (idx < crumbs.length - 1) e.currentTarget.style.opacity = '0.8'; }}
              onMouseLeave={(e) => { if (idx < crumbs.length - 1) e.currentTarget.style.opacity = '0.45'; }}
            >
              {crumb.label}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
