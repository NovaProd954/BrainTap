import React from 'react';

export const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className="w-6 h-6" 
    {...props}
  >
    <path fillRule="evenodd" d="M12 2.25c-3.033 0-5.5 2.403-5.5 5.336 0 2.235 1.343 4.14 3.25 4.966V15a.75.75 0 00.75.75h3a.75.75 0 00.75-.75v-2.448c1.907-.826 3.25-2.731 3.25-4.966C17.5 4.653 15.033 2.25 12 2.25zM9.75 18a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z" clipRule="evenodd" />
  </svg>
);
