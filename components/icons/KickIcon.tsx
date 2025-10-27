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
    <path d="M22.001 4.226H13.882l-3.333 4.226v-4.226H2v15.548h8.549v-4.832l4.226-5.342h7.226V4.226Z"/>
    <path d="M13.882 19.774h8.119V9.568h-4.226l-3.893 4.832v5.374Z"/>
  </svg>
);