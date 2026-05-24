export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-5xl mb-3 block">📚</span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Why PaperHouse?</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { emoji: '🆓', title: 'Free Forever', desc: 'No hidden fees, no paywalls. Every paper is free to access.' },
            { emoji: '🚫', title: 'No Signup', desc: 'No accounts, no passwords. Just click and study.' },
            { emoji: '📚', title: 'All Subjects', desc: '12 subjects across Matric and FSc, all Punjab Boards.' },
          ].map(({ emoji, title, desc }) => (
            <div key={title} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 text-center" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <span className="text-3xl mb-3 block">{emoji}</span>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1.5">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-8" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            PaperHouse was built for Pakistani students who deserve fast, free access to past papers without paywalls or distractions. Every student should be able to prepare for their board exams regardless of their financial situation.
          </p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Credits</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Papers sourced from <a href="https://www.ustad360.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 font-medium">ustad360.com</a> — JazakAllah to their team 🙏
          </p>
        </div>
      </div>
    </div>
  );
}
