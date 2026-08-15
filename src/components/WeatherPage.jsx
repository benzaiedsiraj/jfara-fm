import React, { useState } from 'react';
import { Sun, CloudSun, Wind, Droplets, Thermometer, MapPin, ArrowRight } from 'lucide-react';
import { translations } from '../data/translations';

const weatherCities = [
  {
    name: 'بن قردان',
    enName: 'Ben Guerdane',
    temp: 36,
    condition: 'مشمس صافٍ',
    humidity: '48%',
    wind: '18 كم/س',
    uv: '8 عالي',
    sea: 'هادئ',
    landmark: 'صومعة بنقردان وأبراج البث الإذاعي',
    photo: '/real_news/benguerdane_city.jpg',
    bgGradient: 'from-[#0082A6]/30 to-amber-500/20'
  },
  {
    name: 'مدنين',
    enName: 'Medenine',
    temp: 38,
    condition: 'مشمس وحار',
    humidity: '42%',
    wind: '22 كم/س',
    uv: '9 عالي جداً',
    sea: 'داخل الجهة',
    landmark: 'نصب المقاومين والشهداء بمدنين',
    photo: '/real_news/medenine_monument.jpg',
    bgGradient: 'from-amber-600/30 to-red-900/20'
  },
  {
    name: 'جرجيس',
    enName: 'Zarzis',
    temp: 35,
    condition: 'مشمس ونسيم بحري',
    humidity: '62%',
    wind: '16 كم/س',
    uv: '8 عالي',
    sea: 'قليل الاضطراب',
    landmark: 'كورنيش وشواطئ جرجيس الساحلية',
    photo: '/real_news/djerba_coastal.jpg',
    bgGradient: 'from-[#0082A6]/30 to-cyan-600/20'
  },
  {
    name: 'جربة',
    enName: 'Djerba',
    temp: 35,
    condition: 'مشمس وطقس ساحلي',
    humidity: '65%',
    wind: '15 كم/س',
    uv: '8 عالي',
    sea: 'قليل الاضطراب',
    landmark: 'المعمار التقليدي والشريط الساحلي بجربة',
    photo: '/real_news/djerba_coastal.jpg',
    bgGradient: 'from-blue-600/30 to-teal-500/20'
  },
  {
    name: 'بني خداش',
    enName: 'Beni Khedache',
    temp: 35,
    condition: 'مشمس وطقس جبلي',
    humidity: '38%',
    wind: '24 كم/س',
    uv: '9 عالي',
    sea: 'جبلي',
    landmark: 'معالم وصوامع بني خداش التراثية',
    photo: '/real_news/kairouan_mosque.png',
    bgGradient: 'from-amber-700/30 to-yellow-600/20'
  },
  {
    name: 'تطاوين',
    enName: 'Tataouine',
    temp: 37,
    condition: 'مشمس وطقس صحراوي',
    humidity: '35%',
    wind: '25 كم/س',
    uv: '9 عالي جداً',
    sea: 'صحراوي',
    landmark: 'قصور تطاوين الجبلية والصحراوية',
    photo: '/real_news/environment_djerba.png',
    bgGradient: 'from-orange-600/30 to-amber-500/20'
  }
];

const WeatherPage = ({ onBackToHome, lang = 'ar' }) => {
  const [selectedCity, setSelectedCity] = useState(weatherCities[0]);
  const t = translations[lang] || translations.ar;

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 font-inter flex flex-col gap-8 sm:gap-10 max-w-full overflow-x-hidden">
      
      {/* Header Breadcrumb */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-slate-300 font-bold font-tajawal transition-all"
          >
            <ArrowRight className={`w-4 h-4 ${lang !== 'ar' ? 'rotate-180' : ''}`} />
            <span>{t.common.backToHome}</span>
          </button>
          <div className="h-5 w-[1px] bg-white/15 hidden xs:block" />
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-400" />
            <h1 className="font-tajawal font-black text-lg sm:text-2xl text-white line-clamp-1">{t.weather.pageTitle}</h1>
          </div>
        </div>
      </div>

      {/* Featured Selected City Hero Spotlight Card */}
      <div className={`relative rounded-3xl overflow-hidden border border-white/15 p-5 sm:p-8 bg-[#0d0f15] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 backdrop-blur-xl group`}>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={selectedCity.photo}
            alt={selectedCity.name}
            className="w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-700"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${selectedCity.bgGradient} via-[#0d0f15]/90 to-[#0d0f15]`} />
        </div>

        <div className="relative z-10 space-y-3 sm:space-y-4 text-right flex-1 w-full">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#0082A6]/20 text-[#38bdf8] font-bold text-xs border border-[#0082A6]/40 font-tajawal">
              {t.weather.liveUpdate}
            </span>
            <span className="text-xs text-slate-300 font-poppins flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#c8a44e]" />
              <span>{selectedCity.landmark}</span>
            </span>
          </div>

          <div className="flex items-baseline gap-3 sm:gap-4 font-tajawal">
            <h2 className="font-black text-3xl sm:text-5xl text-white tracking-tight">
              {selectedCity.name}
            </h2>
            <span className="text-xs sm:text-sm text-slate-400 font-roboto">({selectedCity.enName})</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 pt-2">
            <div className="flex items-center gap-2">
              <Thermometer className="w-7 h-7 sm:w-8 sm:h-8 text-[#0082A6]" />
              <span className="font-mono text-4xl sm:text-5xl font-black text-white">{selectedCity.temp}</span>
              <span className="text-xl sm:text-2xl text-amber-400 font-bold">°C</span>
            </div>

            <div className="h-8 sm:h-10 w-[1px] bg-white/15" />

            <div className="space-y-0.5 font-tajawal">
              <span className="text-base sm:text-lg font-bold text-slate-200">{selectedCity.condition}</span>
              <p className="text-[11px] sm:text-xs text-slate-400">{t.weather.stateToday}</p>
            </div>
          </div>
        </div>

        {/* Detail Metrics Grid */}
        <div className="relative z-10 grid grid-cols-3 gap-3 sm:gap-4 shrink-0 font-tajawal w-full lg:w-auto">
          <div className="bg-black/50 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/10 flex flex-col items-center gap-1 text-center">
            <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-[#0082A6]" />
            <span className="text-[10px] sm:text-xs text-slate-400">{t.weather.humidity}</span>
            <span className="text-sm sm:text-base font-bold text-white font-mono">{selectedCity.humidity}</span>
          </div>

          <div className="bg-black/50 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/10 flex flex-col items-center gap-1 text-center">
            <Wind className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <span className="text-[10px] sm:text-xs text-slate-400">{t.weather.wind}</span>
            <span className="text-sm sm:text-base font-bold text-white font-mono">{selectedCity.wind}</span>
          </div>

          <div className="bg-black/50 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/10 flex flex-col items-center gap-1 text-center">
            <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            <span className="text-[10px] sm:text-xs text-slate-400">{t.weather.uv}</span>
            <span className="text-sm sm:text-base font-bold text-white font-mono">{selectedCity.uv}</span>
          </div>
        </div>

      </div>

      {/* 6 Cities Photo Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {weatherCities.map((city) => {
          const isSelected = selectedCity.name === city.name;
          return (
            <div
              key={city.name}
              onClick={() => setSelectedCity(city)}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[200px] sm:min-h-[220px] ${
                isSelected
                  ? 'border-[#0082A6] shadow-[0_0_25px_rgba(0,130,166,0.35)] ring-2 ring-[#0082A6]'
                  : 'border-white/10 hover:border-white/25 hover:scale-[1.02]'
              }`}
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={city.photo}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/60 to-black/30" />
              </div>

              <div className="relative z-10 p-3.5 sm:p-4 flex items-center justify-between font-tajawal">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-white font-black text-xs sm:text-sm">
                    {city.name}
                  </span>
                  <span className="text-[10px] text-slate-300 font-poppins hidden xs:inline">({city.enName})</span>
                </div>

                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-400 shadow-md">
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                </div>
              </div>

              <div className="relative z-10 p-3.5 sm:p-4 pt-0 space-y-2 text-right font-tajawal">
                <p className="text-[11px] sm:text-xs text-slate-200 line-clamp-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#c8a44e] shrink-0" />
                  <span>{city.landmark}</span>
                </p>

                <div className="flex items-center justify-between border-t border-white/15 pt-2">
                  <span className="text-[11px] sm:text-xs text-slate-300 font-poppins">{city.condition}</span>

                  <div className="flex items-baseline gap-1 font-mono">
                    <span className="text-2xl sm:text-3xl font-black text-white">{city.temp}</span>
                    <span className="text-xs sm:text-sm font-bold text-amber-400">°C</span>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default WeatherPage;
