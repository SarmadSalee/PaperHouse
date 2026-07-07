import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronRight, Clock, ArrowLeft } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';
import {
  getPostsByCategory,
  categoryLabels,
  categoryDescriptions,
  type BlogCategory,
  type BlogPost,
} from '../data/blogPosts';

const VALID_CATEGORIES: BlogCategory[] = ['board-guides', 'exam-tips', 'news', 'comparison'];

const CATEGORY_COLORS: Record<BlogCategory, { bg: string; text: string; border: string; hero: string }> = {
  'board-guides': {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-700 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
    hero: 'from-blue-900 via-blue-800 to-indigo-900',
  },
  'exam-tips': {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-700 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
    hero: 'from-green-900 via-green-800 to-emerald-900',
  },
  'news': {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    text: 'text-amber-700 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-800',
    hero: 'from-amber-900 via-amber-800 to-orange-900',
  },
  'comparison': {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-700 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
    hero: 'from-purple-900 via-purple-800 to-violet-900',
  },
};

const CATEGORY_EMOJIS: Record<BlogCategory, string> = {
  'board-guides': '🏫',
  'exam-tips': '💡',
  'news': '📰',
  'comparison': '📊',
};

const CATEGORY_META: Record<BlogCategory, { title: string; description: string }> = {
  'board-guides': {
    title: 'Board Guides — Free Past Papers for All Punjab Boards | PaperHouse',
    description: 'Board-specific past paper guides for BISE Lahore, Multan, Gujranwala, Rawalpindi and all Punjab boards. Free PDF downloads.',
  },
  'exam-tips': {
    title: 'Exam Tips & Study Strategies for Matric & FSc | PaperHouse Blog',
    description: 'Expert exam tips, study plans, grading guides, and past paper strategies for Matric and FSc students in Pakistan.',
  },
  'news': {
    title: 'Punjab Board News — Date Sheets, Pattern Changes 2026 | PaperHouse',
    description: 'Latest Punjab board news: 2026 date sheets, paper pattern changes, and official exam announcements — updated regularly.',
  },
  'comparison': {
    title: 'Best Study Resources & Top Papers for Matric & FSc | PaperHouse',
    description: 'Curated comparisons of the best free study resources and most popular past papers for Matric and FSc students in Pakistan.',
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function PostRow({ post, colors }: { post: BlogPost; colors: (typeof CATEGORY_COLORS)[BlogCategory] }) {
  return (
    <article className="group flex gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-green-200 dark:hover:border-green-700 transition-all duration-300">
      <div className="flex-1 min-w-0">
        <h2 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors mb-1.5 leading-snug">
          {post.h1}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-3">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
          <span>{formatDate(post.publishedAt)}</span>
          <span className="flex items-center gap-0.5">
            <Clock className="w-3 h-3" />
            {post.readTime} min
          </span>
        </div>
      </div>
      <div className="flex items-center shrink-0">
        <Link
          to={`/blog/${post.slug}`}
          className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border} hover:opacity-80 transition-opacity whitespace-nowrap`}
        >
          Read <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </article>
  );
}

export default function BlogCategory() {
  const { category } = useParams<{ category: string }>();

  if (!category || !VALID_CATEGORIES.includes(category as BlogCategory)) {
    return <Navigate to="/blog" replace />;
  }

  const cat = category as BlogCategory;
  const posts = getPostsByCategory(cat);
  const colors = CATEGORY_COLORS[cat];
  const meta = CATEGORY_META[cat];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHead
        title={meta.title}
        description={meta.description}
        canonical={`/blog/category/${cat}`}
      />

      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${colors.hero} text-white py-14 md:py-18`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-4xl mb-3">{CATEGORY_EMOJIS[cat]}</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">{categoryLabels[cat]}</h1>
          <p className="text-gray-300 max-w-lg mx-auto">{categoryDescriptions[cat]}</p>
          <div className="mt-4 inline-flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm">
            {posts.length} article{posts.length !== 1 ? 's' : ''}
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/blog" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700 dark:text-gray-300">{categoryLabels[cat]}</span>
          </nav>
        </div>
      </div>

      {/* Posts */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          All Categories
        </Link>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No posts yet in this category.</div>
        ) : (
          <div className="space-y-4">
            {posts.map(post => (
              <PostRow key={post.slug} post={post} colors={colors} />
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-12 p-6 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl text-white text-center">
          <p className="font-bold text-lg mb-1">Done reading? Time to practise.</p>
          <p className="text-green-100 text-sm mb-4">Download free past papers for any Punjab board.</p>
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 bg-white text-green-700 font-bold px-6 py-2 rounded-full hover:bg-green-50 transition-colors"
          >
            Browse Papers <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
