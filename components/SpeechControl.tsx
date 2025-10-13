import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SpeakerPlayIcon } from './icons/SpeakerPlayIcon';
import { SpeakerPauseIcon } from './icons/SpeakerPauseIcon';

interface SpeechControlProps {
  textToRead: string;
}

export const SpeechControl: React.FC<SpeechControlProps> = ({ textToRead }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const cancelSpeech = useCallback(() => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Effect to stop speech when the text changes or component unmounts
  useEffect(() => {
    // When text changes, stop any current speech.
    cancelSpeech();
    setIsSpeaking(false);
    setIsPaused(false);

    // Main cleanup for when the component unmounts.
    return () => {
      cancelSpeech();
    };
  }, [textToRead, cancelSpeech]);

  const handlePlayPause = () => {
    if (isSpeaking && !isPaused) { // Speaking -> Pause
      window.speechSynthesis.pause();
    } else if (isPaused) { // Paused -> Resume
      window.speechSynthesis.resume();
    } else { // Not speaking -> Start
      cancelSpeech(); // Ensure nothing else is speaking
      const utterance = new SpeechSynthesisUtterance(textToRead);
      
      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };
      
      utterance.onpause = () => {
        setIsPaused(true);
        setIsSpeaking(true);
      };
      
      utterance.onresume = () => {
        setIsPaused(false);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };

      utterance.onerror = (event) => {
        console.error('SpeechSynthesisUtterance.onerror', event);
        setIsSpeaking(false);
        setIsPaused(false);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <button
      onClick={handlePlayPause}
      className="p-2 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50/50 focus:ring-blue-500"
      aria-label={isSpeaking && !isPaused ? 'Pause speech' : 'Play speech'}
    >
      {isSpeaking && !isPaused ? (
        <SpeakerPauseIcon className="w-6 h-6" />
      ) : (
        <SpeakerPlayIcon className="w-6 h-6" />
      )}
    </button>
  );
};