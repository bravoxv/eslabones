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
          className="flex-1 bg-cover bg-center"
          style={{ backgroundImage: `url('${member.image}')` }}
          aria-label={member.name}
        />
      );
    }
    if (member.name === 'Leodann') {
      return (
        <div className="flex flex-1 items-center justify-center p-5 bg-gradient-to-b from-[#0b2b3a] to-[#064055]">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-b from-[#083b5a] to-[#045a80] text-3xl font-bold text-white/95">
            {getInitial(member.name)}
          </div>
        </div>
      );
    }
    return (
      <div 
        className="flex-1 bg-gradient-to-b from-gray-800 to-gray-900" 
        aria-label="Placeholder image"
      />
    );
  };

  return (
    <article
      onClick={() => onClick(member)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(member)}
      className="group relative flex min-h-[320px] cursor-pointer flex-col overflow-hidden rounded-xl border border-white/5 bg-gradient-to-b from-white/5 to-white/0 shadow-2xl shadow-black/60 backdrop-blur-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/80 focus:outline-none focus:ring-2 focus:ring-purple-500"
      tabIndex={0}
      role="button"
      aria-label={`View details for ${member.name}`}
    >
      {renderMedia()}
      
      <div className="absolute inset-x-3 bottom-4">
         <div className="rounded-lg bg-black/50 px-4 py-2.5 text-lg font-extrabold text-white shadow-lg backdrop-blur-sm text-center">
            {member.name}
          </div>
      </div>
    </article>
  );
};

export default MemberCard;