import { ArrowLeft } from 'lucide-react';

export default function BlogPost({ post, navigate, brandColors }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-12 py-16 animate-fadeIn">
      <button
        onClick={() => navigate('blog')}
        className="mb-8 flex items-center hover:text-[#C8963E] transition-colors font-bold uppercase tracking-wider text-sm"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Journal
      </button>

      <div className="text-center mb-10">
        <span className="text-sm font-bold uppercase tracking-wider mb-4 block" style={{ color: brandColors.gold }}>
          {post.category} • {post.date}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
          {post.title}
        </h1>
        <div
          className="w-full h-[400px] md:h-[500px] bg-gray-200 rounded-lg mb-10 object-cover flex items-center justify-center text-gray-400"
          style={{
            backgroundImage: `url('https://placehold.co/1600x800/${brandColors.teal.replace('#', '')}/${brandColors.ivory.replace('#', '')}?text=Blog+Header+Image')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      </div>

      <div className="prose prose-lg max-w-none text-left">
        {post.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="mb-6 text-lg leading-relaxed opacity-90">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-12 p-8 rounded-lg bg-white border border-[#C8963E]/30 shadow-sm text-center">
        <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Continue the Journey</h3>
        <p className="mb-6 opacity-80">Explore our premium digital resources specifically designed to complement this topic.</p>
        <button
          onClick={() => navigate('shop')}
          className="px-8 py-3 font-bold rounded text-white shadow hover:opacity-90 transition-opacity"
          style={{ backgroundColor: brandColors.teal }}
        >
          Shop Related Resources
        </button>
      </div>

      <div className="mt-16 pt-8 border-t border-[#1A5F7A]/20 flex justify-between items-center">
        <h3 className="text-xl font-bold" style={{ fontFamily: "'Cinzel', serif" }}>Share this article</h3>
        <div className="flex space-x-4">
          <button className="text-[#1A5F7A] hover:text-[#C8963E] transition-colors font-bold text-sm uppercase tracking-wider">Facebook</button>
          <button className="text-[#1A5F7A] hover:text-[#C8963E] transition-colors font-bold text-sm uppercase tracking-wider">Twitter</button>
          <button className="text-[#1A5F7A] hover:text-[#C8963E] transition-colors font-bold text-sm uppercase tracking-wider">Email</button>
        </div>
      </div>
    </div>
  );
}
