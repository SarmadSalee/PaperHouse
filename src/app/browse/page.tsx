'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import { papers } from '../../data/papers';
import { FilterState } from '../../types';
import { filterPapers, parseFiltersFromParams, filtersToParams } from '../../utils/filter';
import PaperCard from '../../components/PaperCard';
import FilterSidebar from '../../components/FilterSidebar';
import SkeletonCard from '../../components/SkeletonCard';
import RectangleAd from '../../components/ads/RectangleAd';
import SidebarAd from '../../components/ads/SidebarAd';

const EMPTY: FilterState = { classes: [], subjects: [], types: [], search: '' };

function BrowseContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...EMPTY,
    ...parseFiltersFromParams(searchParams as unknown as URLSearchParams),
  }));

  useEffect(() => {
    const params = filtersToParams(filters);
    router.replace(`/browse?${params.toString()}`, { scroll: false });
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [filters]);

  const results = useMemo(() => filterPapers(papers, filters), [filters]);

  const hasFilters = filters.classes.length > 0 || filters.subjects.length > 0 || filters.types.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Browse Papers</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Filter by class, subject and paper type</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-4 md:hidden">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Showing {results.length} of {papers.length} papers
          </span>
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium px-4 py-2 rounded-xl hover:border-green-300 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasFilters && (
              <span className="bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {filters.classes.length + filters.subjects.length + filters.types.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-6">
          <aside className="hidden md:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar filters={filters} onChange={setFilters} />
              <SidebarAd />
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="items-center justify-between mb-5 hidden md:flex">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Showing <span className="text-gray-900 dark:text-white font-semibold">{results.length}</span> of {papers.length} papers
              </span>
              {hasFilters && (
                <button onClick={() => setFilters(EMPTY)} className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1 font-medium">
                  <X className="w-4 h-4" />
                  Clear filters
                </button>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No papers found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your filters or request the paper</p>
                <a href="/request" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2.5 rounded-full transition-colors">Request a Paper</a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((paper, i) => (
                  <div key={paper.id}>
                    <PaperCard paper={paper} />
                    {(i + 1) % 6 === 0 && <div className="mt-4"><RectangleAd /></div>}
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <div className="relative bg-white dark:bg-gray-900 rounded-t-3xl max-h-[85vh] overflow-y-auto p-4 pb-8">
            <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4" />
            <FilterSidebar filters={filters} onChange={setFilters} onClose={() => setShowFilters(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    }>
      <BrowseContent />
    </Suspense>
  );
}
