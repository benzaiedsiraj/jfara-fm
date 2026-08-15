import React from 'react';
import { Play, Pause, Bookmark, Clock, Mic } from 'lucide-react';
import { translations } from '../data/translations';

const PodcastCard = ({ podcast, isCurrent, isPlaying, onPlay, isSaved, onToggleSave, lang = 'ar' }) => {
  const t = translations[lang] || translations.ar;

  return (
    <div className={`group relative bg-[#0d0f15] rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
      isCurrent 
        ? 'border-[#0082A6] shadow-[0_0_25px_rgba(0,130,166,0.3)] ring-1 ring-[#0082A6]' 
        : 'border-white/10 hover:border-white/25 hover:bg-[#12151f]'
    }`}>
      
      {/* Top Cover Image & Overlay */}
      <div className="relative w-full h-52 overflow-hidden bg-black/40">
        <img 
          src={podcast.cover} 
          alt={podcast.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f15] via-[#0d0f15]/40 to-transparent" />

        {/* Top Badges: Episode Number & Category */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 font-tajawal">
          <span className="px-2.5 py-1 rounded-md bg-[#0082A6] text-white font-bold text-[11px] shadow-lg">
            {t.podcasts.episode} {podcast.episodeNumber.replace('الحلقة ', '')}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-amber-400 font-bold text-[10px]">
            {podcast.category}
          </span>
        </div>

        {/* Center Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button
            onClick={() => onPlay(podcast)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
              isCurrent && isPlaying
                ? 'bg-[#0082A6] text-white scale-110 shadow-[#0082A6]/50'
                : 'bg-black/60 hover:bg-[#0082A6] text-white backdrop-blur-md border border-white/20 group-hover:scale-110'
            }`}
          >
            {isCurrent && isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current mr-[-2px]" />
            )}
          </button>
        </div>

        {/* Bottom Audio Waveform Accent & Duration Badge */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between z-10 font-roboto">
          <div className="flex items-end gap-[3px] h-4 bg-black/50 px-2 py-1 rounded-md backdrop-blur-md border border-white/10">
            {[0.4, 0.8, 0.3, 0.9, 0.5, 0.7, 0.2].map((height, i) => (
              <div 
                key={i} 
                className={`w-[2.5px] rounded-full transition-all ${
                  isCurrent && isPlaying ? 'bg-[#0082A6] animate-pulse' : 'bg-white/60'
                }`}
                style={{ height: `${(isCurrent && isPlaying ? Math.random() * 0.7 + 0.3 : height) * 12}px` }}
              />
            ))}
          </div>

          <span className="flex items-center gap-1 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[11px] text-slate-300 border border-white/10">
            <Clock className="w-3 h-3 text-[#c8a44e]" />
            <span>{podcast.duration}</span>
          </span>
        </div>
      </div>

      {/* Content Info Box */}
      <div className="p-5 flex flex-col gap-3 flex-1 justify-between text-right">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[#0082A6] font-bold font-tajawal">
            <span className="flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5" />
              <span>{podcast.showName}</span>
            </span>
            <span className="text-[11px] text-slate-400 font-roboto">{podcast.plays}</span>
          </div>

          <h3 className="font-tajawal font-bold text-base text-white group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
            {podcast.title}
          </h3>

          <p className="text-xs text-slate-400 font-poppins line-clamp-2 leading-relaxed">
            {podcast.description}
          </p>
        </div>

        {/* Footer: Host Avatar & Save / Bookmark Action Button */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <img 
              src={podcast.hostImg} 
              alt={podcast.host} 
              className="w-7 h-7 rounded-full object-cover border border-white/20" 
            />
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-bold text-slate-200 font-tajawal">{podcast.host}</span>
              <span className="text-[9px] text-slate-400 font-roboto mt-0.5">{podcast.date}</span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(podcast.id);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-tajawal transition-all ${
              isSaved
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 font-bold'
                : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
            }`}
            title={isSaved ? t.podcasts.saved : t.podcasts.save}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-amber-400' : ''}`} />
            <span>{isSaved ? t.podcasts.saved : t.podcasts.save}</span>
          </button>
        </div>

      </div>

    </div>
  );
};

export default PodcastCard;
