'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { papers } from '../../data/papers';
import { filterPapers } from '../../utils/filter';
import { FilterState } from '../../types';
import PaperCard from '../../components/PaperCard';
import SkeletonCard from '../../components/SkeletonCard';

const EMPTY: FilterState = { classes: [], subjects: [], types: [], search: '' };

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setDebouncedQuery(query);
      setLoading(false);
      if (query) router.replace(`/search?q=${encodeURIComponent(query)}`, { scroll: false });
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const results = useMemo(
    () => filterPapers(papers, { ...EMPTY, search: debouncedQuery }),
    [debouncedQuery]
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Search Papers</h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by subject, class, board, year..."
              autoFocus
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 text-base"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {debouncedQuery && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
            {loading ? 'Searching...' : `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${debouncedQuery}"`}
          </p>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : !debouncedQuery ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">Start typing to search papers...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No papers found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              No results for "{debouncedQuery}" — Request it below 👇
            </p>
            <Link
              href={`/request?subject=${encodeURIComponent(debouncedQuery)}`}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2.5 rounded-full transition-colors"
            >
              Request this Paper
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {results.map(paper => (
              <PaperCard key={paper.id} paper={paper} highlight={debouncedQuery} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
