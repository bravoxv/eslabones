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

    // Giscus configuration connected to the user's repository.
    script.setAttribute('data-repo', 'bravoxv/eslabones');
    script.setAttribute('data-repo-id', 'R_kgDOQJu-Nw');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOQJu-N84CxHAi');
    script.setAttribute('data-mapping', 'url');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'transparent_dark');
    script.setAttribute('data-lang', language);

    // Clean up previous instance if it exists
    while (ref.current.firstChild) {
      ref.current.removeChild(ref.current.firstChild);
    }

    ref.current.appendChild(script);

  }, [language, ref]);

  return <div ref={ref} />;
};

export default GiscusComments;
