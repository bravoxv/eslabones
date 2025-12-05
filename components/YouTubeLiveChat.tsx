import React from 'react';
import type { Language } from '../App';

interface YouTubeLiveChatProps {
    videoId?: string;
    language: Language;
    youtubeHandle?: string;
}

const YouTubeLiveChat: React.FC<YouTubeLiveChatProps> = ({ videoId, language, youtubeHandle }) => {
    // Si hay videoId configurado, intentar mostrar el chat embebido
    if (videoId && videoId.trim() !== '') {
        const chatUrl = `https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${window.location.hostname}`;
        const popupChatUrl = `https://www.youtube.com/live_chat?v=${videoId}&is_popout=1`;

        return (
            <div className="w-full h-full relative bg-black flex flex-col">
                <iframe
                    src={chatUrl}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    title={language === 'es' ? 'Chat en vivo de YouTube' : 'YouTube Live Chat'}
                    style={{ minHeight: '400px' }}
                />

                {/* Indicador de estado */}
                <div className="absolute top-2 right-2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs text-white/80 font-medium">
                        {language === 'es' ? 'EN VIVO' : 'LIVE'}
                    </span>
                </div>

                {/* Botón para abrir en popup */}
                <div className="absolute bottom-2 right-2">
                    <button
                        onClick={() => window.open(popupChatUrl, 'youtube-chat', 'width=400,height=600,menubar=no,toolbar=no,location=no,status=no')}
                        className="px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold transition-all duration-200 backdrop-blur-sm border border-white/10 hover:scale-105"
                        title={language === 'es' ? 'Abrir chat en ventana nueva' : 'Open chat in new window'}
                    >
                        {language === 'es' ? '🪟 Abrir en Popup' : '🪟 Open in Popup'}
                    </button>
                </div>
            </div>
        );
    }

    // Si no hay videoId pero hay youtubeHandle, mostrar mensaje con link al canal
    const channelUrl = youtubeHandle ? `https://www.youtube.com/@${youtubeHandle}/live` : '';

    return (
        <div className="w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-red-900/20 to-black">
            <div className="text-center max-w-md">
                <div className="mb-6">
                    <svg className="w-24 h-24 mx-auto text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                    {language === 'es'
                        ? 'Chat de YouTube en Vivo'
                        : 'YouTube Live Chat'}
                </h3>
                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                    {language === 'es'
                        ? 'El chat de YouTube está disponible durante las transmisiones en vivo. Visita el canal para participar en el chat.'
                        : 'YouTube chat is available during live streams. Visit the channel to participate in the chat.'}
                </p>
                {channelUrl && (
                    <a
                        href={channelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-200 hover:scale-105 shadow-lg shadow-red-500/20"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        <span>
                            {language === 'es'
                                ? 'Ir al Canal en Vivo'
                                : 'Go to Live Channel'}
                        </span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                )}
                <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-xs text-white/50">
                        {language === 'es'
                            ? '💡 El chat solo está disponible cuando el canal está transmitiendo en vivo'
                            : '💡 Chat is only available when the channel is streaming live'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default YouTubeLiveChat;
