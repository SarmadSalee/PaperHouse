import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, ChevronRight, Tag } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';
import {
  getPostBySlug,
  getRelatedPosts,
  categoryLabels,
  type BlogPost,
} from '../data/blogPosts';

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'board-guides': { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
  'exam-tips': { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-400', border: 'border-green-200 dark:border-green-800' },
  'news': { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800' },
  'comparison': { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800' },
};

const CATEGORY_EMOJIS: Record<string, string> = {
  'board-guides': '🏫',
  'exam-tips': '💡',
  'news': '📰',
  'comparison': '📊',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function RelatedPostCard({ post }: { post: BlogPost }) {
  const colors = CATEGORY_COLORS[post.category];
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 hover:shadow-md transition-all duration-200"
    >
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border mb-2 ${colors.bg} ${colors.text} ${colors.border}`}>
        {CATEGORY_EMOJIS[post.category]} {categoryLabels[post.category]}
      </span>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors leading-snug line-clamp-2">
        {post.h1}
      </h3>
      <div className="flex items-center gap-1 mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
        Read article <ChevronRight className="w-3 h-3" />
      </div>
    </Link>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = getRelatedPosts(post);
  const colors = CATEGORY_COLORS[post.category];
  const isNews = post.category === 'news';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHead
        title={post.metaTitle}
        description={post.metaDescription}
        keywords={post.keywords}
        canonical={`/blog/${post.slug}`}
        type="article"
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
      />

      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/blog" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700 dark:text-gray-300 truncate max-w-xs">{post.metaTitle}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Category badge */}
            <div className="mb-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}>
                {CATEGORY_EMOJIS[post.category]}
                {categoryLabels[post.category]}
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
              {post.h1}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Published {formatDate(post.publishedAt)}
              </span>
              {isNews && (
                <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
                  <Calendar className="w-4 h-4" />
                  Updated {formatDate(post.updatedAt)}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </span>
            </div>

            {/* Article Body */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Keywords tags */}
            {post.keywords.length > 0 && (
              <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-gray-400" />
                  {post.keywords.map(kw => (
                    <span
                      key={kw}
                      className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-100 dark:border-green-800 text-center">
              <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">Ready to practise?</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Browse the full PaperHouse archive — all Punjab boards, all subjects, free.</p>
              <Link
                to="/browse"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
              >
                Browse Past Papers
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-20 space-y-6">
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Related Articles</h3>
                  <div className="space-y-3">
                    {relatedPosts.map(rp => (
                      <RelatedPostCard key={rp.slug} post={rp} />
                    ))}
                  </div>
                </div>
              )}

              {/* Browse CTA */}
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-5 text-white text-center">
                <div className="text-3xl mb-2">📚</div>
                <h3 className="font-bold mb-1">Download Past Papers</h3>
                <p className="text-green-100 text-xs mb-4 leading-relaxed">All Punjab boards. All subjects. 2018–2026. Free forever.</p>
                <Link
                  to="/browse"
                  className="block bg-white text-green-700 font-bold text-sm px-4 py-2 rounded-full hover:bg-green-50 transition-colors"
                >
                  Browse Now →
                </Link>
              </div>

              {/* More from Blog */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">More from Blog</h3>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1.5 text-sm text-green-600 dark:text-green-400 font-semibold hover:underline"
                >
                  All articles <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
