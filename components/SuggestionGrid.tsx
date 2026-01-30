import React from 'react';

interface SuggestionGridProps {
  questions: { label: string; internalKey: string }[];
  onSelect: (key: string) => void;
  title?: string;
}

const SuggestionGrid: React.FC<SuggestionGridProps> = ({ questions, onSelect, title }) => {
  if (questions.length === 0) return null;

  return (
    <div className="w-full py-12 animate-in fade-in slide-in-from-top-4 duration-1000">
      {title && (
        <h3 className="text-center text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.3em] mb-12">
          {title}
        </h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {questions.map(({ label, internalKey }) => (
          <button
            key={internalKey}
            onClick={() => onSelect(internalKey)}
            className="flex flex-col items-start p-6 bg-white border border-zinc-200/70 rounded-2xl text-left hover:border-zinc-400 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden h-full"
          >
            <span className="text-zinc-800 font-medium text-[15px] leading-[1.4] mb-4 pr-6">
              {label}
            </span>
            <div className="mt-auto flex items-center gap-2 text-[10px] font-bold text-zinc-300 uppercase tracking-[0.1em] group-hover:text-zinc-500 transition-colors">
              Read Answer 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-zinc-50 rounded-bl-[100px] -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestionGrid;