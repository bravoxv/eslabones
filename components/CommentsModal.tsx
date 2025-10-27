import React, { useEffect } from 'react';
import type { Language } from '../App';
import { translations } from '../i18n';
import GiscusComments from './GiscusComments';
import { XIcon } from './icons/XIcon';

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ isOpen, onClose, language }) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative m-4 w-full max-w-3xl transform-gpu rounded-2xl bg-[var(--bg-2)] text-white shadow-2xl border border-white/10 transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animationFillMode: 'forwards', maxHeight: '90vh' }}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
            <h2 className="text-xl font-bold">{t.commentsTitle}</h2>
            <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900/80 text-gray-400 transition-all duration-200 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Close modal"
            >
                <XIcon className="h-5 w-5" />
            </button>
        </div>
        
        <div className="p-4 sm:p-6 overflow-y-auto">
            <GiscusComments language={language} />
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
