import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { SUBJECTS, SUBJECT_EMOJI, papers } from '../data/papers';
import NativeBannerAd from '../components/ads/NativeBannerAd';
import RectangleAd from '../components/ads/RectangleAd';

const QUICK_FILTERS = [
  { label: '9th Class', value: '9th' },
  { label: '10th Class', value: '10th' },
  { label: 'FSc Part 1', value: 'FSc Part 1' },
  { label: 'FSc Part 2', value: 'FSc Part 2' },
];

export default function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  function handleQuickFilter(cls: string) {
    navigate(`/browse?class=${encodeURIComponent(cls)}`);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
            Pakistan's #1 Free Past Papers Library
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
            Find Any Matric &amp; FSc<br className="hidden sm:block" />
            Past Paper — <span className="text-green-200">Free, Fast, Forever</span>
          </h1>
          <p className="text-green-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            All Punjab Boards. All Subjects. 2018–2026. No signup required.
          </p>

          <div onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6">
            <div className="relative flex items-center bg-white rounded-full shadow-2xl overflow-hidden p-1.5">
              <Search className="absolute left-5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSearch(e); }}
                placeholder="Search by subject, class or year..."
                className="flex-1 pl-12 pr-4 py-3 text-gray-900 bg-transparent outline-none text-base placeholder-gray-400"
              />
              <button
                onClick={handleSearch}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-colors whitespace-nowrap flex items-center gap-2"
              >
                Search
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {QUICK_FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => handleQuickFilter(f.value)}
                className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 hover:scale-105"
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-green-700 text-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
          <span>📄 30 Papers</span>
          <span>📚 12 Subjects</span>
          <span>📅 2018–2026</span>
          <span>🆓 100% Free</span>
        </div>
      </div>

      {/* Native Banner Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <NativeBannerAd />
      </div>

      {/* Subject cards grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">Browse by Subject</h2>
          <p className="text-gray-500 dark:text-gray-400">Tap any subject to see its past papers</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {SUBJECTS.map(subject => {
            const emoji = SUBJECT_EMOJI[subject] ?? '📄';
            const count = papers.filter(p => p.subject === subject).length;
            return (
              <a
                key={subject}
                href={`/subject/${encodeURIComponent(subject)}`}
                className="group flex flex-col items-center gap-2 p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-700 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{emoji}</span>
                <span className="text-xs text-center text-gray-700 dark:text-gray-300 font-medium leading-tight">{subject}</span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500">{count} paper{count !== 1 ? 's' : ''}</span>
              </a>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', emoji: '🔍', title: 'Search', desc: 'Find your subject, class or board' },
              { step: '2', emoji: '👆', title: 'Click View', desc: 'Open the paper source website' },
              { step: '3', emoji: '📖', title: 'Study', desc: 'Download and start preparing!' },
            ].map(({ step, emoji, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{emoji}</span>
                </div>
                <div className="text-xs text-green-600 font-semibold mb-1">Step {step}</div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">Can't find your paper?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Request any past paper and we'll add it within 48 hours — free!</p>
        <a
          href="/request"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          Request a Paper →
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>
    </div>
  );
}
