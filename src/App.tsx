import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import Browse from './pages/Browse';
import PaperView from './pages/PaperView';
import Subjects from './pages/Subjects';
import SubjectPage from './pages/SubjectPage';
import SearchPage from './pages/SearchPage';
import Request from './pages/Request';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <MobileNav />
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/browse" element={<Layout><Browse /></Layout>} />
          <Route path="/paper/:slug" element={<Layout><PaperView /></Layout>} />
          <Route path="/subjects" element={<Layout><Subjects /></Layout>} />
          <Route path="/subject/:name" element={<Layout><SubjectPage /></Layout>} />
          <Route path="/search" element={<Layout><SearchPage /></Layout>} />
          <Route path="/request" element={<Layout><Request /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
