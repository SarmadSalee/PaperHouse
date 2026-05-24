import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Search, File as FileEdit } from 'lucide-react';

const tabs = [
  { to: '/', icon: Home, label: 'Home', emoji: '🏠' },
  { to: '/browse', icon: BookOpen, label: 'Browse', emoji: '📂' },
  { to: '/search', icon: Search, label: 'Search', emoji: '🔍' },
  { to: '/request', icon: FileEdit, label: 'Request', emoji: '📬' },
];

export default function MobileNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 px-2 py-1 safe-area-bottom">
      <div className="flex items-center justify-around">
        {tabs.map(({ to, icon: Icon, label, emoji }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-colors ${
                active ? 'text-green-600' : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <span className="text-lg">{emoji}</span>
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
