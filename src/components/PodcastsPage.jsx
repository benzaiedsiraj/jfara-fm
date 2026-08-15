import React, { useState } from 'react';
import { Mic, Search, Bookmark, ArrowRight, Sparkles } from 'lucide-react';
import { samplePodcasts } from '../data/podcastsData';
import PodcastCard from './PodcastCard';
import { translations } from '../data/translations';

const PodcastsPage = ({ onBackToHome, activePodcastId, isPlaying, onPlayPodcast, savedPodcastIds, onToggleSave, lang = 'ar' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const t = translations[lang] || translations.ar;

  const categories = ['الكل', 'حوارات وتاريخ', 'تراث وفروسية', 'أخبار وخدمات', 'منوعة صيفية', 'صحة وتغذية'];

  const filteredPodcasts = samplePodcasts.filter((p) => {
    const matchesCat = selectedCategory === 'الكل' || p.category === selectedCategory;
    const matchesSearch = p.title.includes(searchQuery) || p.description.includes(searchQuery) || p.showName.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10 font-inter flex flex-col gap-10">
      
      {/* Top Navigation Breadcrumb Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
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
            <Mic className="w-5 h-5 text-[#0082A6]" />
            <h1 className="font-tajawal font-black text-2xl text-white">{t.podcasts.libraryTitle}</h1>
          </div>
        </div>

        {/* Saved Podcasts Count Pill */}
        <div className="flex items-center gap-2 bg-[#0d0f15] px-4 py-2 rounded-xl border border-white/10">
          <Bookmark className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-xs text-slate-300 font-tajawal">
            {t.podcasts.savedTitle}: <strong className="text-white font-mono">{savedPodcastIds.length}</strong>
          </span>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0082A6]/30 via-[#0d0f15] to-[#c8a44e]/30 border border-white/10 p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-right max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0082A6]/20 text-[#38bdf8] text-xs font-bold font-tajawal border border-[#0082A6]/30">
            <Sparkles className="w-3.5 h-3.5" />
            {t.hero.exclusive}
          </span>
          <h2 className="font-tajawal font-black text-2xl sm:text-3xl text-white leading-tight">
            {t.podcasts.heroDesc}
          </h2>
        </div>

        {/* Quick Stats Pill Cards */}
        <div className="flex flex-wrap gap-4 shrink-0 font-tajawal">
          <div className="bg-black/50 backdrop-blur-md px-5 py-4 rounded-xl border border-white/10 flex flex-col items-center">
            <span className="text-2xl font-black text-[#c8a44e] font-mono">6+</span>
            <span className="text-xs text-slate-400">{t.podcasts.statsPrograms}</span>
          </div>
          <div className="bg-black/50 backdrop-blur-md px-5 py-4 rounded-xl border border-white/10 flex flex-col items-center">
            <span className="text-2xl font-black text-[#0082A6] font-mono">150+</span>
            <span className="text-xs text-slate-400">{t.podcasts.statsEpisodes}</span>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 font-tajawal">
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={t.podcasts.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d0f15] border border-white/15 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#0082A6] transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0082A6] text-white shadow-lg shadow-[#0082A6]/30'
                  : 'bg-[#0d0f15] text-slate-400 border border-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Podcast Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPodcasts.map((podcast) => (
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

    </div>
  );
};

export default PodcastsPage;
