export default function Blog({ navigate, posts, brandColors }) {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-12 lg:px-24 py-16 animate-fadeIn">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Cinzel', serif" }}>The Atelier Journal</h1>
        <p className="text-xl max-w-2xl mx-auto opacity-80">Resources, tips, and insights for Islamic parenting and spiritual growth.</p>
        <div className="w-24 h-1 mx-auto mt-6" style={{ backgroundColor: brandColors.gold }}></div>
      </div>

      <div className="space-y-12">
        {posts.map((post) => (
          <article key={post.id} className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-lg shadow-sm border border-[#1A5F7A]/10 hover:shadow-md transition-shadow">
            <div
              className="md:w-1/3 bg-gray-200 rounded object-cover min-h-[200px] flex items-center justify-center text-gray-400"
              style={{
                backgroundImage: `url('https://placehold.co/600x400/${brandColors.teal.replace('#', '')}/${brandColors.ivory.replace('#', '')}?text=Blog+Image')`,
                backgroundSize: 'cover',
              }}
            ></div>
            <div className="md:w-2/3 flex flex-col justify-center">
              <span className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: brandColors.gold }}>
                {post.category} • {post.date}
              </span>
              <h2
                onClick={() => navigate('blogPost', post)}
                className="text-2xl font-bold mb-4 leading-tight hover:text-[#C8963E] cursor-pointer transition-colors"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {post.title}
              </h2>
              <p className="opacity-80 mb-6 text-lg">Learn effective strategies and discover the best resources to incorporate Islamic teachings into your daily family life. Click to read the full guide...</p>
              <button
                onClick={() => navigate('blogPost', post)}
                className="self-start font-bold border-b-2 pb-1 hover:opacity-70 transition-opacity"
                style={{ borderColor: brandColors.gold, color: brandColors.teal }}
              >
                Read Article
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
