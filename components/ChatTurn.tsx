import React, { useState } from 'react';
import Typewriter from './Typewriter.tsx';
import EvidenceCard from './EvidenceCard.tsx';
import { QASection, EvidenceItem } from '../types.ts';

interface ChatTurnProps {
  label: string;
  section: QASection | undefined;
  evidence: EvidenceItem[] | undefined;
  isLast: boolean;
  onTypingComplete: () => void;
}

const ChatTurn: React.FC<ChatTurnProps> = ({ label, section, evidence, isLast, onTypingComplete }) => {
  const [isSkipped, setIsSkipped] = useState(false);
  const [doneTyping, setDoneTyping] = useState(false);

  const handleComplete = () => {
    if (!doneTyping) {
      setDoneTyping(true);
      onTypingComplete();
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* User Bubble */}
      <div className="flex justify-end">
        <div className="bg-[#f2f2f2] text-zinc-800 px-6 py-3.5 rounded-3xl rounded-tr-none max-w-[85%] font-medium text-[16px] shadow-sm border border-zinc-200/30">
          {label}
        </div>
      </div>

      {/* Assistant Bubble */}
      <div className="flex justify-start">
        <div className="bg-white border border-zinc-200/60 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] p-7 md:p-10 rounded-3xl rounded-tl-none w-full relative">
          {!section ? (
            <div className="flex items-center gap-3 text-zinc-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="italic text-sm">Content unavailable for this section.</p>
            </div>
          ) : (
            <>
              <div className="text-[17px] md:text-[18px] text-zinc-800 leading-relaxed font-[400] tracking-tight">
                <Typewriter 
                  text={section.body} 
                  speed={20} 
                  skip={isSkipped} 
                  onComplete={handleComplete}
                />
              </div>

              {isLast && !doneTyping && !isSkipped && (
                <button 
                  type="button"
                  onClick={() => {
                    setIsSkipped(true);
                    setDoneTyping(true);
                    onTypingComplete();
                  }}
                  className="mt-8 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 hover:text-zinc-900 transition-all duration-200 flex items-center gap-2 group cursor-pointer"
                >
                  <div className="p-1.5 rounded-full bg-zinc-50 group-hover:bg-zinc-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </div>
                  Reveal Full Answer
                </button>
              )}

              {evidence && evidence.length > 0 && (
                <div className={`mt-10 pt-10 border-t border-zinc-100 transition-all duration-700 ease-in-out ${!doneTyping && !isSkipped ? 'opacity-30' : 'opacity-100 translate-y-0'}`}>
                  <div className="flex items-center gap-3 mb-6">
                     <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">Verification Citations</h4>
                     <div className="h-px bg-zinc-100 flex-grow"></div>
                  </div>
                  <div className="grid grid-cols-1 gap-5">
                    {evidence.map((item, idx) => (
                      <EvidenceCard key={idx} item={item} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatTurn;