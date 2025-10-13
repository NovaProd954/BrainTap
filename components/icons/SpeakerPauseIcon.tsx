import React from 'react';

export const SpeakerPauseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className="w-6 h-6" 
    {...props}
  >
    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.348 2.595.341 1.24 1.518 1.905 2.66 1.905H6.44l4.5 4.5c.945.945 2.56.276 2.56-1.06V4.06zM17.25 6.75a.75.75 0 00-1.5 0v10.5a.75.75 0 001.5 0V6.75z" />
    <path d="M20.25 6.75a.75.75 0 00-1.5 0v10.5a.75.75 0 001.5 0V6.75z" />
  </svg>
);