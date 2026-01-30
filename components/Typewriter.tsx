
import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  paragraphPause?: number;
  punctuationPause?: number;
  onComplete?: () => void;
  skip?: boolean;
}

const Typewriter: React.FC<TypewriterProps> = ({ 
  text, 
  speed = 25, 
  paragraphPause = 500, 
  punctuationPause = 200,
  onComplete, 
  skip = false 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (skip) {
      setDisplayedText(text);
      setCurrentIndex(text.length);
      if (onComplete) onComplete();
      return;
    }

    if (currentIndex < text.length) {
      const char = text[currentIndex];
      const nextChar = text[currentIndex + 1];
      
      let delay = speed;
      
      // Paragraph pause
      if (char === '\n' && nextChar === '\n') {
        delay = paragraphPause;
      } 
      // Punctuation pause
      else if (['.', '!', '?', ';'].includes(char) && nextChar === ' ') {
        delay = punctuationPause;
      }

      timerRef.current = window.setTimeout(() => {
        setDisplayedText((prev) => prev + char);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
    } else if (onComplete) {
      onComplete();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, text, speed, paragraphPause, punctuationPause, onComplete, skip]);

  return (
    <div className="whitespace-pre-wrap relative inline">
      {displayedText}
      {currentIndex < text.length && !skip && (
        <span className="cursor-blink" />
      )}
    </div>
  );
};

export default Typewriter;
