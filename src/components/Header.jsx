import React, { useState } from 'react';
import { 
  Radio, Newspaper, Mic, Calendar, Bookmark, Sun,
  Play, Pause, Menu, X 
} from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { translations } from '../data/translations';

const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const Header = ({ isPlaying, setIsPlaying, currentView, onNavigate, savedCount, lang, onChangeLang }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = translations[lang] || translations.ar;

  const nav = [
    { id: 'home', text: t.nav.home, icon: Radio },
    { id: 'news', text: t.nav.news, icon: Newspaper },
    { id: 'podcasts', text: t.nav.podcasts, icon: Mic },
    { id: 'schedule', text: t.nav.schedule, icon: Calendar },
    { id: 'weather', text: t.nav.weather, icon: Sun },
    { id: 'saved', text: t.nav.saved, icon: Bookmark, badge: savedCount },
  ];

  const go = (id) => {
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a0b0e]/90 backdrop-blur-2xl border-b border-white/10 font-inter shadow-2xl transition-all max-w-full overflow-x-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">

          {/* Logo Brand */}
          <button onClick={() => go('home')} className="flex items-center gap-2.5 sm:gap-3.5 group text-right shrink-0">
            <div className="relative p-0.5 rounded-full bg-white/5 border border-white/15 group-hover:border-[#0082A6] transition-colors shadow-lg">
              <img src="./logo.png" alt="Jfara FM" className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-contain transform group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-tajawal font-black text-sm sm:text-[16px] text-white tracking-tight group-hover:text-[#0082A6] transition-colors">
                جفارة إف إم
              </span>
              <span className="text-[9px] sm:text-[11px] text-[#c8a44e] font-poppins tracking-wide mt-0.5 hidden xs:inline">
                98.4 FM — Ben Guerdane
              </span>
            </div>
          </button>

          {/* Desktop Nav Bar */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md font-tajawal">
            {nav.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={`relative px-3.5 py-1.5 text-[13px] font-bold rounded-lg transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white bg-[#0082A6] shadow-lg shadow-[#0082A6]/30 border border-white/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  <span>{item.text}</span>
                  {item.badge > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#c8a44e] text-black text-[10px] font-mono font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controls Area (Desktop & Mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 font-poppins shrink-0">

            {/* Interactive Flag Language Switcher */}
            <div className="scale-95 sm:scale-100">
              <LanguageSwitcher lang={lang} onChangeLang={onChangeLang} />
            </div>

            {/* Live Facebook Link (Desktop) */}
            <a
              href="https://www.facebook.com/radiojfara.fm/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877F2]/15 border border-[#1877F2]/30 text-[#1877F2] text-xs font-semibold hover:bg-[#1877F2]/25 hover:scale-[1.02] transition-all shadow-md"
            >
              <FacebookIcon className="w-3.5 h-3.5" />
              <span>{t.nav.facebook}</span>
            </a>

            {/* Live Indicator + Play Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-1.5 sm:gap-2 h-8 sm:h-9 px-2.5 sm:px-3.5 rounded-lg bg-[#0082A6] text-white text-[11px] sm:text-[12px] font-bold tracking-wide transition-all duration-300 hover:scale-[1.03] shadow-lg ${
                isPlaying ? 'glow-brand-blue' : 'hover:bg-[#006e8c]'
              }`}
            >
              {isPlaying ? (
                <>
                  <div className="flex items-end gap-[2px] h-3">
                    {[0, 0.2, 0.1, 0.3, 0.15].map((d, i) => (
                      <div
                        key={i}
                        className="w-[2px] bg-white rounded-full animate-pulse"
                        style={{ height: `${8 + i * 2}px` }}
                      />
                    ))}
                  </div>
                  <span>{t.nav.live}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{t.nav.live}</span>
                </>
              )}
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 focus:outline-none shadow-md shrink-0 active:scale-95 transition-all"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#07080a]/98 backdrop-blur-3xl transition-all duration-300 max-w-full overflow-x-hidden shadow-2xl">
          <div className="max-w-[1280px] mx-auto px-5 py-5 flex flex-col gap-3 font-tajawal">
            
            {/* Top Info inside Drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold text-white font-tajawal">إذاعة جفارة أف أم</span>
              <span className="text-xs font-bold text-[#0082A6] font-poppins">98.4 FM Ben Guerdane</span>
            </div>

            {/* Mobile Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {nav.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => go(item.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? 'text-white bg-[#0082A6] border border-white/20 shadow-lg shadow-[#0082A6]/30'
                        : 'text-slate-200 hover:text-white bg-white/[0.04] border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-[#c8a44e]" />
                      <span>{item.text}</span>
                    </div>
                    {item.badge > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#c8a44e] text-black text-xs font-mono font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Facebook Link */}
            <a
              href="https://www.facebook.com/radiojfara.fm/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3.5 mt-2 rounded-xl bg-[#1877F2] text-white font-bold text-xs shadow-md active:scale-98 transition-all"
            >
              <FacebookIcon className="w-4 h-4" />
              <span>{t.footer.officialPage}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
