import React, { useState, useEffect } from 'react';
import type { Language } from '../App';
import { translations } from '../i18n';
import { DiscordIcon } from './icons/DiscordIcon';
import {
    auth,
    googleProvider,
    githubProvider,
    discordProvider
} from '../services/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';

interface CommentsSectionProps {
    language: Language;
}

interface Comment {
    id: string;
    author: string;
    content: string;
    timestamp: Date;
    avatar?: string;
    uid: string;
}

const EnhancedCommentsSection: React.FC<CommentsSectionProps> = ({ language }) => {
    const [user, setUser] = useState<User | null>(null);
    const [showLoginOptions, setShowLoginOptions] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const t = translations[language];

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async (provider: any) => {
        setError(null);
        try {
            await signInWithPopup(auth, provider);
            setShowLoginOptions(false);
        } catch (err: any) {
            console.error("Login failed:", err);
            let errorMessage = "Error al iniciar sesión";
            if (err.code === 'auth/account-exists-with-different-credential') {
                errorMessage = language === 'es'
                    ? "Ya existe una cuenta con este email usando otro método de acceso."
                    : "An account already exists with the same email address but different sign-in credentials.";
            } else if (err.code === 'auth/popup-closed-by-user') {
                return; // Usuario cerró la ventana, no es error crítico
            }
            setError(errorMessage);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const handleSubmitComment = () => {
        if (newComment.trim() === '' || !user) return;

        const comment: Comment = {
            id: Date.now().toString(),
            author: user.displayName || 'Usuario',
            content: newComment,
            timestamp: new Date(),
            avatar: user.photoURL || undefined,
            uid: user.uid
        };

        setComments([comment, ...comments]);
        setNewComment('');
    };

    if (isLoading) {
        return <div className="p-8 text-center text-white/50">Cargando...</div>;
    }

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">
                    {language === 'es' ? 'Comentarios' : 'Comments'}
                </h3>
                <span className="text-sm text-white/50">
                    {comments.length} {language === 'es' ? 'comentarios' : 'comments'}
                </span>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm">
                    {error}
                </div>
            )}

            {/* Login Section */}
            {!user ? (
                <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 backdrop-blur-sm">
                    <div className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h4 className="text-xl font-bold text-white">
                            {language === 'es' ? 'Únete a la conversación' : 'Join the conversation'}
                        </h4>
                        <p className="text-white/60 text-sm max-w-md mx-auto">
                            {language === 'es'
                                ? 'Inicia sesión para dejar tu comentario y participar en la comunidad'
                                : 'Sign in to leave your comment and join the community'}
                        </p>

                        {!showLoginOptions ? (
                            <button
                                onClick={() => setShowLoginOptions(true)}
                                className="mt-4 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30"
                            >
                                {language === 'es' ? 'Iniciar Sesión' : 'Sign In'}
                            </button>
                        ) : (
                            <div className="mt-6 space-y-3 max-w-sm mx-auto">
                                {/* Google Login */}
                                <button
                                    onClick={() => handleLogin(googleProvider)}
                                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-gray-800 font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-200"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    {language === 'es' ? 'Continuar con Google' : 'Continue with Google'}
                                </button>

                                {/* Discord Login */}
                                <button
                                    onClick={() => handleLogin(discordProvider)}
                                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105"
                                >
                                    <DiscordIcon className="w-5 h-5" />
                                    {language === 'es' ? 'Continuar con Discord' : 'Continue with Discord'}
                                </button>

                                {/* GitHub Login */}
                                <button
                                    onClick={() => handleLogin(githubProvider)}
                                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                    {language === 'es' ? 'Continuar con GitHub' : 'Continue with GitHub'}
                                </button>

                                <button
                                    onClick={() => setShowLoginOptions(false)}
                                    className="text-sm text-white/50 hover:text-white/80 transition-colors mt-2"
                                >
                                    {language === 'es' ? 'Cancelar' : 'Cancel'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    {/* Comment Input */}
                    <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 backdrop-blur-sm space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            {user.photoURL ? (
                                <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full" />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold">
                                    {user.displayName?.[0] || 'U'}
                                </div>
                            )}
                            <span className="text-white font-medium">{user.displayName}</span>
                        </div>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder={language === 'es' ? 'Escribe tu comentario...' : 'Write your comment...'}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                            rows={4}
                        />
                        <div className="flex items-center justify-between">
                            <button
                                onClick={handleLogout}
                                className="text-sm text-white/50 hover:text-white/80 transition-colors"
                            >
                                {language === 'es' ? 'Cerrar sesión' : 'Sign out'}
                            </button>
                            <button
                                onClick={handleSubmitComment}
                                disabled={newComment.trim() === ''}
                                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg disabled:shadow-none"
                            >
                                {language === 'es' ? 'Publicar' : 'Post'}
                            </button>
                        </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-4">
                        {comments.length === 0 ? (
                            <div className="text-center py-12 text-white/40">
                                <p>{language === 'es' ? 'No hay comentarios todavía. ¡Sé el primero!' : 'No comments yet. Be the first!'}</p>
                            </div>
                        ) : (
                            comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-5 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        {comment.avatar ? (
                                            <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                                                {comment.author[0].toUpperCase()}
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-semibold text-white">{comment.author}</span>
                                                <span className="text-xs text-white/40">
                                                    {comment.timestamp.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}
                                                </span>
                                            </div>
                                            <p className="text-white/80">{comment.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default EnhancedCommentsSection;
