import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { getExplanation, getBrainBoost } from './services/geminiService';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { ResponseDisplay } from './components/ResponseDisplay';
import { LightbulbIcon } from './components/icons/LightbulbIcon';
import { BrainIcon } from './components/icons/BrainIcon';
import { HistoryPanel } from './components/HistoryPanel';
import { SpeechControl } from './components/SpeechControl';

export interface HistoryItem {
  id: string;
  type: 'explain' | 'boost';
  query: string;
  response: string;
  timestamp: number;
}

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [apiResponse, setApiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const savedHistory = localStorage.getItem('explainItHistory');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error("Failed to parse history from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('explainItHistory', JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save history to localStorage", error);
    }
  }, [history]);

  const handleExplainIt = useCallback(async () => {
    if (!userInput.trim() || isLoading) return;

    setIsLoading(true);
    setApiResponse('');
    setError(null);
    try {
      const response = await getExplanation(userInput);
      setApiResponse(response);
      const newHistoryItem: HistoryItem = {
        id: crypto.randomUUID(),
        type: 'explain',
        query: userInput,
        response,
        timestamp: Date.now(),
      };
      setHistory(prev => [newHistoryItem, ...prev]);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userInput, isLoading]);

  const handleBrainBoost = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    setApiResponse('');
    setError(null);
    setUserInput('');
    try {
      const response = await getBrainBoost();
      setApiResponse(response);
       const newHistoryItem: HistoryItem = {
        id: crypto.randomUUID(),
        type: 'boost',
        query: 'Brain Boost',
        response,
        timestamp: Date.now(),
      };
      setHistory(prev => [newHistoryItem, ...prev]);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);
  
  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleExplainIt();
    }
  };

  const handleReloadHistory = (item: HistoryItem) => {
    if (item.type === 'explain') {
      setUserInput(item.query);
    } else {
      setUserInput('');
    }
    setApiResponse(item.response);
    setShowHistory(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your entire learning history? This cannot be undone.")) {
      setHistory([]);
    }
  };
  
  const speechText = useMemo(() => {
    if (!apiResponse) return '';
    const KEY_IDEA_MARKER = '**Key Idea:**';
    let mainText = apiResponse;
    let keyIdea = '';

    if (apiResponse.includes(KEY_IDEA_MARKER)) {
        const parts = apiResponse.split(KEY_IDEA_MARKER);
        mainText = parts[0].trim();
        keyIdea = parts[1]?.trim() || '';
    }

    // Remove markdown asterisks for cleaner speech
    mainText = mainText.replace(/\*\*/g, '');
    keyIdea = keyIdea.replace(/\*\*/g, '');

    return keyIdea ? `${mainText}. Key Idea: ${keyIdea}` : mainText;
  }, [apiResponse]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-slate-800 flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-3xl mx-auto">
        <Header />

        <main className="mt-8 bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={handleExplainIt}
              disabled={isLoading || !userInput.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              <LightbulbIcon className="w-5 h-5" />
              Explain It!
            </button>
            <button
              onClick={handleBrainBoost}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              <BrainIcon className="w-5 h-5" />
              Brain Boost
            </button>
          </div>

          <div>
            <label htmlFor="userInput" className="block text-sm font-medium text-slate-600 mb-2">
              What do you want to understand?
            </label>
            <textarea
              id="userInput"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., 'What is photosynthesis?' or 'How do black holes work?'"
              className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 min-h-[120px] text-base"
              rows={4}
            />
          </div>

          <div className="relative mt-6 min-h-[150px] bg-slate-50/50 p-4 sm:p-6 rounded-lg border border-slate-200">
            {isLoading && <Loader />}
            {error && <div className="text-red-600 font-semibold">{error}</div>}
            {!isLoading && !error && apiResponse && (
              <>
                <div className="absolute top-2 right-2 z-10">
                  <SpeechControl textToRead={speechText} />
                </div>
                <ResponseDisplay response={apiResponse} />
              </>
            )}
            {!isLoading && !error && !apiResponse && (
              <div className="text-center text-slate-500">
                <p>Your explanation or brain boost will appear here!</p>
              </div>
            )}
          </div>
        </main>

        <div className="text-center mt-6">
          <button
            onClick={() => setShowHistory(prev => !prev)}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-3 py-1"
            aria-controls="history-panel"
            aria-expanded={showHistory}
          >
            {showHistory ? 'Hide' : 'Show'} Learning History
          </button>
        </div>

        {showHistory && (
          <HistoryPanel
            history={history}
            onReload={handleReloadHistory}
            onClear={handleClearHistory}
          />
        )}
      </div>
    </div>
  );
};

export default App;