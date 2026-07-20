export interface CategoryStyle {
  bg: string;
  text: string;
  border: string;
  shadow: string;
  gradient: string;
}

const styles: Record<string, CategoryStyle> = {
  'App Reviews': {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-900',
    shadow: '#1b8af1',
    gradient: 'from-blue-100 via-sky-50 to-indigo-100',
  },
  'Getting Started': {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-900',
    shadow: '#16a34a',
    gradient: 'from-green-100 via-emerald-50 to-teal-100',
  },
  'Science & Research': {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-900',
    shadow: '#9333ea',
    gradient: 'from-purple-100 via-violet-50 to-fuchsia-100',
  },
  'Habits & Routines': {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    border: 'border-amber-900',
    shadow: '#f59e0b',
    gradient: 'from-amber-100 via-yellow-50 to-orange-100',
  },
  'AI & Technology': {
    bg: 'bg-indigo-100',
    text: 'text-indigo-800',
    border: 'border-indigo-900',
    shadow: '#6366f1',
    gradient: 'from-indigo-100 via-blue-50 to-violet-100',
  },
  'Mental Wellness': {
    bg: 'bg-rose-100',
    text: 'text-rose-800',
    border: 'border-rose-900',
    shadow: '#e11d48',
    gradient: 'from-rose-100 via-pink-50 to-red-100',
  },
};

const fallback: CategoryStyle = {
  bg: 'bg-stone-100',
  text: 'text-stone-800',
  border: 'border-stone-900',
  shadow: '#1c1917',
  gradient: 'from-stone-100 via-stone-50 to-stone-200',
};

export function getCategoryColor(category: string): CategoryStyle {
  return styles[category] ?? fallback;
}
