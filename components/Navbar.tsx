import React from 'react';
import type { Language } from '../App';
import { translations } from '../i18n';
import { DiscordIcon } from './icons/DiscordIcon';
import { ChatBubbleIcon } from './icons/ChatBubbleIcon';

interface NavbarProps {
  language: Language;
  setLanguage: (language: Language) => void;
  onShowComments: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ language, setLanguage, onShowComments }) => {
  const t = translations[language];

  const langButtonClasses = (lang: Language) =>
    `font-semibold transition-colors duration-200 ${language === lang ? 'text-white' : 'text-gray-500 hover:text-white'
    }`;

  return (
    <header className="flex items-center justify-between py-4 px-2 mb-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onShowComments}
          className="flex items-center gap-2 rounded-full bg-black/20 px-4 py-2 text-sm text-[var(--muted)] transition-colors hover:text-white border border-white/10 hover:border-white/20"
          aria-label={t.navComments}
        >
          <ChatBubbleIcon className="h-5 w-5" />
          <span className="font-medium">{t.navComments}</span>
        </button>
      </div>
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-4">
          <a
            href="https://discord.gg/S68XEw2V"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/30 hover:border-[#5865F2]/50 text-[#5865F2] hover:text-white transition-all duration-200 hover:scale-105 shadow-lg shadow-[#5865F2]/10"
            aria-label="Discord"
          >
            <DiscordIcon className="h-5 w-5" />
            <span className="font-semibold text-sm">Discord</span>
          </a>
        </nav>
        <div className="flex items-center gap-2 text-sm bg-black/20 px-2 py-1 rounded-full border border-white/10">
          <button onClick={() => setLanguage('es')} className={langButtonClasses('es')}>ES</button>
          <span className="text-gray-600">/</span>
          <button onClick={() => setLanguage('en')} className={langButtonClasses('en')}>EN</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;