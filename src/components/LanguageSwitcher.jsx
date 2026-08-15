import React from 'react';

/* SVG Flags */
const TunisiaFlag = ({ className = "w-5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 1200 800" fill="none">
    <rect width="1200" height="800" fill="#E70013" />
    <circle cx="600" cy="400" r="240" fill="white" />
    <path
      d="M625.5 249.5 C 542.4 249.5 475 316.9 475 400 C 475 483.1 542.4 550.5 625.5 550.5 C 674.3 550.5 717.3 527.3 744.7 491.2 C 730.8 497.4 715.3 500.9 699 500.9 C 643.3 500.9 598.1 455.7 598.1 400 C 598.1 344.3 643.3 299.1 699 299.1 C 715.3 299.1 730.8 302.6 744.7 308.8 C 717.3 272.7 674.3 249.5 625.5 249.5 Z"
      fill="#E70013"
    />
    <polygon
      points="690,400 648.8,429.9 664.6,381.6 623.3,351.7 674.3,351.7"
      fill="#E70013"
    />
  </svg>
);

const FranceFlag = ({ className = "w-5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 900 600">
    <rect width="300" height="600" fill="#002395" />
    <rect x="300" width="300" height="600" fill="#FFFFFF" />
    <rect x="600" width="300" height="600" fill="#ED2939" />
  </svg>
);

const UKFlag = ({ className = "w-5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 60 30">
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>
    <clipPath id="t">
      <path d="M30,15 m-30,0 l60,30 v-30 l-60,-30 z M30,15 m30,0 l-60,30 v-30 l60,-30 z" />
    </clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#cc0000" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#cc0000" strokeWidth="6" />
    </g>
  </svg>
);

const LanguageSwitcher = ({ lang, onChangeLang }) => {
  const cycleLang = () => {
    if (lang === 'ar') onChangeLang('fr');
    else if (lang === 'fr') onChangeLang('en');
    else onChangeLang('ar');
  };

  const getLangMeta = () => {
    if (lang === 'ar') return { Flag: TunisiaFlag, label: 'تونس (عربي)', code: 'TN' };
    if (lang === 'fr') return { Flag: FranceFlag, label: 'Français', code: 'FR' };
    return { Flag: UKFlag, label: 'English', code: 'UK' };
  };

  const { Flag, label, code } = getLangMeta();

  return (
    <button
      onClick={cycleLang}
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-slate-200 transition-all duration-300 hover:scale-105 shadow-md group"
      title={`اللغة الحالية: ${label} - انقر للتحويل`}
    >
      <div className="rounded-sm overflow-hidden border border-white/20 shadow-sm flex-shrink-0">
        <Flag className="w-5 h-3.5 object-cover" />
      </div>
      <span className="font-mono text-[11px] font-bold text-amber-400">{code}</span>
      <span className="text-[10px] text-slate-400 group-hover:text-white transition-colors">⇄</span>
    </button>
  );
};

export default LanguageSwitcher;
