import type { Metadata } from 'next';
import Link from 'next/link';
import { papers, SUBJECTS, SUBJECT_EMOJI } from '../../data/papers';

export const metadata: Metadata = {
  title: 'All Subjects — Matric & FSc Past Papers | PaperHouse',
  description: 'Browse past papers by subject for Matric and FSc. All Punjab Boards. Free PDF downloads.',
};

export default function Subjects() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">All Subjects</h1>
          <p className="text-gray-500 dark:text-gray-400">Select a subject to see its past papers across all classes</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {SUBJECTS.map(subject => {
            const emoji = SUBJECT_EMOJI[subject] ?? '📄';
            const count = papers.filter(p => p.subject === subject).length;
            return (
              <Link
                key={subject}
                href={`/subject/${encodeURIComponent(subject)}`}
                className="group flex flex-col items-center gap-3 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-700 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">{emoji}</span>
                <span className="text-sm text-center text-gray-700 dark:text-gray-300 font-semibold leading-tight">{subject}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">{count} paper{count !== 1 ? 's' : ''}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
