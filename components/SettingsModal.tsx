import React, { useEffect } from 'react';
import type { Language } from '../App';
import { XIcon } from './icons/XIcon';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  setLanguage: (language: Language) => void;
  streamlabsUrl: string;
  setStreamlabsUrl: (url: string) => void;
  streamlabsHtml: string;
  setStreamlabsHtml: (html: string) => void;
  youtubeVideoId: string;
  setYoutubeVideoId: (id: string) => void;
  youtubeChannelUrl: string;
  setYoutubeChannelUrl: (url: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  language,
  setLanguage,
  youtubeVideoId,
  setYoutubeVideoId,
  youtubeChannelUrl,
  setYoutubeChannelUrl,
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out px-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative m-4 w-full max-w-md transform-gpu rounded-2xl bg-gradient-to-b from-[#0f1b26]/95 to-[#0b1820]/95 text-white shadow-2xl border border-white/10 transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale flex flex-col backdrop-blur-xl max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
        style={{ animationFillMode: 'forwards' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-[#0f1b26]/95 backdrop-blur-xl z-10">
          <h2 className="text-2xl font-bold">
            {language === 'es' ? 'Configuraciones' : 'Settings'}
          </h2>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white/70 backdrop-blur-md transition-all duration-200 hover:bg-red-500 hover:text-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Close modal"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white/80">
              {language === 'es' ? 'Idioma / Language' : 'Language / Idioma'}
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() => setLanguage('es')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 border ${language === 'es'
                  ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
              >
                Español
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 border ${language === 'en'
                  ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
              >
                English
              </button>
            </div>
          </div>

          {/* YouTube Configuration */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white/80 flex items-center gap-2">
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                {language === 'es' ? 'YouTube' : 'YouTube'}
              </h3>
            </div>

            {/* YouTube Channel URL */}
            <div>
              <label className="block text-sm text-white/60 mb-2">
                {language === 'es'
                  ? '🔗 URL del Canal de YouTube'
                  : '🔗 YouTube Channel URL'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={youtubeChannelUrl}
                  onChange={(e) => setYoutubeChannelUrl(e.target.value)}
                  placeholder={language === 'es'
                    ? 'https://www.youtube.com/@tucanal'
                    : 'https://www.youtube.com/@yourchannel'}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
                {youtubeChannelUrl && (
                  <a
                    href={youtubeChannelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-lg shadow-red-500/20 flex items-center gap-2"
                    title={language === 'es' ? 'Abrir Canal' : 'Open Channel'}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* YouTube Live Video ID */}
            <div>
              <label className="block text-sm text-white/60 mb-2">
                {language === 'es'
                  ? '📹 ID del Video en Vivo (para chat)'
                  : '📹 Live Video ID (for chat)'}
              </label>
              <input
                type="text"
                value={youtubeVideoId}
                onChange={(e) => setYoutubeVideoId(e.target.value)}
                placeholder={language === 'es'
                  ? 'Ej: dQw4w9WgXcQ'
                  : 'Ex: dQw4w9WgXcQ'}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Help Section */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20">
              <p className="text-xs text-red-300/90 font-semibold mb-2">
                {language === 'es' ? '💡 Cómo configurar:' : '💡 How to configure:'}
              </p>
              <ol className="text-xs text-white/70 space-y-1.5 ml-4 list-decimal">
                <li>
                  {language === 'es'
                    ? 'Pega la URL de tu canal de YouTube arriba'
                    : 'Paste your YouTube channel URL above'}
                </li>
                <li>
                  {language === 'es'
                    ? 'Cuando hagas una transmisión en vivo, copia el ID del video'
                    : 'When you go live, copy the video ID'}
                </li>
                <li>
                  {language === 'es'
                    ? 'El ID está en la URL: youtube.com/watch?v=VIDEO_ID'
                    : 'The ID is in the URL: youtube.com/watch?v=VIDEO_ID'}
                </li>
                <li>
                  {language === 'es'
                    ? 'Pega solo el ID en el campo de arriba para ver el chat'
                    : 'Paste only the ID in the field above to view chat'}
                </li>
              </ol>
            </div>
          </div>

          {/* Placeholder for other settings */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-white/50 text-center">
              {language === 'es'
                ? 'Más configuraciones próximamente...'
                : 'More settings coming soon...'}
            </p>
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

export default SettingsModal;
