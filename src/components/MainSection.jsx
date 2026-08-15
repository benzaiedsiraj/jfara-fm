import React, { useState, useEffect } from 'react';
import {
  Play, Pause, ChevronLeft, ChevronRight, ArrowUpLeft,
  Calendar, Clock, Mic, Sparkles, Bookmark, Newspaper, Sun, Video
} from 'lucide-react';
import { samplePodcasts } from '../data/podcastsData';
import { realNewsArticles } from '../data/newsData';
import PodcastCard from './PodcastCard';
import { translations } from '../data/translations';

/* ─── Real Photography Assets (Relative Paths) ─── */
const realPhotos = {
  studio: "./real_news/studio_banner.png",
  electricity: "./real_news/electricity.png",
  earthquake: "./real_news/earthquake.png",
  ashweya: "./real_news/ashweya_takwa.png",
  nutrition: "./real_news/nutrition.png",
  djerbaEnv: "./real_news/environment_djerba.png",
  president: "./real_news/president_meeting.png",
  psg: "./real_news/psg_supercup.png",
  khalliBasmatak: "./real_news/khalli_basmatak_moataz.png",
  ahlKhayl: "./real_news/ahl_khayl_abdelsalam.png"
};

/* ─── Instagram News Stories (Instants) Data ─── */
const newsStories = [
  {
    id: 1,
    title: 'رئيس الدولة لدى استقباله عددا من الوزراء: تفكيك شبكات الفساد هو أول الأولوية',
    desc: 'تأكيد على فتح الملفات الكبرى وتطبيق القانون لضمان السير العادي للمرافق العمومية.',
    tag: 'شأن وطني',
    tagBg: 'bg-[#0082A6]',
    image: realPhotos.president,
    time: 'قبل 45 دقيقة'
  },
  {
    id: 2,
    title: 'عملية تدخل لإعادة التيار الكهربائي خلال موجة الحر الأخيرة (فرع 18294)',
    desc: 'فرق الصيانة الفنية تقوم بإصلاح الأعطال الطارئة وإعادة التيار الكهربائي للمحولات والمناطق المتأثرة.',
    tag: 'تدخلات طارئة',
    tagBg: 'bg-[#0082A6]',
    image: realPhotos.electricity,
    time: 'قبل ساعتين'
  },
  {
    id: 3,
    title: 'باريس سان جيرمان يحتفظ بلقب كأس السوبر الأوروبية بفوزه 2-1 على أستون فيلا',
    desc: 'تتويج مستحق للنادي الباريسي في مواجهة مثيرة حسمت في الدقائق الأخيرة من المباراة.',
    tag: 'رياضة عالمية',
    tagBg: 'bg-amber-600',
    image: realPhotos.psg,
    time: 'قبل 3 ساعات'
  },
  {
    id: 4,
    title: 'سيدي بوزيد: رجّة أرضية بقوة 3 درجات بمنطقة جنوب شرق المكناسي',
    desc: 'سجلت محطات رصد الزلازل التابعة للمعهد الوطني للرصد الجوي رجة أرضية خفيفة بقوة 3 درجات على سلم ريختر.',
    tag: 'رصد جوي',
    tagBg: 'bg-teal-700',
    image: realPhotos.earthquake,
    time: 'قبل 4 ساعات'
  }
];

/* ─── Real Presenter Portraits ─── */
const hostPortraits = [
  { name: 'فريق الإعداد والتنسيق', role: 'صباح جفارة', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
  { name: 'معتز هلال', role: 'خلّي بصمتك', img: realPhotos.khalliBasmatak },
  { name: 'عبد السلام زغدود', role: 'أهل الخيل', img: realPhotos.ahlKhayl },
  { name: 'تقوى', role: 'عشوية لايت', img: realPhotos.ashweya }
];

/* ─── Schedule data per day ─── */
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

function timeToMinutes(str) {
  const [h, m] = str.split(':').map(Number);
  return h * 60 + m;
}

function getTodayArabic() {
  return dayNames[new Date().getDay()];
}

function getCurrentShow(dayShows, nowMinutes) {
  return dayShows.find(
    (s) => nowMinutes >= timeToMinutes(s.start) && nowMinutes < timeToMinutes(s.end)
  );
}

function getShowProgress(show, nowMinutes) {
  const start = timeToMinutes(show.start);
  const end = timeToMinutes(show.end);
  return Math.min(100, Math.max(0, ((nowMinutes - start) / (end - start)) * 100));
}

/* ─── INSTAGRAM STORIES SKIPPABLE NEWS COMPONENT ─── */
const InstagramNewsStories = ({ t }) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentStory = newsStories[activeStoryIndex];

  useEffect(() => {
    if (isPaused) return;

    const DURATION = 5000;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / DURATION) * 100);

      if (pct >= 100) {
        clearInterval(interval);
        setProgress(0);
        setActiveStoryIndex((prev) => (prev + 1) % newsStories.length);
      } else {
        setProgress(pct);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [activeStoryIndex, isPaused]);

  const handleNext = (e) => {
    e.stopPropagation();
    setProgress(0);
    setActiveStoryIndex((prev) => (prev + 1) % newsStories.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setProgress(0);
    setActiveStoryIndex((prev) => (prev === 0 ? newsStories.length - 1 : prev - 1));
  };

  return (
    <div 
      className="relative w-full h-[380px] sm:h-[460px] rounded-2xl overflow-hidden bg-[#0a0b0e] border border-white/10 shadow-2xl group flex flex-col justify-between select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 z-0">
        <img 
          key={currentStory.id}
          src={currentStory.image} 
          alt={currentStory.title} 
          className="w-full h-full object-cover transition-opacity duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/75 to-black/60" />
      </div>

      <div className="relative z-20 px-3 sm:px-4 pt-3 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 w-full">
          {newsStories.map((story, idx) => {
            let barFill = 0;
            if (idx < activeStoryIndex) barFill = 100;
            else if (idx === activeStoryIndex) barFill = progress;

            return (
              <div 
                key={story.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveStoryIndex(idx);
                  setProgress(0);
                }}
                className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer"
              >
                <div 
                  className="h-full bg-white transition-all duration-75 ease-linear rounded-full"
                  style={{ width: `${barFill}%` }}
                />
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-white text-xs font-poppins px-1">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold font-audiowide text-white ${currentStory.tagBg}`}>
              {currentStory.tag}
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-300 font-roboto">{currentStory.time}</span>
          </div>

          <div className="flex items-center gap-2">
            {isPaused && (
              <span className="px-2 py-0.5 rounded bg-black/60 text-[9px] text-amber-400 font-bold border border-amber-400/30">
                {t.hero.paused}
              </span>
            )}
            <span className="font-mono text-[10px] sm:text-[11px] text-slate-300 font-bold tracking-wider" dir="ltr">
              {activeStoryIndex + 1} / {newsStories.length}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-y-0 inset-x-0 z-10 flex">
        <div 
          onClick={handlePrev}
          className="w-1/2 h-full cursor-pointer group/right flex items-center justify-start pr-4"
          title="Previous"
        >
          <button 
            onClick={handlePrev}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/right:opacity-100 transition-opacity hover:scale-110"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div 
          onClick={handleNext}
          className="w-1/2 h-full cursor-pointer group/left flex items-center justify-end pl-4"
          title="Next"
        >
          <button 
            onClick={handleNext}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/left:opacity-100 transition-opacity hover:scale-110"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      <div className="relative z-20 p-4 sm:p-6 flex flex-col gap-2 text-right font-montserrat pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0082A6] animate-ping" />
          <span className="text-[10px] sm:text-[11px] text-[#38BDF8] font-bold font-poppins">{t.hero.instantsTitle}</span>
        </div>

        <h3 className="font-tajawal font-black text-base sm:text-xl text-white leading-snug tracking-wide line-clamp-2">
          {currentStory.title}
        </h3>

        <p className="text-xs text-slate-300 font-poppins line-clamp-2 leading-relaxed hidden sm:block">
          {currentStory.desc}
        </p>

        <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs font-poppins mt-1">
          <span className="text-[#c8a44e] font-bold text-[11px] sm:text-xs">{t.hero.exclusive}</span>
          <span className="flex items-center gap-1 text-[#38BDF8] text-[11px] sm:text-xs pointer-events-auto cursor-pointer hover:underline">
            <span>{t.hero.readDetails}</span>
            <ArrowUpLeft className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};

const MainSection = ({ isPlaying, setIsPlaying, onNavigate, onPlayPodcast, activePodcastId, savedPodcastIds, onToggleSave, lang, onOpenLiveVideo }) => {
  const [now, setNow] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(getTodayArabic());
  const t = translations[lang] || translations.ar;

  // Scroll Reveal Observer Effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const todayName = getTodayArabic();
  const todayShows = weekSchedule[todayName] || [];
  const currentShow = getCurrentShow(todayShows, nowMinutes);
  const progress = currentShow ? getShowProgress(currentShow, nowMinutes) : 0;

  const selectedShows = weekSchedule[selectedDay] || [];
  const isToday = selectedDay === todayName;

  return (
    <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 flex flex-col gap-12 sm:gap-16 font-inter relative z-10 max-w-full overflow-x-hidden">

      {/* ═══════════════════════════════════════
          SECTION 1 — HERO: LIVE BROADCAST STAGE WITH LOGO GOLD LIVE VIDEO BUTTON
      ═══════════════════════════════════════ */}
      <section id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch border-b border-white/10 pb-12 sm:pb-16 reveal-on-scroll">
        <div className="lg:col-span-7 flex flex-col justify-between gap-5 relative min-h-[400px] sm:min-h-[480px] rounded-3xl overflow-hidden bg-[#0d0f15] border border-white/10 p-5 sm:p-8 shadow-2xl group">
          <div className="absolute inset-0 z-0">
            <img 
              src={realPhotos.studio} 
              alt="Jfara FM Studio" 
              className="w-full h-full object-cover opacity-60 transform group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#0d0f15]/80 to-transparent" />
          </div>

          {/* Top Bar: Live Badge */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0082A6] text-white text-xs font-bold font-audiowide tracking-wider shadow-lg glow-brand-blue">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              {t.hero.liveBadge}
            </span>
          </div>

          {/* Center Play Button & Title + WATCH LIVE VIDEO BUTTON (LOGO-MATCHED GOLD) */}
          <div className="relative z-10 flex flex-col items-center text-center gap-4 sm:gap-5 my-auto py-4 sm:py-6">
            <div className="flex items-center gap-4">
              
              {/* Audio Play Button */}
              <div className="relative">
                <div className={`absolute -inset-3 rounded-full bg-[#0082A6]/40 blur-xl ${isPlaying ? 'animate-pulse' : ''}`} />
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#005f7a] to-[#0082A6] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 glow-brand-blue"
                  title="استماع للبث المباشر (صوت)"
                >
                  {isPlaying
                    ? <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
                    : <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current mr-[-3px]" />
                  }
                </button>
              </div>

              {/* WATCH LIVE STUDIO VIDEO BUTTON (LOGO GOLD MATCHED) */}
              <button
                onClick={onOpenLiveVideo}
                className="flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-gradient-to-r from-[#c8a44e] via-[#eab308] to-[#c8a44e] hover:brightness-110 text-black font-black text-xs sm:text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all glow-gold border border-white/30 font-tajawal"
                title="مشاهدة البث المرئي الحي للاستوديو"
              >
                <Video className="w-4 h-4 sm:w-5 sm:h-5 text-black animate-pulse" />
                <span>مشاهدة البث المرئي (فيديو)</span>
              </button>

            </div>

            <div className="space-y-2 max-w-lg px-2">
              <h1 className="font-tajawal font-black text-xl sm:text-2xl md:text-3xl text-white drop-shadow-md break-words leading-tight">
                {currentShow ? currentShow.title : t.hero.stationTitle}
              </h1>
              <p className="text-slate-200 text-xs sm:text-sm font-poppins leading-relaxed drop-shadow line-clamp-2">
                {currentShow ? currentShow.desc : t.hero.stationSubtitle}
              </p>
            </div>
          </div>

          {currentShow && (
            <div className="relative z-10 space-y-2.5 pt-3 border-t border-white/20 font-roboto">
              <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-300">
                <span>{currentShow.start}</span>
                <span className="text-[#c8a44e] font-bold font-poppins">
                  {Math.round(progress)}% {t.hero.progressCompleted}
                </span>
                <span>{currentShow.end}</span>
              </div>
              
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#0082A6] via-[#0284c7] to-[#c8a44e] rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 flex flex-col justify-center">
          <InstagramNewsStories t={t} />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          COMPACT WEATHER WIDGET BAR
      ═══════════════════════════════════════ */}
      <section className="reveal-on-scroll">
        <div className="rounded-2xl bg-[#0d0f15]/90 border border-white/10 p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 font-tajawal backdrop-blur-xl text-center sm:text-right">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Sun className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-amber-400">{t.weather.compactTitle}</span>
              <p className="text-xs text-slate-200 font-poppins leading-relaxed">
                بن قردان <strong className="text-white font-mono">36°C</strong> · مدنين <strong className="text-white font-mono">38°C</strong> · جربة <strong className="text-white font-mono">35°C</strong> · جرجيس <strong className="text-white font-mono">35°C</strong> · تطاوين <strong className="text-white font-mono">37°C</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('weather')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0082A6] hover:bg-[#006e8c] text-white text-xs font-bold whitespace-nowrap transition-all shadow-md hover:scale-105 shrink-0"
          >
            <span>{t.weather.fullDetailsBtn}</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 — WEEKLY SCHEDULE
      ═══════════════════════════════════════ */}
      <section id="schedule" className="flex flex-col gap-0 reveal-on-scroll">
        <div className="mb-4 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('schedule')}
            className="group flex items-center gap-2 text-right transition-transform hover:scale-[1.01]"
            title={t.schedule.viewFull}
          >
            <span className="inline-block px-4 sm:px-5 py-2 bg-[#0082A6] text-white font-tajawal font-black text-xs sm:text-sm tracking-wider shadow-lg shadow-[#0082A6]/30 rounded-sm group-hover:bg-[#006e8c] transition-colors" style={{ clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 100%)' }}>
              {t.schedule.badge}
            </span>
            <span className="text-xs text-slate-400 group-hover:text-[#c8a44e] font-tajawal font-bold transition-colors hidden sm:flex items-center gap-1">
              <span>{t.schedule.viewFull}</span>
              <ChevronLeft className="w-4 h-4" />
            </span>
          </button>
        </div>

        <div className="flex items-center gap-0 bg-[#0d0f15] border border-white/10 rounded-t-2xl overflow-x-auto scrollbar-none">
          {dayNames.map((day) => {
            const isSel = selectedDay === day;
            const isTodayBtn = day === todayName;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex-1 py-3 px-3 min-w-[70px] text-center text-xs sm:text-sm font-bold font-tajawal transition-all duration-300 relative ${
                  isSel
                    ? 'bg-[#0082A6] text-white shadow-inner'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {day}
                {isTodayBtn && !isSel && (
                  <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#c8a44e] animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        <div className="bg-[#0d0f15]/80 backdrop-blur-xl border border-t-0 border-white/10 rounded-b-2xl overflow-hidden divide-y divide-white/[0.06]">
          {selectedShows.map((show, idx) => {
            const isNow = isToday && getCurrentShow([show], nowMinutes);
            const showProgress = isNow ? getShowProgress(show, nowMinutes) : 0;

            const categoryTags = ['حوار', 'أخبار', 'تراث', 'شبابي'];
            const categoryColors = ['bg-[#0082A6]', 'bg-[#c8a44e]', 'bg-teal-700', 'bg-sky-600'];
            const tagText = categoryTags[idx % categoryTags.length];
            const tagColor = categoryColors[idx % categoryColors.length];

            return (
              <div
                key={idx}
                className={`relative flex flex-col sm:flex-row items-center text-center sm:text-right gap-4 sm:gap-5 px-4 sm:px-6 py-4 sm:py-5 group transition-all duration-300 ${
                  isNow
                    ? 'bg-[#0082A6]/[0.08]'
                    : 'hover:bg-white/[0.03]'
                }`}
              >
                {isNow && (
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#0082A6] rounded-l shadow-[0_0_12px_rgba(0,130,166,0.6)]" />
                )}

                <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${
                  isNow ? 'border-[#0082A6] shadow-[0_0_16px_rgba(0,130,166,0.5)]' : 'border-white/15 group-hover:border-white/30'
                }`}>
                  <img
                    src={show.hostImg}
                    alt={show.host}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col gap-1 items-center sm:items-start w-full">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h3 className={`font-tajawal font-bold text-sm sm:text-base transition-colors duration-300 ${
                      isNow ? 'text-white' : 'text-slate-200 group-hover:text-white'
                    }`}>
                      {show.title}
                    </h3>
                    {isNow && (
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0082A6] text-white text-[9px] sm:text-[10px] font-bold font-tajawal shadow-lg shadow-[#0082A6]/30 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        {t.schedule.onAirNow}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400 font-roboto tabular-nums tracking-wide" dir="ltr">
                      {show.start} — {show.end}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-slate-400 font-tajawal">{show.host}</span>
                  </div>

                  {isNow && (
                    <div className="mt-1.5 w-full max-w-xs h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#0082A6] to-[#c8a44e] rounded-full transition-all duration-1000 ease-linear"
                        style={{ width: `${showProgress}%` }}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold font-tajawal text-white ${tagColor}`}>
                    {tagText}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3 — PODCASTS SECTION
      ═══════════════════════════════════════ */}
      <section id="podcasts" className="flex flex-col gap-6 reveal-on-scroll">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <button
            onClick={() => onNavigate('podcasts')}
            className="flex items-center gap-3 group text-right cursor-pointer"
            title={t.podcasts.viewLibrary}
          >
            <div className="w-3 h-7 rounded-full bg-[#c8a44e] group-hover:scale-110 transition-transform" />
            <div className="flex items-center gap-2">
              <h2 className="font-tajawal font-black text-lg sm:text-xl lg:text-2xl text-white group-hover:text-amber-400 transition-colors">
                {t.podcasts.headerTitle}
              </h2>
            </div>
          </button>

          <button
            onClick={() => onNavigate('podcasts')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-slate-300 font-bold font-tajawal transition-all"
          >
            <span>{t.podcasts.seeAll}</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {samplePodcasts.slice(0, 3).map((podcast) => (
            <PodcastCard
              key={podcast.id}
              podcast={podcast}
              isCurrent={activePodcastId === podcast.id}
              isPlaying={isPlaying && activePodcastId === podcast.id}
              onPlay={() => onPlayPodcast(podcast)}
              isSaved={savedPodcastIds.includes(podcast.id)}
              onToggleSave={onToggleSave}
              lang={lang}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4 — REAL NEWS CARDS GRID
      ═══════════════════════════════════════ */}
      <section id="news" className="flex flex-col gap-6 reveal-on-scroll">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <button
            onClick={() => onNavigate('news')}
            className="flex items-center gap-3 group text-right cursor-pointer"
            title={t.news.viewAll}
          >
            <div className="w-3 h-7 rounded-full bg-[#0082A6] group-hover:scale-110 transition-transform" />
            <h2 className="font-tajawal font-black text-lg sm:text-xl lg:text-2xl text-white group-hover:text-[#38BDF8] transition-colors">
              {t.news.headerTitle}
            </h2>
          </button>

          <button
            onClick={() => onNavigate('news')}
            className="flex items-center gap-1.5 text-xs text-[#38BDF8] hover:text-white font-bold font-poppins"
          >
            <span>{t.news.viewAll}</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {realNewsArticles.slice(0, 3).map((article) => (
            <div 
              key={article.id}
              onClick={() => onNavigate('news')}
              className="flex flex-col gap-4 group cursor-pointer bg-[#0d0f15] p-4 rounded-2xl border border-white/10 hover:border-white/25 transition-all"
            >
              <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden bg-black/40 border border-white/10">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded text-white text-[10px] font-bold font-tajawal shadow-md ${article.categoryBg}`}>
                  {article.category}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 text-right font-montserrat">
                <span className="text-[10px] text-slate-400 font-roboto">{article.time} · {article.date}</span>
                <h4 className="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors leading-snug font-tajawal line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs text-slate-400 font-poppins line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
};

export default MainSection;
