import React from 'react';
import type { Language } from '../App';
import { translations } from '../i18n';
import { DiscordIcon } from './icons/DiscordIcon';

interface NavbarProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ language, setLanguage }) => {
  const t = translations[language];

  const langButtonClasses = (lang: Language) => 
    `font-semibold transition-colors duration-200 ${
      language === lang ? 'text-white' : 'text-gray-500 hover:text-white'
    }`;

  return (
    <header className="flex items-center justify-between py-4 px-2 mb-4">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 text-lg font-bold text-white shadow-lg ring-1 ring-white/10" style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.25), 0 5px 15px rgba(0,0,0,0.4)', textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
          ES
        </div>
        <div>
          <div className="text-lg font-bold text-white">Eslabones</div>
          <div className="text-xs text-[var(--muted)] mt-0.5">Conectando con la comunidad</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-4">
            <a href="https://discord.com/invite/NDJxRGQAaF" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-white transition-colors" aria-label="Discord">
                <DiscordIcon className="h-6 w-6" />
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