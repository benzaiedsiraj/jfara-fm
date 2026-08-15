import React, { useState } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, MapPin, Video, ChevronLeft
} from 'lucide-react';
import { translations } from '../data/translations';

const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const Footer = ({ isPlaying, setIsPlaying, volume, setVolume, currentShowTitle, activePodcast, lang, onOpenLiveVideo }) => {
  const [isPlayerCollapsed, setIsPlayerCollapsed] = useState(false);
  const t = translations[lang] || translations.ar;

  return (
    <footer className="mt-16 sm:mt-20 font-inter pb-24 relative z-10 max-w-full overflow-x-hidden">

      {/* ── Upper Glassmorphic Footer ── */}
      <div className="border-t border-white/10 bg-[#0c0e14]/90 backdrop-blur-xl">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-10 py-10 sm:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">

          {/* Brand col */}
          <div className="md:col-span-5 space-y-4 font-poppins">
            <div className="flex items-center gap-3">
              <div className="p-0.5 rounded-full bg-white/5 border border-white/15">
                <img src="/logo.png" alt="Jfara FM" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-contain" />
              </div>
              <div className="flex flex-col leading-none">
                <p className="font-tajawal font-black text-base text-white">إذاعة جفارة أف أم</p>
                <p className="text-[11px] text-[#c8a44e] font-poppins mt-0.5">"نستمع لنرى أبعد..."</p>
              </div>
            </div>
            
            <p className="text-xs sm:text-[13px] text-slate-300 font-poppins leading-relaxed">
              {t.footer.aboutText}
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-poppins">
              <MapPin className="w-3.5 h-3.5 text-[#c8a44e] shrink-0" />
              <span>{t.footer.address}</span>
            </div>

            <a
              href="https://www.facebook.com/radiojfara.fm/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.06] border border-white/15 text-xs font-poppins text-slate-300 hover:text-white hover:bg-white/10 transition-all shadow-md"
            >
              <FacebookIcon className="w-3.5 h-3.5 text-[#1877F2]" />
              <span>{t.footer.officialPage}</span>
            </a>
          </div>

          {/* Links col 1 */}
          <div className="md:col-span-3 space-y-3 font-poppins">
            <h4 className="text-sm font-bold text-white border-b border-white/10 pb-2.5 font-tajawal">{t.footer.programsTitle}</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {['صباح جفارة', 'لقاء خاص', 'أهل الخيل', 'عشوية لايت', 'خلّي بصمتك'].map((title) => (
                <li key={title} className="hover:text-white cursor-pointer transition-colors">{title}</li>
              ))}
            </ul>
          </div>

          {/* Links col 2 */}
          <div className="md:col-span-4 space-y-3 font-poppins">
            <h4 className="text-sm font-bold text-white border-b border-white/10 pb-2.5 font-tajawal">{t.footer.newsTitle}</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {['أخبار بنقردان والجنوب', 'النشرة الجوية بالجنوب', 'مطار جربة جرجيس', 'البث المباشر المسموع والمرئي'].map((title) => (
                <li key={title} className="hover:text-white cursor-pointer transition-colors">{title}</li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Copyright Bar ── */}
      <div className="border-t border-white/10 bg-[#0a0b0e]">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 font-poppins text-center sm:text-right">
          <span>© {new Date().getFullYear()} Radio Jfara FM — {t.footer.rights}</span>
          <span className="font-bold text-[#c8a44e] font-audiowide">98.4 FM · BEN GUERDANE</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          FLOATING MEDIA PLAYER BAR WITH LOGO GOLD LIVE VIDEO BUTTON
      ═══════════════════════════════════════ */}
      <div className={`fixed bottom-3 inset-x-2 sm:inset-x-4 max-w-5xl mx-auto z-50 transition-all duration-300 ${isPlayerCollapsed ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <div className="rounded-2xl overflow-hidden bg-[#15171e]/95 border border-white/15 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] flex items-center justify-between p-1 sm:p-0">

          {/* FAR RIGHT: ON AIR Badge with Continuous Sound Equalizer Animation */}
          <div className="bg-[#0082A6] text-white flex flex-col items-center justify-center px-2.5 sm:px-4 py-2.5 sm:py-3 min-w-[65px] sm:min-w-[85px] shrink-0 font-poppins self-stretch rounded-l-lg sm:rounded-none">
            <div className="flex items-end gap-[3px] h-4 mb-1">
              {[0.4, 0.9, 0.6, 1, 0.7, 0.9, 0.5].map((h, i) => (
                <div
                  key={i}
                  className={`w-[2.5px] rounded-full transition-all ${isPlaying ? 'bg-white animate-pulse' : 'bg-white/40'}`}
                  style={{
                    height: isPlaying ? `${(i % 2 === 0 ? 12 : 16)}px` : '4px',
                    animationDuration: `${0.4 + (i % 3) * 0.2}s`,
                    animationIterationCount: 'infinite'
                  }}
                />
              ))}
            </div>
            <span className="text-[9px] sm:text-[10px] font-black tracking-wider uppercase text-center">
              {activePodcast ? 'PODCAST' : 'ON AIR'}
            </span>
          </div>

          {/* CENTER RIGHT: Station / Podcast Branding Info */}
          <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-1 sm:py-2 font-tajawal min-w-0 flex-1">
            <img 
              src={activePodcast ? activePodcast.cover : '/logo.png'} 
              alt="Jfara FM" 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover bg-white/5 p-0.5 border border-white/10 shrink-0" 
            />
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-xs sm:text-[14px] font-bold text-white truncate">
                {activePodcast ? activePodcast.title : (currentShowTitle || 'إذاعة جفارة')}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#38bdf8] font-poppins truncate flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping" />
                <span>{activePodcast ? activePodcast.showName : 'يُبث الآن مباشرة — FM 98.4'}</span>
              </span>
            </div>
          </div>

          {/* CENTER: Audio Play / Pause Button */}
          <div className="flex items-center justify-center px-1 sm:px-3 shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0a0b0e] border border-white/20 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
            >
              {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current mr-[-2px]" />}
            </button>
          </div>

          {/* PROMINENT LIVE VIDEO PLAYER BUTTON (LOGO GOLD MATCHED) */}
          <div className="flex items-center gap-2 px-1 sm:px-3 shrink-0 font-tajawal">
            <button
              onClick={onOpenLiveVideo}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-[#c8a44e] hover:bg-[#b38f38] text-black text-[10px] sm:text-xs font-black shadow-lg hover:scale-105 active:scale-95 transition-all glow-gold border border-white/30"
              title="مشاهدة البث المرئي الحي للاستوديو"
            >
              <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black animate-pulse" />
              <span className="hidden sm:inline">البث المرئي (فيديو)</span>
              <span className="sm:hidden">فيديو</span>
            </button>
          </div>

          {/* Volume Control */}
          <div className="hidden md:flex items-center gap-2 px-2 shrink-0">
            <button
              onClick={() => setVolume(volume === 0 ? 0.8 : 0)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {volume === 0 ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0" max="1" step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-14 sm:w-16 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#0082A6]"
            />
          </div>

          {/* FAR LEFT: Collapse Toggle */}
          <button 
            onClick={() => setIsPlayerCollapsed(true)}
            className="bg-[#0082A6] text-white p-2.5 sm:p-3 self-stretch flex items-center justify-center hover:bg-[#006e8c] transition-colors shrink-0 rounded-r-lg sm:rounded-none"
            title={t.footer.hidePlayer}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

        </div>
      </div>

      {isPlayerCollapsed && (
        <button
          onClick={() => setIsPlayerCollapsed(false)}
          className="fixed bottom-4 left-4 z-50 p-3 rounded-full bg-[#0082A6] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 text-xs font-bold font-tajawal glow-brand-blue"
        >
          <Play className="w-4 h-4 fill-current" />
          <span className="hidden xs:inline">{t.footer.showPlayer}</span>
        </button>
      )}

    </footer>
  );
};

export default Footer;
