import React, { useState } from 'react';
import { EvidenceItem } from '../types.ts';

interface EvidenceCardProps {
  item: EvidenceItem;
}

const EvidenceCard: React.FC<EvidenceCardProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-zinc-100 rounded-2xl overflow-hidden bg-[#fdfdfd] hover:bg-white hover:border-zinc-200 hover:shadow-sm transition-all duration-300">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left group transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-xl transition-colors ${isOpen ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200 group-hover:text-zinc-600'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-zinc-800 text-[15px] tracking-tight">
              {item.title}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-zinc-400 mt-1">
              Source: {item.type}
            </span>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-zinc-300 transition-transform duration-500 ${isOpen ? 'rotate-180 text-zinc-900' : 'group-hover:text-zinc-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 pt-2 animate-in slide-in-from-top-2 duration-400">
          <div className="flex flex-col gap-5 border-l-2 border-zinc-100 pl-6 ml-2">
            <div className="text-[15px] text-zinc-600 leading-relaxed font-[400]">
              {item.why_it_matters}
            </div>
            
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { 
                e.stopPropagation(); 
              }}
              className="inline-flex items-center gap-2.5 text-[14px] font-bold text-zinc-900 hover:text-indigo-600 transition-all duration-200 decoration-zinc-200 underline-offset-[10px] hover:underline hover:decoration-indigo-400 cursor-pointer w-fit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Review Verification
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvidenceCard;