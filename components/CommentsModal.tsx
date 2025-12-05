import React, { useEffect, useState } from 'react';
import type { Language } from '../App';
import { translations } from '../i18n';
import GiscusComments from './GiscusComments';
import EnhancedCommentsSection from './EnhancedCommentsSection';
import { XIcon } from './icons/XIcon';

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ isOpen, onClose, language }) => {
  const [activeTab, setActiveTab] = useState<'enhanced' | 'giscus'>('enhanced');

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

  const t = translations[language];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out px-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative m-4 w-full max-w-4xl transform-gpu rounded-2xl bg-gradient-to-b from-[#0f1b26]/95 to-[#0b1820]/95 text-white shadow-2xl border border-white/10 transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale flex flex-col backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animationFillMode: 'forwards', maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{t.commentsTitle}</h2>
            <p className="text-sm text-white/50 mt-1">
              {language === 'es' ? 'Únete a la conversación' : 'Join the conversation'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white/70 backdrop-blur-md transition-all duration-200 hover:bg-red-500 hover:text-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Close modal"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-6 pt-4 border-b border-white/10 flex-shrink-0">
          <button
            onClick={() => setActiveTab('enhanced')}
            className={`px-6 py-3 font-semibold rounded-t-xl transition-all duration-300 ${activeTab === 'enhanced'
                ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b-2 border-purple-500 text-white'
                : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
          >
            {language === 'es' ? '💬 Comentarios Rápidos' : '💬 Quick Comments'}
          </button>
          <button
            onClick={() => setActiveTab('giscus')}
            className={`px-6 py-3 font-semibold rounded-t-xl transition-all duration-300 ${activeTab === 'giscus'
                ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b-2 border-purple-500 text-white'
                : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
          >
            {language === 'es' ? '🔗 Discusiones GitHub' : '🔗 GitHub Discussions'}
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'enhanced' ? (
            <EnhancedCommentsSection language={language} />
          ) : (
            <GiscusComments language={language} />
          )}
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

export default CommentsModal;

