import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        ExplainIt! + BrainBoost
      </h1>
      <p className="mt-2 text-lg text-slate-600">Your Smart Learning Companion</p>
    </header>
  );
};
