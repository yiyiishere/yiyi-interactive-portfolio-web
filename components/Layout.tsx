import React from 'react';
import { DATA_SOURCES } from '../constants.ts';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Main Layout component for the Yiyi Portfolio Website.
 * Wraps the single-page content with a consistent header and transparent footer.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 md:px-12 py-6 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-50 border-b border-zinc-100/50">
        <a href="/" className="text-xl font-bold text-zinc-900 tracking-tight hover:opacity-70 transition-opacity">
          Yiyi <span className="text-zinc-400 font-light">Portfolio</span>
        </a>
        <div className="hidden md:block text-[10px] font-bold text-zinc-400 uppercase tracking-[0.25em]">
          Verbatim Interactive Website
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        {children}
      </main>

      <footer className="mt-auto px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-zinc-400 uppercase tracking-[0.2em]">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <span className="font-semibold text-zinc-500">Portfolio Demo &copy; {new Date().getFullYear()}</span>
          <span className="hidden md:inline text-zinc-200">|</span>
          <span className="text-zinc-400">Placeholder Name &middot; Placeholder Title</span>
        </div>
        <div className="flex gap-6 items-center">
          <span className="font-bold text-zinc-500">Data Transparency:</span>
          <a href={DATA_SOURCES.QA_MARKDOWN} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 underline underline-offset-8 decoration-zinc-200 transition-colors">Markdown</a>
          <a href={DATA_SOURCES.KEYWORDS_JSON} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 underline underline-offset-8 decoration-zinc-200 transition-colors">Keywords</a>
          <a href={DATA_SOURCES.EVIDENCE_JSON} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 underline underline-offset-8 decoration-zinc-200 transition-colors">Evidence</a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;