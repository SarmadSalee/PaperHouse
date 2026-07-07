'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { papers, SUBJECT_EMOJI, CLASSES } from '../../../data/papers';
import PaperCard from '../../../components/PaperCard';

const CLASS_TABS = ['All', ...CLASSES];

export default function SubjectPageClient({ name }: { name: string }) {
  const subjectName = decodeURIComponent(name);
  const [cls, setCls] = useState('All');

  const subjectPapers = useMemo(
    () => papers.filter(p =>
      p.subject === subjectName &&
      (cls === 'All' || p.class === cls)
    ),
    [subjectName, cls]
  );

  const emoji = SUBJECT_EMOJI[subjectName] ?? '📄';

  if (!subjectName) {
    return <div className="p-8 text-center text-gray-500">Subject not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-4 justify-center">
            <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/subjects" className="hover:text-green-600 transition-colors">Subjects</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-800 dark:text-gray-200 font-medium">{subjectName}</span>
          </nav>
          <span className="text-5xl mb-3 block">{emoji}</span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{subjectName} Past Papers</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subjectPapers.length} paper{subjectPapers.length !== 1 ? 's' : ''} available</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {CLASS_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setCls(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                cls === tab
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-green-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {subjectPapers.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No papers found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Try a different class filter or request the paper</p>
            <Link href="/request" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2.5 rounded-full transition-colors">Request a Paper</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {subjectPapers.map(paper => <PaperCard key={paper.id} paper={paper} />)}
          </div>
        )}
      </div>
    </div>
  );
}
