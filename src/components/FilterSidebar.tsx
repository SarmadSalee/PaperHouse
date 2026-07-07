'use client';

import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { FilterState } from '../types';
import { CLASSES, SUBJECTS, PAPER_TYPES } from '../data/papers';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClose?: () => void;
}

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 dark:border-gray-700 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <button
        className="flex items-center justify-between w-full text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 hover:text-green-600 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="space-y-2">{children}</div>}
    </div>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input type="checkbox" checked={checked} onChange={onChange} className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 focus:ring-offset-0" />
      <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{label}</span>
    </label>
  );
}

function Radio({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input type="radio" checked={checked} onChange={onChange} className="w-4 h-4 border-gray-300 text-green-600 focus:ring-green-500 focus:ring-offset-0" />
      <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{label}</span>
    </label>
  );
}

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];
}

export default function FilterSidebar({ filters, onChange, onClose }: FilterSidebarProps) {
  const hasFilters = filters.classes.length > 0 || filters.subjects.length > 0 || filters.types.length > 0;

  function clearAll() {
    onChange({ ...filters, classes: [], subjects: [], types: [] });
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-gray-900 dark:text-white text-base">Filters</h2>
        <div className="flex items-center gap-2">
          {hasFilters && (
            <button onClick={clearAll} className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
              <X className="w-3.5 h-3.5" />
              Clear all
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      <Section title="Class">
        {CLASSES.map(c => (
          <Radio key={c} label={c} checked={filters.classes.includes(c)} onChange={() => onChange({ ...filters, classes: [c] })} />
        ))}
        {filters.classes.length > 0 && (
          <button onClick={() => onChange({ ...filters, classes: [] })} className="text-xs text-gray-400 hover:text-red-500 mt-1 transition-colors">Clear class</button>
        )}
      </Section>

      <Section title="Subject" defaultOpen={false}>
        {SUBJECTS.map(s => (
          <Checkbox key={s} label={s} checked={filters.subjects.includes(s)} onChange={() => onChange({ ...filters, subjects: toggle(filters.subjects, s) })} />
        ))}
      </Section>

      <Section title="Paper Type">
        {PAPER_TYPES.map(t => (
          <Radio key={t} label={t} checked={filters.types.includes(t)} onChange={() => onChange({ ...filters, types: [t] })} />
        ))}
        {filters.types.length > 0 && (
          <button onClick={() => onChange({ ...filters, types: [] })} className="text-xs text-gray-400 hover:text-red-500 mt-1 transition-colors">Clear type</button>
        )}
      </Section>
    </div>
  );
}
