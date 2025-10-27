import React, { useEffect, createRef } from 'react';
import type { Language } from '../App';

interface GiscusCommentsProps {
  language: Language;
}

const GiscusComments: React.FC<GiscusCommentsProps> = ({ language }) => {
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';

    // IMPORTANT: Replace these with your own repository details
    // You can generate these at https://giscus.app
    script.setAttribute('data-repo', 'giscus/giscus-component');
    script.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkzNTE5NTgwNTM=');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOFComrc4CA_sA');
    
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'transparent_dark');
    script.setAttribute('data-lang', language);

    // Clear previous instance if it exists
    while (ref.current.firstChild) {
      ref.current.removeChild(ref.current.firstChild);
    }

    ref.current.appendChild(script);

  }, [language, ref]);

  return <div ref={ref} />;
};

export default GiscusComments;