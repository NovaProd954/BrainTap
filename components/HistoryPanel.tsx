import React from 'react';
import { HistoryItem } from '../App';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { BrainIcon } from './icons/BrainIcon';
import { TrashIcon } from './icons/TrashIcon';

interface HistoryPanelProps {
  history: HistoryItem[];
  onReload: (item: HistoryItem) => void;
  onClear: () => void;
}

const formatTimestamp = (timestamp: number) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);

  if (diffSeconds < 60) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};


export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onReload, onClear }) => {
  return (
    <section id="history-panel" className="w-full max-w-3xl mx-auto mt-6 bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-700">Learning History</h2>
            {history.length > 0 && (
                <button
                    onClick={onClear}
                    className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-red-600 transition-colors disabled:bg-red-300"
                    aria-label="Clear history"
                    disabled={history.length === 0}
                >
                    <TrashIcon className="w-4 h-4" />
                    Clear All
                </button>
            )}
        </div>
        
        {history.length === 0 ? (
            <div className="text-center text-slate-500 py-8">
                <p>Your history is empty.</p>
                <p>Ask a question or get a brain boost to start your learning journey!</p>
            </div>
        ) : (
            <ul className="space-y-3 max-h-[400px] overflow-y-auto pr-2 -mr-2">
                {history.map(item => (
                    <li key={item.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100/80 transition-colors group">
                        <div className="flex justify-between items-center gap-4">
                           <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="flex-shrink-0">
                                    {item.type === 'explain' ? (
                                        <LightbulbIcon className="w-5 h-5 text-blue-500" />
                                    ) : (
                                        <BrainIcon className="w-5 h-5 text-purple-500" />
                                    )}
                                    </span>
                                    <p className="font-semibold text-slate-800 truncate" title={item.query}>
                                        {item.query}
                                    </p>
                                </div>
                                <p className="text-xs text-slate-500 ml-8">{formatTimestamp(item.timestamp)}</p>
                            </div>
                            <button
                                onClick={() => onReload(item)}
                                className="ml-4 px-4 py-1.5 bg-white border border-slate-300 text-sm font-medium rounded-md hover:bg-slate-200 transition-all transform group-hover:scale-105 group-hover:shadow-sm"
                            >
                                View
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        )}
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
          }
        `}</style>
    </section>
  );
};
