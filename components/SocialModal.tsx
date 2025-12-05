import React, { useEffect, useState } from 'react';
import type { Youtuber } from '../types';
import { YoutubeIcon } from './icons/YoutubeIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { TwitchIcon } from './icons/TwitchIcon';
import { XIcon } from './icons/XIcon';
import { TiktokIcon } from './icons/TiktokIcon';
import { KickIcon } from './icons/KickIcon';
import YouTubeLiveChat from './YouTubeLiveChat';
import type { Language } from '../App';

interface SocialModalProps {
  member: Youtuber | null;
  onClose: () => void;
  customStreamlabsUrl?: string;
  customStreamlabsHtml?: string;
  youtubeVideoId?: string;
  language?: Language;
}

const SocialLink: React.FC<{ href?: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => {
  if (!href) return null;
  try {
    const url = new URL(href);
    if (url.pathname === '/') {
      return null;
    }
  } catch (e) {
    console.error(`Invalid URL for social link: ${href}`);
    return null;
  }

  const baseClasses = "flex items-center justify-between space-x-3 rounded-xl bg-white/[0.03] p-4 text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 group border border-white/5 hover:border-white/15 backdrop-blur-sm";

  let hoverClasses = 'hover:bg-white/10 hover:scale-[1.02]';
  const socialName = label.toLowerCase().split(' ')[0];

  switch (socialName) {
    case 'youtube':
      hoverClasses = 'hover:bg-[#FF0000]/20 hover:border-[#FF0000]/30 hover:shadow-lg hover:shadow-[#FF0000]/10 hover:scale-[1.02]';
      break;
    case 'twitch':
      hoverClasses = 'hover:bg-[#9146FF]/20 hover:border-[#9146FF]/30 hover:shadow-lg hover:shadow-[#9146FF]/10 hover:scale-[1.02]';
      break;
    case 'kick':
      hoverClasses = 'hover:bg-[#53FC18]/10 hover:border-[#53FC18]/30 hover:shadow-lg hover:shadow-[#53FC18]/10 hover:scale-[1.02]';
      break;
    case 'tiktok':
      hoverClasses = 'hover:bg-white/15 hover:border-white/25 hover:shadow-lg hover:shadow-white/10 hover:scale-[1.02]';
      break;
    case 'twitter':
      hoverClasses = 'hover:bg-white/15 hover:border-white/25 hover:shadow-lg hover:shadow-white/10 hover:scale-[1.02]';
      break;
    case 'instagram':
      hoverClasses = 'hover:bg-gradient-to-r hover:from-[#833ab4]/20 hover:via-[#fd1d1d]/20 hover:to-[#fcb045]/20 hover:border-transparent hover:shadow-lg hover:scale-[1.02]';
      break;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${hoverClasses}`}
    >
      <div className="flex items-center space-x-4">
        <div className="transform transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <span className="font-semibold text-lg">{label}</span>
      </div>
    </a>
  );
};

const SocialModal: React.FC<SocialModalProps> = ({
  member,
  onClose,
  customStreamlabsUrl,
  customStreamlabsHtml,
  youtubeVideoId = '',
  language = 'es'
}) => {
  const [showChat, setShowChat] = useState(false);
  const [activeChatPlatform, setActiveChatPlatform] = useState<'twitch' | 'kick' | 'youtube' | 'streamlabs' | null>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Reset chat state when member changes
  useEffect(() => {
    setShowChat(false);
    setActiveChatPlatform(null);
  }, [member]);

  if (!member) return null;

  // Extract usernames/IDs with validation
  const getTwitchUsername = (url?: string) => {
    if (!url || url.endsWith('twitch.tv/') || url === 'https://www.twitch.tv/') return '';
    return url.split('twitch.tv/')[1]?.split('/')[0] || '';
  };

  const getKickUsername = (url?: string) => {
    if (!url || url.endsWith('kick.com/') || url === 'https://kick.com/') return '';
    return url.split('kick.com/')[1]?.split('/')[0] || '';
  };

  const getYoutubeHandle = (url?: string) => {
    if (!url || !url.includes('@')) return '';
    return url.split('@')[1]?.split('/')[0] || '';
  };

  const twitchUsername = getTwitchUsername(member.socials.twitch);
  const kickUsername = getKickUsername(member.socials.kick);
  const youtubeHandle = getYoutubeHandle(member.socials.youtube);

  // Auto-detect available chats from social links
  const hasTwitch = !!twitchUsername && twitchUsername !== '';
  const hasKick = !!kickUsername && kickUsername !== '';
  // YouTube chat shows if they have a YouTube channel link
  const hasYoutube = !!youtubeHandle && youtubeHandle !== '';

  const hasChat = hasTwitch || hasKick || hasYoutube;

  const toggleChat = () => {
    if (!showChat) {
      // Default priority: Kick -> Twitch -> YouTube
      if (hasKick) setActiveChatPlatform('kick');
      else if (hasTwitch) setActiveChatPlatform('twitch');
      else if (hasYoutube) setActiveChatPlatform('youtube');
    }
    setShowChat(!showChat);
  };

  const renderChat = () => {
    if (!activeChatPlatform) return null;

    if (activeChatPlatform === 'kick' && hasKick) {
      const kickPopoutUrl = `https://kick.com/popout/${kickUsername}/chat`;

      return (
        <div className="h-full w-full relative flex flex-col">
          {/* Intentar cargar el iframe */}
          <iframe
            src={kickPopoutUrl}
            height="100%"
            width="100%"
            className="h-full w-full border-none"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />

          {/* Mensaje de ayuda superpuesto con botón de popup */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-900/80 to-black/80 backdrop-blur-sm pointer-events-none">
            <div className="text-center max-w-md p-6 pointer-events-auto">
              <div className="mb-4">
                <svg className="w-20 h-20 mx-auto text-green-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.86-.96-7-5.17-7-9V8.3l7-3.11 7 3.11V11c0 3.83-3.14 8.04-7 9z" />
                  <path d="M10.5 13.5l-2-2L7 13l3.5 3.5L17 10l-1.5-1.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {language === 'es' ? 'Chat de Kick' : 'Kick Chat'}
              </h3>
              <p className="text-white/70 text-sm mb-6 leading-relaxed">
                {language === 'es'
                  ? 'El chat de Kick no se puede mostrar aquí por restricciones de seguridad. Ábrelo en una ventana separada para participar.'
                  : 'Kick chat cannot be displayed here due to security restrictions. Open it in a separate window to participate.'}
              </p>
              <button
                onClick={() => window.open(kickPopoutUrl, 'kick-chat', 'width=400,height=600,menubar=no,toolbar=no,location=no,status=no')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold transition-all duration-200 hover:scale-105 shadow-lg shadow-green-500/20 flex items-center gap-2 mx-auto"
              >
                <span>🪟</span>
                <span>{language === 'es' ? 'Abrir Chat en Popup' : 'Open Chat in Popup'}</span>
              </button>
              <p className="text-xs text-white/40 mt-4">
                {language === 'es'
                  ? '💡 El chat se abrirá en una ventana nueva'
                  : '💡 Chat will open in a new window'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (activeChatPlatform === 'twitch' && hasTwitch) {
      const domain = window.location.hostname;
      return (
        <iframe
          src={`https://www.twitch.tv/embed/${twitchUsername}/chat?parent=${domain}`}
          height="100%"
          width="100%"
          className="h-full w-full border-none"
        />
      );
    }

    if (activeChatPlatform === 'youtube' && hasYoutube) {
      return <YouTubeLiveChat videoId={youtubeVideoId || ''} language={language} youtubeHandle={youtubeHandle} />;
    }

    return (
      <div className="flex h-full w-full items-center justify-center bg-black/50 p-4 text-center">
        <p className="text-white/50">Chat no disponible</p>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md transition-opacity duration-300 ease-in-out px-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`relative flex transform-gpu rounded-3xl bg-gradient-to-b from-[#0f1b26]/95 to-[#0b1820]/95 text-white shadow-2xl border border-white/10 transition-all duration-500 ease-out ${showChat ? 'max-w-6xl w-full h-[700px]' : 'max-w-lg w-full h-auto'
          } overflow-hidden backdrop-blur-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white/70 backdrop-blur-md transition-all duration-200 hover:bg-red-500 hover:text-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-lg"
            aria-label="Close modal"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Left Side: Profile */}
        <div className={`flex-shrink-0 transition-all duration-500 ${showChat ? 'w-1/4 border-r border-white/10' : 'w-full'}`}>
          {/* Header with Image */}
          <div className="relative h-80 w-full overflow-hidden">
            {member.image ? (
              <>
                <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1b26] via-[#0f1b26]/60 to-transparent" />
              </>
            ) : (
              <div className="h-full w-full bg-gradient-to-b from-[#0b2b3a] to-[#064055] flex items-center justify-center">
                <span className="text-8xl font-bold text-white/20">{member.name.charAt(0)}</span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 w-full p-8">
              <h2 className="text-5xl font-black text-white drop-shadow-2xl tracking-tight">
                {member.name}
              </h2>
              <p className="mt-2 text-sm text-white/60 font-medium">Conecta en redes sociales</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="p-8 pt-6 space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
            {hasChat && (
              <button
                onClick={toggleChat}
                className={`w-full mb-4 flex items-center justify-center space-x-2 rounded-xl py-3 font-bold transition-all duration-300 ${showChat
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                  : 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                  }`}
              >
                <span>{showChat ? 'Ocultar Chat' : 'Ver Chat en Vivo'}</span>
              </button>
            )}

            <SocialLink
              href={member.socials.youtube}
              icon={<YoutubeIcon />}
              label="YouTube"
            />
            <SocialLink
              href={member.socials.twitch}
              icon={<TwitchIcon />}
              label="Twitch"
            />
            <SocialLink
              href={member.socials.kick}
              icon={<KickIcon />}
              label="Kick"
            />
            <SocialLink
              href={member.socials.tiktok}
              icon={<TiktokIcon />}
              label="TikTok"
            />
            <SocialLink
              href={member.socials.twitter}
              icon={<TwitterIcon />}
              label="Twitter / X"
            />
            <SocialLink
              href={member.socials.instagram}
              icon={<InstagramIcon />}
              label="Instagram"
            />
          </div>
        </div>

        {/* Right Side: Chat */}
        <div
          className={`flex-grow flex flex-col bg-[#0b1820] transition-all duration-500 ${showChat ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute right-0 w-0'
            }`}
        >
          {showChat && (
            <>
              {/* Chat Tabs */}
              <div className="flex border-b border-white/10 bg-black/20">
                {hasKick && (
                  <button
                    onClick={() => setActiveChatPlatform('kick')}
                    className={`flex-1 py-3 text-sm font-bold transition-colors ${activeChatPlatform === 'kick' ? 'bg-green-600/20 text-green-400 border-b-2 border-green-500' : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    Kick
                  </button>
                )}
                {hasTwitch && (
                  <button
                    onClick={() => setActiveChatPlatform('twitch')}
                    className={`flex-1 py-3 text-sm font-bold transition-colors ${activeChatPlatform === 'twitch' ? 'bg-purple-600/20 text-purple-400 border-b-2 border-purple-500' : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    Twitch
                  </button>
                )}
                {hasYoutube && (
                  <button
                    onClick={() => setActiveChatPlatform('youtube')}
                    className={`flex-1 py-3 text-sm font-bold transition-colors ${activeChatPlatform === 'youtube' ? 'bg-red-600/20 text-red-400 border-b-2 border-red-500' : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    YouTube
                  </button>
                )}
              </div>

              {/* Chat Content */}
              <div className="flex-grow relative">
                {renderChat()}
              </div>
            </>
          )}
        </div>
      </div>
      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-in {
          animation: modal-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animation-delay-150 {
          animation-delay: 150ms;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default SocialModal;