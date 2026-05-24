import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📚</span>
              <span className="text-xl font-bold text-white">PaperHouse</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Pakistan's #1 free past papers library. All Punjab Boards. All Subjects. 2018-2026. No signup required.
            </p>
            <p className="text-xs text-gray-500 mt-3 font-medium">Cookie-free. No login. 100% Free. Forever.</p>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-800 hover:bg-green-600 transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-800 hover:bg-green-600 transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-800 hover:bg-green-600 transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.16 8.16 0 004.77 1.53V6.77a4.85 4.85 0 01-1-.08z"/></svg>
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-800 hover:bg-green-600 transition-colors"><MessageCircle className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-green-400 transition-colors">Home</Link></li>
              <li><Link to="/browse" className="hover:text-green-400 transition-colors">Browse Papers</Link></li>
              <li><Link to="/request" className="hover:text-green-400 transition-colors">Request a Paper</Link></li>
              <li><Link to="/about" className="hover:text-green-400 transition-colors">About</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-green-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Source</h4>
            <p className="text-sm text-gray-400 leading-relaxed">Papers sourced from <a href="https://www.ustad360.com" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">ustad360.com</a></p>
            <p className="text-sm text-gray-400 mt-2">JazakAllah to their team 🙏</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">&copy; 2025 PaperHouse. All rights reserved.</p>
          <p className="text-xs text-gray-500 text-center">PaperHouse is free forever. Made with ❤️ for Pakistani students 🇵🇰</p>
        </div>
      </div>
    </footer>
  );
}
