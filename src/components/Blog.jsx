import { getExcerpt } from '../utils/blogContent';

export default function Blog({ navigate, posts, brandColors }) {
  const featured = posts.find((post) => post.featured) || posts[0];
  const rest = posts.filter((post) => post.id !== featured?.id);

  return (
    <div className="animate-fadeIn w-full">
      {/* Page Header */}
      <div className="w-full px-6 md:px-12 lg:px-20 pt-16 pb-12 text-center">
        <p className="text-[10px] font-medium tracking-[0.28em] uppercase mb-3" style={{ color: brandColors.gold }}>
          The Atelier
        </p>
        <h1 className="text-5xl md:text-6xl font-light mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal }}>
          The Journal
        </h1>
        <p className="text-sm opacity-60 max-w-md mx-auto leading-relaxed">
          Resources, tips, and insights for Islamic parenting and spiritual growth.
        </p>
        <div className="w-10 h-px mx-auto mt-5" style={{ backgroundColor: brandColors.gold }} />
      </div>

      <div className="w-full px-6 md:px-12 lg:px-20 pb-24">
        {/* Featured Post */}
        {featured && (
          <article
            className="group mb-16 grid md:grid-cols-2 gap-0 overflow-hidden bg-white cursor-pointer hover:shadow-xl transition-shadow"
            style={{ border: '1px solid rgba(26,95,122,0.08)' }}
            onClick={() => navigate('blogPost', featured)}
          >
            {/* Image */}
            <div
              className="min-h-[280px] md:min-h-[380px] overflow-hidden"
              style={{
                backgroundImage: `url('${featured.thumbnail || `https://placehold.co/800x600/${brandColors.teal.replace('#', '')}/FAF7F0?text=`}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="text-[9px] tracking-[0.22em] uppercase font-medium mb-4" style={{ color: brandColors.gold }}>
                Featured · {featured.category} · {featured.date}
              </p>
              <h2
                className="text-2xl md:text-3xl font-light leading-snug mb-5 group-hover:opacity-70 transition-opacity"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal }}
              >
                {featured.title}
              </h2>
              <p className="text-sm leading-relaxed opacity-60 mb-8">
                {getExcerpt(featured.content, 160)}…
              </p>
              <span
                className="self-start text-[10px] tracking-[0.18em] uppercase font-medium pb-0.5"
                style={{ color: brandColors.teal, borderBottom: `1px solid ${brandColors.gold}` }}
              >
                Read Article
              </span>
            </div>
          </article>
        )}

        {/* Remaining Posts */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <article
                key={post.id}
                className="group bg-white overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                style={{ border: '1px solid rgba(26,95,122,0.08)' }}
                onClick={() => navigate('blogPost', post)}
              >
                {/* Thumbnail */}
                <div
                  className="h-52 overflow-hidden"
                  style={{
                    backgroundImage: `url('${post.thumbnail || `https://placehold.co/600x400/${brandColors.teal.replace('#', '')}/FAF7F0?text=`}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                {/* Content */}
                <div className="p-6">
                  <p className="text-[9px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: brandColors.gold }}>
                    {post.category} · {post.date}
                  </p>
                  <h2
                    className="font-light leading-snug mb-3 group-hover:opacity-70 transition-opacity"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: brandColors.teal, fontSize: '1.2rem' }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-xs leading-relaxed opacity-50 mb-5">
                    {getExcerpt(post.content, 100)}…
                  </p>
                  <span
                    className="text-[10px] tracking-[0.15em] uppercase font-medium pb-0.5"
                    style={{ color: brandColors.teal, borderBottom: `1px solid ${brandColors.gold}` }}
                  >
                    Read More
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
