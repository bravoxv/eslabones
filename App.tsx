import React, { useState } from 'react';
import type { Youtuber } from './types';
import { YOUTUBER_GROUP } from './constants';
import { translations } from './i18n';
import MemberCard from './components/MemberCard';
import SocialModal from './components/SocialModal';
import Navbar from './components/Navbar';
import CommentsModal from './components/CommentsModal';
import SettingsModal from './components/SettingsModal';
import SpaceBackground from './components/SpaceBackground';

export type Language = 'es' | 'en';

const App: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<Youtuber | null>(null);
  const [language, setLanguage] = useState<Language>('es');
  const [showComments, setShowComments] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [streamlabsUrl, setStreamlabsUrl] = useState<string>(() => {
    return localStorage.getItem('streamlabsUrl') || '';
  });

  const [streamlabsHtml, setStreamlabsHtml] = useState<string>(() => {
    return localStorage.getItem('streamlabsHtml') || '';
  });

  const [youtubeVideoId, setYoutubeVideoId] = useState<string>(() => {
    return localStorage.getItem('youtubeVideoId') || '';
  });

  const [youtubeChannelUrl, setYoutubeChannelUrl] = useState<string>(() => {
    return localStorage.getItem('youtubeChannelUrl') || '';
  });

  const handleStreamlabsUrlChange = (url: string) => {
    setStreamlabsUrl(url);
    localStorage.setItem('streamlabsUrl', url);
  };

  const handleStreamlabsHtmlChange = (html: string) => {
    setStreamlabsHtml(html);
    localStorage.setItem('streamlabsHtml', html);
  };

  const handleYoutubeVideoIdChange = (id: string) => {
    setYoutubeVideoId(id);
    localStorage.setItem('youtubeVideoId', id);
  };

  const handleYoutubeChannelUrlChange = (url: string) => {
    setYoutubeChannelUrl(url);
    localStorage.setItem('youtubeChannelUrl', url);
  };

  const handleCardClick = (member: Youtuber) => {
    setSelectedMember(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  const t = translations[language];

  return (
    <>
      {/* Animated Space Background with Warp Speed Effect */}
      <SpaceBackground />

      <div className="relative z-10 flex justify-center p-4 sm:p-6 md:p-10 min-h-screen">
        <style>{`
        @keyframes animate-gradient {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .title-base {
          font-size: clamp(32px, 8vw, 72px);
          letter-spacing: 0.05em;
          margin: 0;
          text-transform: uppercase;
          font-weight: 900;
          display: inline-block;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: animate-gradient 12s linear infinite;
          filter: drop-shadow(0 0 20px rgba(160, 216, 240, 0.3));
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

        .subtitle-shimmer {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.7) 50%,
            rgba(255, 255, 255, 0.4) 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: shimmer 3s ease-in-out infinite;
        }

        .grid-auto-fit {
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }

        @media (max-width: 640px) {
          .grid-auto-fit {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

        <div className="w-full max-w-[1400px]">
          {/* Navigation */}
          <Navbar
            language={language}
            setLanguage={setLanguage}
            onShowComments={() => setShowComments(true)}
          />

          {/* Hero Section with Enhanced Title */}
          <section className="text-center py-12 sm:py-16 md:py-20 px-4 mb-8 sm:mb-12 relative">
            <div
              className="relative inline-block"
              style={{ animation: 'float 6s ease-in-out infinite' }}
            >
              <h1 className="title-base title-colors">
                ESLABONES
              </h1>
              <h1 className="title-base title-stars absolute inset-0 pointer-events-none">
                ESLABONES
              </h1>
            </div>
            <p className="subtitle-shimmer mt-4 sm:mt-6 text-base sm:text-lg md:text-xl font-semibold max-w-2xl mx-auto px-4">
              {t.subtitle}
            </p>
            <div className="mt-6 h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full" />
          </section>

          {/* Members Grid with Enhanced Spacing */}
          <main>
            <div className="grid grid-auto-fit gap-6 sm:gap-8 p-2 sm:p-4">
              {YOUTUBER_GROUP.map((member) => (
                <MemberCard key={member.id} member={member} onClick={handleCardClick} />
              ))}
            </div>
          </main>

          {/* Footer with API Status */}
          <footer className="mt-16 text-center text-sm text-white/40 pb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span>Los contadores se actualizan automáticamente</span>
            </div>
          </footer>
        </div>

        {/* Modals */}
        <SocialModal
          member={selectedMember}
          onClose={handleCloseModal}
          customStreamlabsUrl={streamlabsUrl}
          customStreamlabsHtml={streamlabsHtml}
          youtubeVideoId={youtubeVideoId}
          language={language}
        />
        <CommentsModal
          isOpen={showComments}
          onClose={() => setShowComments(false)}
          language={language}
        />
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          language={language}
          setLanguage={setLanguage}
          streamlabsUrl={streamlabsUrl}
          setStreamlabsUrl={handleStreamlabsUrlChange}
          streamlabsHtml={streamlabsHtml}
          setStreamlabsHtml={handleStreamlabsHtmlChange}
          youtubeVideoId={youtubeVideoId}
          setYoutubeVideoId={handleYoutubeVideoIdChange}
          youtubeChannelUrl={youtubeChannelUrl}
          setYoutubeChannelUrl={handleYoutubeChannelUrlChange}
        />
      </div>
    </>
  );
};

export default App;
