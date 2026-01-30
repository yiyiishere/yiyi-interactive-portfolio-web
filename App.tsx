import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from './components/Layout.tsx';
import ChatTurn from './components/ChatTurn.tsx';
import SuggestionGrid from './components/SuggestionGrid.tsx';
import Typewriter from './components/Typewriter.tsx';
import { fetchData } from './services/dataService.ts';
import { AppState, QASection, EvidenceItem } from './types.ts';

interface Turn {
  id: string;
  label: string;
  internalKey: string;
  section?: QASection;
  evidence?: EvidenceItem[];
}

/**
 * Single-page interactive portfolio website.
 * Features a conversation-style interface for exploring portfolio content.
 */
const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    keywords: null,
    evidence: null,
    qaSections: [],
    loading: true,
    error: null,
  });

  const [conversation, setConversation] = useState<Turn[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const data = await fetchData();
        setState({ ...data, loading: false, error: null });

        const params = new URLSearchParams(window.location.search);
        const urlKey = params.get('q');
        const keywords = data.keywords || {};
        
        if (urlKey) {
          const entry = Object.entries(keywords).find(([_, val]) => val === urlKey);
          if (entry) {
            const [label, internalKey] = entry;
            const section = data.qaSections.find(s => s.title.toLowerCase() === label.toLowerCase());
            const evidence = data.evidence[internalKey];
            
            setConversation([{ 
              id: Date.now().toString(), 
              label, 
              internalKey, 
              section, 
              evidence 
            }]);
            setShowSuggestions(false);
          }
        }
      } catch (err: any) {
        setState(prev => ({ 
          ...prev, 
          loading: false, 
          error: `Failed to initialize portfolio content: ${err.message}` 
        }));
      }
    };
    initialize();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, showSuggestions]);

  const handleSelectQuestion = useCallback((internalKey: string) => {
    if (!state.keywords) return;
    
    const label = Object.keys(state.keywords).find(k => state.keywords![k] === internalKey) || '';
    const section = state.qaSections.find(s => s.title.toLowerCase() === label.toLowerCase());
    const evidence = state.evidence?.[internalKey];

    setShowSuggestions(false);
    setConversation(prev => [
      ...prev,
      { id: Date.now().toString(), label, internalKey, section, evidence }
    ]);

    // Update URL without reloading
    const url = new URL(window.location.href);
    url.searchParams.set('q', internalKey);
    window.history.pushState({}, '', url);
  }, [state.keywords, state.qaSections, state.evidence]);

  const getRemainingQuestions = () => {
    if (!state.keywords) return [];
    const askedKeys = conversation.map(t => t.internalKey);
    return Object.entries(state.keywords)
      .filter(([_, internalKey]) => !askedKeys.includes(internalKey))
      .map(([label, internalKey]) => ({ label, internalKey }));
  };

  if (state.loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-64 gap-8">
          <div className="w-10 h-10 border-[2px] border-zinc-200 border-t-zinc-800 rounded-full animate-spin"></div>
          <p className="text-zinc-400 font-bold tracking-[0.4em] text-[10px] uppercase">Loading Portfolio...</p>
        </div>
      </Layout>
    );
  }

  if (state.error) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto p-12 bg-white border border-zinc-200 rounded-3xl text-zinc-900 shadow-sm mt-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-zinc-900"></span>
            System Notice
          </h2>
          <p className="text-zinc-500 text-[15px] leading-relaxed mb-8">{state.error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors">
            Try again
          </button>
        </div>
      </Layout>
    );
  }

  const remaining = getRemainingQuestions();

  return (
    <Layout>
      <div className="flex flex-col min-h-full max-w-[920px] mx-auto w-full px-6 md:px-12">
        
        {/* Landing View Hero */}
        <div className="text-center pt-24 pb-20 md:pt-32 md:pb-28 mb-12 border-b border-zinc-100/60">
          <h1 className="text-[34px] md:text-[46px] font-bold text-zinc-900 mb-4 tracking-tight">
            <Typewriter text="Hi, I’m Yiyi." speed={130} />
          </h1>
          <p className="text-[17px] md:text-[19px] text-zinc-400 font-[300] tracking-tight leading-relaxed">
            Ask me anything.
          </p>
        </div>

        {/* Conversation View */}
        <div className="flex flex-col space-y-8 pb-12">
          {conversation.map((turn, index) => (
            <ChatTurn 
              key={turn.id}
              label={turn.label}
              section={turn.section}
              evidence={turn.evidence}
              isLast={index === conversation.length - 1}
              onTypingComplete={() => setShowSuggestions(true)}
            />
          ))}
        </div>

        {/* Topics & Interaction Area */}
        {showSuggestions && (
          <div className="pb-40 mt-6">
            <SuggestionGrid 
              questions={remaining} 
              onSelect={handleSelectQuestion}
              title={conversation.length > 0 ? "Related topics you might find interesting" : "Explore my background and experience by selecting a topic"}
            />
            
            {remaining.length === 0 && conversation.length > 0 && (
              <div className="pt-16 text-center animate-in fade-in duration-1000">
                <div className="inline-block px-5 py-2.5 bg-zinc-50 border border-zinc-100 rounded-full text-[11px] text-zinc-500 font-bold uppercase tracking-[0.2em]">
                  End of Conversation
                </div>
              </div>
            )}
            
            {/* Premium Chat Input Visual */}
            <div className={`mt-16 transition-all duration-500 ${remaining.length === 0 ? 'opacity-0 scale-95' : 'opacity-40 hover:opacity-100'}`}>
               <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 md:p-5 flex items-center justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] cursor-default">
                  <span className="text-zinc-400 text-[15px] font-[400] italic ml-2">Select a topic above to continue...</span>
                  <div className="flex items-center gap-4">
                    <span className="hidden md:inline text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Enter ↵</span>
                    <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} className="h-20" />
      </div>
    </Layout>
  );
};

export default App;