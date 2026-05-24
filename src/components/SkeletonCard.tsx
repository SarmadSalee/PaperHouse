export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 animate-pulse" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        <div className="w-16 h-5 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </div>
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4" />
      <div className="flex gap-2 mb-2">
        <div className="h-5 w-14 bg-gray-100 dark:bg-gray-700/50 rounded-full" />
        <div className="h-5 w-20 bg-gray-100 dark:bg-gray-700/50 rounded-full" />
      </div>
      <div className="h-3 bg-gray-100 dark:bg-gray-700/50 rounded mb-4 w-1/3" />
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
    </div>
  );
}
