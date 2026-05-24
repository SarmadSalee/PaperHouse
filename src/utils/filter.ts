import { Paper, FilterState } from '../types';

export function filterPapers(papers: Paper[], filters: FilterState): Paper[] {
  return papers.filter(paper => {
    if (filters.classes.length && !filters.classes.includes(paper.class)) return false;
    if (filters.subjects.length && !filters.subjects.includes(paper.subject)) return false;
    if (filters.types.length && !filters.types.includes(paper.type)) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const haystack = `${paper.board} ${paper.class} ${paper.subject} ${paper.year} ${paper.type}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function highlightText(text: string, query: string): string {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="bg-green-200 dark:bg-green-800 rounded px-0.5">$1</mark>');
}

export function parseFiltersFromParams(params: URLSearchParams): Partial<FilterState> {
  return {
    classes: params.getAll('class'),
    subjects: params.getAll('subject'),
    types: params.getAll('type'),
    search: params.get('q') || '',
  };
}

export function filtersToParams(filters: FilterState): URLSearchParams {
  const params = new URLSearchParams();
  filters.classes.forEach(c => params.append('class', c));
  filters.subjects.forEach(s => params.append('subject', s));
  filters.types.forEach(t => params.append('type', t));
  if (filters.search) params.set('q', filters.search);
  return params;
}
