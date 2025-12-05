import React from 'react';
import type { Youtuber } from '../types';

interface MemberCardProps {
  member: Youtuber;
  onClick: (member: Youtuber) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onClick }) => {

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  const renderMedia = () => {
    if (member.image) {
      return (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url('${member.image}')` }}
          aria-label={member.name}
        />
      );
    }
    if (member.name === 'Leodann') {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#0b2b3a] to-[#064055] transition-transform duration-700 group-hover:scale-110">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-b from-[#083b5a] to-[#045a80] text-5xl font-bold text-white/95 shadow-2xl">
            {getInitial(member.name)}
          </div>
        </div>
      );
    }
    return (
      <div
        className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 transition-transform duration-700 group-hover:scale-110"
        aria-label="Placeholder image"
      />
    );
  };

  return (
    <article
      onClick={() => onClick(member)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(member)}
      className="group relative flex h-[450px] cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-white/[0.01] shadow-2xl shadow-black/40 backdrop-blur-md transition-all duration-500 hover:-translate-y-3 hover:border-white/20 hover:shadow-purple-500/30 hover:shadow-3xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-[#020617]"
      tabIndex={0}
      role="button"
      aria-label={`View details for ${member.name}`}
    >
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        {renderMedia()}
      </div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

      {/* Glassmorphism Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content Container */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center p-8 text-center">
        {/* Name with better typography */}
        <h2 className="mb-3 text-3xl md:text-4xl font-black text-white drop-shadow-2xl tracking-tight transform transition-transform duration-300 group-hover:scale-105">
          {member.name}
        </h2>

        {/* Call to Action Button */}
        <div className="mt-4 rounded-full bg-white/5 px-6 py-2.5 text-sm font-semibold text-white/90 backdrop-blur-xl border border-white/10 transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/25 group-hover:scale-105 shadow-lg">
          Ver Perfil
        </div>

        {/* Shine Effect on Hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animation-delay-150 {
          animation-delay: 150ms;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </article>
  );
};

export default MemberCard;