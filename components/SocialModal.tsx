import React, { useEffect } from 'react';
import type { Youtuber } from '../types';
import { YoutubeIcon } from './icons/YoutubeIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { TwitchIcon } from './icons/TwitchIcon';
import { XIcon } from './icons/XIcon';
import { TiktokIcon } from './icons/TiktokIcon';
import { KickIcon } from './icons/KickIcon';

interface SocialModalProps {
  member: Youtuber | null;
  onClose: () => void;
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

  const baseClasses = "flex items-center space-x-3 rounded-lg bg-white/5 p-3 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 group";
  
  let hoverClasses = 'hover:bg-white/10';
  const socialName = label.toLowerCase().split(' ')[0];

  switch(socialName) {
    case 'youtube':
      hoverClasses = 'hover:bg-[#FF0000]';
      break;
    case 'twitch':
      hoverClasses = 'hover:bg-[#9146FF]';
      break;
    case 'kick':
      hoverClasses = 'hover:bg-[#53FC18] hover:text-black';
      break;
    case 'tiktok':
      hoverClasses = 'hover:bg-white hover:text-black';
      break;
    case 'twitter':
      hoverClasses = 'hover:bg-white hover:text-black';
      break;
    case 'instagram':
      hoverClasses = 'hover:bg-[#E1306C]';
      break;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${hoverClasses}`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </a>
  );
};

const SocialModal: React.FC<SocialModalProps> = ({ member, onClose }) => {
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

  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative m-4 w-full max-w-md transform-gpu rounded-2xl bg-[var(--bg-2)] text-white shadow-2xl border border-white/10 transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
        style={{ animationFillMode: 'forwards' }}
      >
        <div className="absolute -top-3 -right-3">
            <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900/80 text-gray-400 transition-all duration-200 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Close modal"
            >
                <XIcon className="h-6 w-6" />
            </button>
        </div>

        <div className="overflow-hidden rounded-t-2xl">
          {member.image ? (
            <img src={member.image} alt={member.name} className="h-60 w-full object-cover" />
          ) : (
             <div className="h-60 w-full bg-gradient-to-b from-[#0b2b3a] to-[#064055] flex items-center justify-center">
                <span className="text-6xl font-bold text-white/50">{member.name.charAt(0)}</span>
             </div>
          )}
        </div>
        
        <div className="p-6">
          <h2 className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            {member.name}
          </h2>
          <div className="mt-6 space-y-3">
            <SocialLink href={member.socials.youtube} icon={<YoutubeIcon />} label="YouTube" />
            <SocialLink href={member.socials.twitch} icon={<TwitchIcon />} label="Twitch" />
            <SocialLink href={member.socials.kick} icon={<KickIcon />} label="Kick" />
            <SocialLink href={member.socials.tiktok} icon={<TiktokIcon />} label="TikTok" />
            <SocialLink href={member.socials.twitter} icon={<TwitterIcon />} label="Twitter / X" />
            <SocialLink href={member.socials.instagram} icon={<InstagramIcon />} label="Instagram" />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default SocialModal;