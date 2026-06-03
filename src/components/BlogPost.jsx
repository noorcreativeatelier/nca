import { ArrowLeft } from 'lucide-react';

export default function BlogPost({ post, navigate, brandColors }) {
  if (!post) {
    return (
      <div className="w-full px-6 py-32 text-center animate-fadeIn">
        <p className="text-sm opacity-50">Post not found.</p>
        <button onClick={() => navigate('blog')} className="mt-6 text-xs tracking-[0.15em] uppercase font-medium underline" style={{ color: brandColors.teal }}>
          Back to Journal
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn w-full">
      {/* Hero image */}
      <div
        className="w-full"
        style={{
          height: '50vh',
          minHeight: '320px',
          backgroundImage: `url('https://placehold.co/1600x800/${brandColors.teal.replace('#', '')}/FAF7F0?text=')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto">
          {/* Back */}
          <button
            onClick={() => navigate('blog')}
            className="flex items-center gap-2 mt-10 mb-10 text-[10px] tracking-[0.18em] uppercase font-medium transition-opacity hover:opacity-60"
            style={{ color: brandColors.teal }}
          >
            <ArrowLeft size={14} /> Back to Journal
          </button>

          {/* Meta */}
          <p className="text-[10px] tracking-[0.22em] uppercase font-medium mb-4" style={{ color: brandColors.gold }}>
            {post.category} · {post.date}
          </p>

          {/* Title */}
          <h1
            className="text-4xl md:text-5xl font-light leading-tight mb-10"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal }}
          >
            {post.title}
          </h1>

          {/* Divider */}
          <div className="w-10 h-px mb-10" style={{ backgroundColor: brandColors.gold }} />

          {/* Body */}
          <div className="space-y-6 pb-16">
            {post.content.split('\n\n').map((para, i) => (
              <p key={i} className="text-base leading-[1.85] opacity-75">
                {para}
              </p>
            ))}
          </div>

          {/* Share bar */}
          <div
            className="flex items-center justify-between py-6 mb-12"
            style={{ borderTop: '1px solid rgba(26,95,122,0.1)', borderBottom: '1px solid rgba(26,95,122,0.1)' }}
          >
            <p className="text-[10px] tracking-[0.18em] uppercase opacity-50">Share</p>
            <div className="flex gap-6">
              {['Facebook', 'Twitter', 'Email'].map((platform) => (
                <button key={platform} className="text-[10px] tracking-[0.15em] uppercase font-medium transition-opacity hover:opacity-60" style={{ color: brandColors.teal }}>
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="w-full py-20" style={{ backgroundColor: brandColors.teal }}>
        <div className="max-w-xl mx-auto text-center px-6">
          <p className="text-[10px] tracking-[0.25em] uppercase font-medium mb-4" style={{ color: brandColors.gold }}>
            Continue the Journey
          </p>
          <h2 className="text-3xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.ivory }}>
            Explore Related Resources
          </h2>
          <p className="text-sm opacity-60 mb-8" style={{ color: brandColors.ivory }}>
            Browse our premium digital collection designed to complement your Islamic parenting journey.
          </p>
          <button
            onClick={() => navigate('shop')}
            className="px-10 py-4 text-[11px] font-medium tracking-[0.18em] uppercase text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: brandColors.gold }}
          >
            Shop Resources
          </button>
        </div>
      </div>
    </div>
  );
}
