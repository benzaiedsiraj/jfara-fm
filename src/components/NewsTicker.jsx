import React from 'react';
import { translations } from '../data/translations';

const rawTickerItems = [
  'عملية تدخل لإعادة التيار الكهربائي خلال موجة الحر الأخيرة (فرع 18294)',
  'سيدي بوزيد: رجّة أرضية بقوة 3 درجات بمنطقة جنوب شرق المكناسي',
  'وزارة البيئة: مشروع تثمين النفايات بجربة في طور استكمال الدراسات والإجراءات الفنية والبيئية',
  'تونس تحتضن المؤتمر الدولي الثامن للتغذية بالشراكة مع الجمعية الفرنسية للتغذية',
  'برنامج "عشوية لايت" مع تقوى كل يوم سبت عبر موجات إذاعة جفارة إف إم 98.4 FM',
  'تقدم أشغال تهيئة الطريق الرابطة بين مفترق بوعواجة ومفترق الأعباش ببنقردان بنسبة 90%'
];

const TrackContent = ({ keyPrefix }) => (
  <div className="flex items-center shrink-0">
    {rawTickerItems.map((headline, idx) => (
      <React.Fragment key={`${keyPrefix}-${idx}`}>
        <span className="whitespace-nowrap text-xs sm:text-sm font-medium tracking-wide mx-4 sm:mx-6 font-tajawal text-white">
          {headline}
        </span>
        <img
          src="/logo.png"
          alt="Jfara FM"
          className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-contain bg-white/20 p-0.5 border border-white/40 flex-shrink-0 mx-2"
        />
      </React.Fragment>
    ))}
  </div>
);

const NewsTicker = ({ lang = 'ar' }) => {
  const t = translations[lang] || translations.ar;
  const isRtl = lang === 'ar';

  return (
    <div
      className="w-full bg-gradient-to-r from-[#005f7a] via-[#0082A6] to-[#004e64] text-white overflow-hidden py-2 shadow-lg relative z-40 border-y border-white/10"
      style={{ fontFamily: "'Tajawal', sans-serif" }}
    >
      <div className="flex items-center">

        {/* Logo-matched Gold News Tag Badge */}
        <div
          className="flex items-center gap-2 px-4 sm:px-5 py-1 bg-[#c8a44e] text-black text-xs font-black flex-shrink-0 z-20 shadow-md font-tajawal"
          style={{ borderLeft: '1px solid rgba(255,255,255,0.3)' }}
        >
          <span className="w-2 h-2 rounded-full bg-black animate-ping" />
          <span>{t.common.newsTickerTag}</span>
        </div>

        {/* Marquee viewport */}
        <div className="overflow-hidden flex-1 relative min-w-0">
          <div className={isRtl ? 'marquee-strip-rtl' : 'marquee-strip-ltr'}>
            <TrackContent keyPrefix="a" />
            <TrackContent keyPrefix="b" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewsTicker;
