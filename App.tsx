import React, { useState } from 'react';
import type { Youtuber } from './types';
import { YOUTUBER_GROUP } from './constants';
import { translations } from './i18n';
import MemberCard from './components/MemberCard';
import SocialModal from './components/SocialModal';
import Navbar from './components/Navbar';

export type Language = 'es' | 'en';

const App: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<Youtuber | null>(null);
  const [language, setLanguage] = useState<Language>('es');

  const handleCardClick = (member: Youtuber) => {
    setSelectedMember(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  const t = translations[language];

  return (
    <div className="flex justify-center p-6 sm:p-10">
      <style>{`
        @keyframes animate-gradient {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .title-base {
          font-size: 64px;
          letter-spacing: 6px;
          margin: 0;
          text-transform: uppercase;
          font-weight: 900;
          display: inline-block;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: animate-gradient 10s linear infinite;
        }

        .title-colors {
          background-image: linear-gradient(
            90deg,
            #020617 5%,
            #a0d8f0 25%,
            #184d29 45%,
            #b82323 65%,
            #ff6b00 80%,
            #020617 95%
          );
          background-size: 200% 100%;
        }

        .title-stars {
          background-image: 
            radial-gradient(circle at 20% 20%, white 0px, transparent 1px),
            radial-gradient(circle at 75% 45%, white 0px, transparent 0.8px),
            radial-gradient(circle at 50% 80%, white 0px, transparent 1.2px);
          background-size: 60px 60px, 80px 80px, 50px 50px;
          mix-blend-mode: color-dodge;
        }
        
        @media (max-width: 560px) { .title-base { font-size: 40px; } }
      `}</style>

      <div className="w-full max-w-[1200px]">
        <Navbar language={language} setLanguage={setLanguage} />

        <section className="text-center py-12 px-4 mb-8 relative">
          <div 
            className="relative inline-block" 
            style={{ filter: 'drop-shadow(0 4px 15px rgba(0, 0, 0, 0.4))' }}
          >
            <h1 className="title-base title-colors">
              ESLABONES
            </h1>
            <h1 className="title-base title-stars absolute inset-0">
              ESLABONES
            </h1>
          </div>
          <p className="text-[var(--muted)] mt-3 text-base">
            {t.subtitle}
          </p>
        </section>
        
        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-2">
            {YOUTUBER_GROUP.map((member) => (
              <MemberCard key={member.id} member={member} onClick={handleCardClick} language={language} />
            ))}
          </div>
        </main>
      </div>
      
      <SocialModal member={selectedMember} onClose={handleCloseModal} language={language} />
    </div>
  );
};

export default App;
