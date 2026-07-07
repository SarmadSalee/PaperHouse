'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, ChevronRight, BookOpen, Newspaper, Lightbulb, BarChart2 } from 'lucide-react';
import {
  blogPosts,
  categoryLabels,
  type BlogCategory,
} from '../../data/blogPosts';

const ALL_CATEGORIES: Array<{ key: BlogCategory | 'all'; label: string; icon: React.ElementType }> = [
  { key: 'all', label: 'All Posts', icon: BookOpen },
  { key: 'board-guides', label: 'Board Guides', icon: BookOpen },
  { key: 'exam-tips', label: 'Exam Tips', icon: Lightbulb },
  { key: 'news', label: 'News', icon: Newspaper },
  { key: 'comparison', label: 'Comparison', icon: BarChart2 },
];

const CATEGORY_COLORS: Record<BlogCategory, { bg: string; text: string; border: string }> = {
  'board-guides': { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
  'exam-tips': { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-400', border: 'border-green-200 dark:border-green-800' },
  'news': { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800' },
  'comparison': { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800' },
};

const CATEGORY_EMOJIS: Record<BlogCategory, string> = {
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

function BlogCard({ post }: { post: (typeof blogPosts)[number] }) {
  const colors = CATEGORY_COLORS[post.category];
  return (
    <article className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-green-200 dark:hover:border-green-700 transition-all duration-300 flex flex-col">
      <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-600" />

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}>
            <span>{CATEGORY_EMOJIS[post.category]}</span>
            {categoryLabels[post.category]}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime} min read
          </span>
        </div>

        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors line-clamp-2">
          {post.h1}
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 dark:border-gray-700">
          <time className="text-xs text-gray-400 dark:text-gray-500">
            {formatDate(post.publishedAt)}
          </time>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
          >
            Read more
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'all'>('all');

  const filtered =
    activeCategory === 'all'
      ? blogPosts
      : blogPosts.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-green-950 to-emerald-900 text-white py-16 md:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            PaperHouse Blog
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4 tracking-tight">
            Study Smarter, <span className="text-green-400">Score Higher</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Board guides, exam tips, date sheets and past-paper strategies — everything a Matric & FSc student needs in one place.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <span className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5">{blogPosts.length} Articles</span>
            <span className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5">9 Punjab Boards</span>
            <span className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5">Free Forever</span>
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
            {ALL_CATEGORIES.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === key
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No posts in this category yet.</div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing <strong className="text-gray-900 dark:text-white">{filtered.length}</strong> article{filtered.length !== 1 ? 's' : ''}
                {activeCategory !== 'all' && ` in ${categoryLabels[activeCategory as BlogCategory]}`}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        )}
      </section>

      <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to start practising?</h2>
          <p className="text-green-100 mb-6">Download free past papers for any Punjab board — all subjects, all years.</p>
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 bg-white text-green-700 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition-colors shadow-lg"
          >
            Browse Papers
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
