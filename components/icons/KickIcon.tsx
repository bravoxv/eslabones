import React from 'react';

export const KickIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    {...props}
  >
    <path d="M4 4 H10 V10 H14 V4 H20 V10 L14 12 L20 14 V20 H14 V14 H10 V20 H4 Z"/>
  </svg>
);
