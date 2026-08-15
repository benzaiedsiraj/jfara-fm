import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, Radio, Sparkles } from 'lucide-react';
import { translations } from '../data/translations';

const hostPortraits = [
  { name: 'فريق الإعداد والتنسيق', role: 'صباح جفارة', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
  { name: 'معتز هلال', role: 'خلّي بصمتك', img: '/real_news/khalli_basmatak_moataz.png' },
  { name: 'عبد السلام زغدود', role: 'أهل الخيل', img: '/real_news/ahl_khayl_abdelsalam.png' },
  { name: 'تقوى', role: 'عشوية لايت', img: '/real_news/ashweya_takwa.png' }
];

const weekSchedule = {
  'الأحد': [
    { start: '07:30', end: '10:00', title: 'صباح جفارة', desc: 'الأخبار المحلية، الخدمات، والمستجدات ببنقردان', host: 'فريق الإعداد والتنسيق', hostImg: hostPortraits[0].img },
    { start: '10:30', end: '12:00', title: 'لقاء خاص', desc: 'حوارات التنمية الجهوية للبنية التحتية', host: 'محمد الفرجاني', hostImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { start: '16:00', end: '17:30', title: 'أهل الخيل', desc: 'برنامج الفروسية وتراث الجنوب التونسي', host: 'عبد السلام زغدود', hostImg: hostPortraits[2].img },
    { start: '18:00', end: '19:30', title: 'عشوية لايت', desc: 'منوعة خفيفة ومستجدات الفنون والموسيقى', host: 'تقوى', hostImg: hostPortraits[3].img }
  ],
  'الإثنين': [
    { start: '07:30', end: '10:00', title: 'صباح جفارة', desc: 'جولة إخبارية وخدمية صباحية', host: 'فريق الإعداد والتنسيق', hostImg: hostPortraits[0].img },
    { start: '10:30', end: '12:00', title: 'لقاء خاص', desc: 'ملفات التنمية والبنية التحتية', host: 'محمد الفرجاني', hostImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { start: '16:00', end: '17:30', title: 'بنقردان اليوم', desc: 'تغطية ميدانية وأخبار محلية', host: 'فريق الإعداد', hostImg: hostPortraits[0].img },
    { start: '18:00', end: '19:30', title: 'خلّي بصمتك', desc: 'برنامج شبابي تفاعلي يستعرض المبادرات والمواهب بالجنوب', host: 'معتز هلال', hostImg: hostPortraits[1].img }
  ],
  'الثلاثاء': [
    { start: '07:30', end: '10:00', title: 'صباح جفارة', desc: 'الأخبار والخدمات والأسعار', host: 'فريق الإعداد والتنسيق', hostImg: hostPortraits[0].img },
    { start: '10:30', end: '12:00', title: 'صحتك أولاً', desc: 'نصائح صحية ومستجدات التغذية والمؤتمرات الطبية', host: 'فريق الإعداد', hostImg: hostPortraits[0].img },
    { start: '16:00', end: '17:30', title: 'أهل الخيل', desc: 'تراث الفروسية وأخبار السباقات', host: 'عبد السلام زغدود', hostImg: hostPortraits[2].img },
    { start: '18:00', end: '19:30', title: 'عشوية لايت', desc: 'فقرات موسيقية وثقافية صيفية', host: 'تقوى', hostImg: hostPortraits[3].img }
  ],
  'الأربعاء': [
    { start: '07:30', end: '10:00', title: 'صباح جفارة', desc: 'جولة إخبارية شاملة ومستجدات جربة', host: 'فريق الإعداد والتنسيق', hostImg: hostPortraits[0].img },
    { start: '10:30', end: '12:00', title: 'لقاء خاص', desc: 'استضافة مسؤولين ونقاش مفتوح', host: 'محمد الفرجاني', hostImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { start: '16:00', end: '17:30', title: 'بنقردان اليوم', desc: 'أخبار المدينة والضواحي', host: 'فريق الإعداد', hostImg: hostPortraits[0].img },
    { start: '18:00', end: '19:30', title: 'خلّي بصمتك', desc: 'إعادة حلقة المبادرات الشبابية والتفاعل', host: 'معتز هلال', hostImg: hostPortraits[1].img }
  ],
  'الخميس': [
    { start: '07:30', end: '10:00', title: 'صباح جفارة', desc: 'أخبار الصباح والخدمات العامة', host: 'فريق الإعداد والتنسيق', hostImg: hostPortraits[0].img },
    { start: '10:30', end: '12:00', title: 'لقاء خاص', desc: 'حوارات حول الشأن العام والبيئة', host: 'محمد الفرجاني', hostImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { start: '16:00', end: '17:30', title: 'أهل الخيل (البث المباشر الرئيسي)', desc: 'برنامج الفروسية والتراث الشعبي وتربية الخيول الاصيلة', host: 'عبد السلام زغدود', hostImg: hostPortraits[2].img },
    { start: '18:00', end: '19:30', title: 'عشوية لايت', desc: 'إهداءات وأجواء موسيقية', host: 'تقوى', hostImg: hostPortraits[3].img }
  ],
  'الجمعة': [
    { start: '07:30', end: '10:00', title: 'صباح جفارة', desc: 'نشرة الجمعة الخاصة والمتابعات', host: 'فريق الإعداد والتنسيق', hostImg: hostPortraits[0].img },
    { start: '10:30', end: '12:00', title: 'الجمعة المباركة', desc: 'برنامج ديني خاص بيوم الجمعة', host: 'فريق الإعداد', hostImg: hostPortraits[0].img },
    { start: '16:00', end: '17:30', title: 'بنقردان اليوم', desc: 'ملخص الأسبوع المحلي', host: 'فريق الإعداد', hostImg: hostPortraits[0].img },
    { start: '18:00', end: '19:30', title: 'خلّي بصمتك', desc: 'المنوعة الشبابية الأسبوعية', host: 'معتز هلال', hostImg: hostPortraits[1].img }
  ],
  'السبت': [
    { start: '08:00', end: '10:00', title: 'صباح الويكاند', desc: 'إطلالة صباحية خفيفة', host: 'فريق الإعداد والتنسيق', hostImg: hostPortraits[0].img },
    { start: '10:30', end: '12:00', title: 'أهل الخيل', desc: 'حلقة خاصة عن سباقات الخيل', host: 'عبد السلام زغدود', hostImg: hostPortraits[2].img },
    { start: '16:00', end: '18:00', title: 'عشوية لايت (البث الرئيسي)', desc: 'المنوعة الصيفية الكبرى مع تقوى مباشرة وحصرياً', host: 'تقوى', hostImg: hostPortraits[3].img },
    { start: '18:00', end: '19:30', title: 'لقاء خاص', desc: 'حوارات واستعراض ملفات الأسبوع', host: 'محمد الفرجاني', hostImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' }
  ]
};

const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

const SchedulePage = ({ onBackToHome, lang = 'ar' }) => {
  const [selectedDay, setSelectedDay] = useState('الأحد');
  const t = translations[lang] || translations.ar;

  const selectedShows = weekSchedule[selectedDay] || [];

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10 font-inter flex flex-col gap-10">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-slate-300 font-bold font-tajawal transition-all"
          >
            <ArrowRight className={`w-4 h-4 ${lang !== 'ar' ? 'rotate-180' : ''}`} />
            <span>{t.common.backToHome}</span>
          </button>
          <div className="h-5 w-[1px] bg-white/15" />
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#0082A6]" />
            <h1 className="font-tajawal font-black text-2xl text-white">{t.schedule.badge}</h1>
          </div>
        </div>
      </div>

      {/* Day selector tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-tajawal">
        {dayNames.map((day) => {
          const isSel = selectedDay === day;
          const translatedDay = t.schedule.days[day] || day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                isSel
                  ? 'bg-[#0082A6] text-white shadow-lg shadow-[#0082A6]/30 border border-white/20'
                  : 'bg-[#0d0f15] text-slate-400 border border-white/10 hover:text-white'
              }`}
            >
              {translatedDay}
            </button>
          );
        })}
      </div>

      {/* Shows grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedShows.map((show, idx) => (
          <div 
            key={idx}
            className="bg-[#0d0f15] border border-white/10 hover:border-white/25 rounded-2xl p-6 flex gap-5 items-start transition-all"
          >
            <img 
              src={show.hostImg} 
              alt={show.host} 
              className="w-16 h-16 rounded-full object-cover border-2 border-[#0082A6] shrink-0 shadow-lg" 
            />
            <div className="flex flex-col gap-2 min-w-0 flex-1 text-right font-tajawal">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-amber-400 font-mono font-bold" dir="ltr">
                  <Clock className="w-3.5 h-3.5 text-[#0082A6]" />
                  <span>{show.start} - {show.end}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] text-slate-300">
                  {show.host}
                </span>
              </div>

              <h3 className="font-black text-lg text-white">{show.title}</h3>
              <p className="text-xs text-slate-400 font-poppins leading-relaxed">{show.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default SchedulePage;
