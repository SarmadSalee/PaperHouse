import { Link } from 'react-router-dom';
import { Paper } from '../types';
import { SUBJECT_EMOJI } from '../data/papers';

interface PaperCardProps {
  paper: Paper;
  highlight?: string;
}

export default function PaperCard({ paper, highlight }: PaperCardProps) {
  const emoji = SUBJECT_EMOJI[paper.subject] ?? '📄';

  function hl(text: string) {
    if (!highlight) return <span>{text}</span>;
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-green-200 dark:bg-green-800 rounded px-0.5 text-inherit">{part}</mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-700 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl">{emoji}</span>
          {paper.isNew && (
            <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              NEW ✨
            </span>
          )}
        </div>
        <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2 leading-snug">
          {hl(paper.subject)}
        </h3>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-0.5 rounded-full font-medium">
            {hl(paper.class)}
          </span>
          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2.5 py-0.5 rounded-full font-medium">
            {hl(paper.year)}
          </span>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500">{hl(paper.board)}</p>
      </div>
      <div className="px-5 pb-5 pt-0">
        <Link
          to={`/paper/${paper.slug}`}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors"
        >
          View Papers →
        </Link>
        <p className="text-[11px] text-gray-400 dark:text-gray-500 text-center mt-2">Opens free source • No signup</p>
      </div>
    </div>
  );
}
