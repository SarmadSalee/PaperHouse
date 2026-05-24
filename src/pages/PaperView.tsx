import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ExternalLink, MessageCircle, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { papers, SUBJECT_EMOJI } from '../data/papers';
import PaperCard from '../components/PaperCard';
import RectangleAd from '../components/ads/RectangleAd';

export default function PaperView() {
  const { slug } = useParams<{ slug: string }>();
  const paper = papers.find(p => p.slug === slug);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (paper) {
      document.title = `${paper.subject} ${paper.class} Past Papers ${paper.year} — Free | PaperHouse`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', `Free ${paper.subject} past papers for ${paper.class} (${paper.year}) — All Punjab Boards. No signup required.`);
    }
    return () => {
      document.title = "PaperHouse — Free Matric & FSc Past Papers Pakistan";
    };
  }, [paper]);

  if (!paper) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Paper Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">This paper doesn't exist or has been removed.</p>
          <Link to="/browse" className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2.5 rounded-full transition-colors">Browse Papers</Link>
        </div>
      </div>
    );
  }

  const emoji = SUBJECT_EMOJI[paper.subject] ?? '📄';
  const title = `${paper.subject} Past Papers — ${paper.class} — ${paper.year}`;
  const related = papers.filter(p => p.class === paper.class && p.subject !== paper.subject).slice(0, 4);

  function handleView() {
    window.open(paper.viewUrl, '_blank');
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const whatsappText = `Free ${paper.subject} past papers for ${paper.class}: ${window.location.href}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-8 flex-wrap">
          <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <Link to="/browse" className="hover:text-green-600 transition-colors">Browse</Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-gray-800 dark:text-gray-200 font-medium">{paper.subject}</span>
        </nav>

        {/* Emoji */}
        <div className="text-center mb-6">
          <span className="text-6xl">{emoji}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-6 leading-snug">{title}</h1>

        {/* Info card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 mb-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Class', value: paper.class },
              { label: 'Board', value: paper.board },
              { label: 'Years', value: paper.year },
              { label: 'Type', value: paper.type },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1 uppercase font-medium tracking-wide">{label}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-6">
          <button
            onClick={handleView}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-8 py-4 rounded-full transition-colors shadow-lg hover:shadow-xl"
          >
            📄 Open Past Papers →
          </button>
        </div>

        {/* Info note */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 mb-6 text-center">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            ℹ️ You'll be redirected to the paper source website. Papers from {paper.year} are available there for free.
          </p>
        </div>

        {/* Share buttons */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={copyLink}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(whatsappText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1da854] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>

        {/* Rectangle Ad */}
        <div style={{ margin: '24px auto', textAlign: 'center', overflow: 'hidden' }}>
          <RectangleAd />
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">You might also need</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">More {paper.class} papers</p>
              </div>
              <Link to={`/browse?class=${encodeURIComponent(paper.class)}`} className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map(p => <PaperCard key={p.id} paper={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
