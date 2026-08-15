import React, { useState } from 'react';
import { X, Volume2, VolumeX, Maximize, Radio, Eye, Video, Sparkles, Heart, MessageSquare } from 'lucide-react';
import LiveClock from './LiveClock';
import { translations } from '../data/translations';

const LiveVideoModal = ({ isOpen, onClose, currentShowTitle, lang = 'ar' }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [likes, setLikes] = useState(285);
  const [hasLiked, setHasLiked] = useState(false);
  const t = translations[lang] || translations.ar;

  if (!isOpen) return null;

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-tajawal">
      
      {/* Modal Container */}
      <div className="relative bg-[#0d0f15] border border-white/20 rounded-3xl max-w-4xl w-full overflow-hidden shadow-[0_0_50px_rgba(0,130,166,0.5)] flex flex-col my-auto">
        
        {/* Top Video Header Bar */}
        <div className="bg-[#07080a] px-5 py-3 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[#0082A6] text-white text-xs font-bold font-audiowide tracking-wider shadow-lg glow-brand-blue">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              LIVE VIDEO HD
            </span>

            {/* Viewer Count Badge (Logo Gold Matched) */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[#c8a44e]/20 text-[#c8a44e] border border-[#c8a44e]/40 text-xs font-bold">
              <Eye className="w-3.5 h-3.5 animate-pulse" />
              <span className="font-mono">1.4k</span>
              <span className="hidden xs:inline">متابع</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95"
              title={t.news.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Video Stream Viewport */}
        <div className="relative aspect-video w-full bg-black overflow-hidden group flex items-center justify-center">
          
          {/* Live Studio Camera Feed Background */}
          <img
            src="./real_news/studio_banner.png"
            alt="Jfara FM Live Studio Camera Feed"
            className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-700"
          />

          {/* Dark Gradient Overlay & Video HUD */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-black/40" />

          {/* Center Soundwave Visualizer Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6 text-center">
            
            {/* Animated Equalizer Wave Circle */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#0082A6]/20 border border-[#0082A6]/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(0,130,166,0.6)] mb-4">
              <div className="absolute inset-0 rounded-full border border-[#38bdf8] animate-ping opacity-30" />
              <Radio className="w-12 h-12 text-[#38bdf8] animate-pulse" />
              
              {/* Dynamic Soundbars Around Orbit */}
              <div className="absolute inset-x-0 bottom-4 flex items-end justify-center gap-1 h-6">
                {[0.4, 0.9, 0.6, 1, 0.7, 0.9, 0.5].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-[#c8a44e] rounded-full animate-pulse"
                    style={{
                      height: `${h * 20}px`,
                      animationDuration: `${0.4 + i * 0.15}s`
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#38bdf8] text-xs font-bold border border-[#0082A6]/40">
                البث المباشر المسموع والمرئي — استوديو بنقردان
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-md pt-1">
                {currentShowTitle || 'عشوية لايت (البث الرئيسي)'}
              </h3>
            </div>

          </div>

          {/* Bottom Video Controls Overlay */}
          <div className="absolute bottom-4 inset-x-4 flex items-center justify-between z-20 font-poppins">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-[#38bdf8]" />}
              </button>

              {/* Heart Like Button (Logo Gold Matched) */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl backdrop-blur-md border text-xs font-bold transition-all ${
                  hasLiked 
                    ? 'bg-[#c8a44e]/30 border-[#c8a44e] text-amber-400' 
                    : 'bg-black/60 border-white/20 text-white hover:bg-black/80'
                }`}
              >
                <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current text-amber-400' : ''}`} />
                <span>{likes}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-xs text-slate-300 font-mono hidden xs:inline">
                98.4 FM Ben Guerdane
              </span>
            </div>
          </div>

        </div>

        {/* Footer Info inside Modal */}
        <div className="bg-[#07080a] p-4 sm:p-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tajawal">
          <div className="flex items-center gap-3">
            <img src="./logo.png" alt="Jfara FM" className="w-8 h-8 rounded-full object-contain bg-white/10 p-0.5" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-white text-sm">إذاعة جفارة أف أم (البث المباشر)</span>
              <span className="text-slate-400 text-[11px]">يمكنك الاستماع والمشاهدة الحية لاستوديو البث ببنقردان</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0082A6] hover:bg-[#006e8c] text-white font-bold text-xs transition-all shadow-md active:scale-95"
          >
            {t.news.close}
          </button>
        </div>

      </div>

    </div>
  );
};

export default LiveVideoModal;
