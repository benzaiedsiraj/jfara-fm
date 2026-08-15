import React, { useState, useEffect } from 'react';
import { Radio } from 'lucide-react';
import { translations } from '../data/translations';

const LiveClock = ({ size = 'normal', lang = 'ar' }) => {
  const [time, setTime] = useState(new Date());
  const t = translations[lang] || translations.ar;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  const secNum = time.getSeconds();

  if (size === 'large') {
    return (
      <div className="relative group font-mono select-none">
        {/* Outer Glowing Cyber Ring */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#0082A6] via-[#38bdf8] to-[#c8a44e] opacity-75 blur-md group-hover:opacity-100 transition-opacity animate-pulse" />
        
        {/* Futuristic Glass Container */}
        <div className="relative flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#090b10]/95 backdrop-blur-2xl border border-white/20 shadow-[0_0_30px_rgba(0,130,166,0.5)] text-white">
          
          {/* Animated Pulsing Signal Hub */}
          <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-[#0082A6]/20 border border-[#0082A6]/40 text-[#38bdf8] shrink-0">
            <Radio className="w-4 h-4 animate-pulse" />
            <div className="absolute inset-0 rounded-xl border border-[#38bdf8] animate-ping opacity-25" />
          </div>

          {/* Digital LED Clock Numbers */}
          <div className="flex items-baseline gap-1">
            {/* Hours */}
            <span className="text-2xl sm:text-3xl font-black tracking-wider text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
              {hours}
            </span>
            <span className="text-xl font-bold text-[#38bdf8] animate-pulse drop-shadow-[0_0_8px_#38bdf8]">
              :
            </span>
            {/* Minutes */}
            <span className="text-2xl sm:text-3xl font-black tracking-wider text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
              {minutes}
            </span>
            <span className="text-xl font-bold text-[#38bdf8] animate-pulse drop-shadow-[0_0_8px_#38bdf8]">
              :
            </span>
            {/* Seconds Box */}
            <span className="px-2 py-0.5 rounded-lg bg-[#c8a44e]/20 border border-[#c8a44e]/50 text-amber-400 text-base sm:text-lg font-black drop-shadow-[0_0_10px_rgba(200,164,78,0.8)]">
              {seconds}
            </span>
          </div>

          {/* Subtitle label */}
          <div className="hidden sm:flex flex-col text-right font-tajawal pr-2 border-r border-white/15">
            <span className="text-[10px] text-amber-400 font-bold leading-none">{t.clock.tzLabel}</span>
            <span className="text-[9px] text-slate-400 font-poppins leading-none mt-1">98.4 FM</span>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="relative group font-mono select-none">
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#090b10]/90 backdrop-blur-md border border-[#0082A6]/40 text-slate-200 text-xs shadow-lg">
        <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
        <span className="font-black text-white tracking-widest drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">
          {hours}:{minutes}
        </span>
        <span className="text-[11px] font-bold text-amber-400 font-mono border-l border-white/20 pl-1.5 ml-0.5">
          {seconds}s
        </span>
      </div>
    </div>
  );
};

export default LiveClock;
