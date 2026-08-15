import React from 'react';
import { Bookmark, ArrowRight, Trash2 } from 'lucide-react';
import { samplePodcasts } from '../data/podcastsData';
import PodcastCard from './PodcastCard';
import { translations } from '../data/translations';

const SavedPodcastsPage = ({ onBackToHome, savedPodcastIds, onToggleSave, onPlayPodcast, activePodcastId, isPlaying, lang = 'ar' }) => {
  const savedPodcasts = samplePodcasts.filter((p) => savedPodcastIds.includes(p.id));
  const t = translations[lang] || translations.ar;

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10 font-inter flex flex-col gap-10">
      
      {/* Header */}
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
            <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h1 className="font-tajawal font-black text-2xl text-white">{t.podcasts.savedTitle}</h1>
          </div>
        </div>

        <span className="text-xs text-slate-400 font-tajawal font-bold">
          {savedPodcasts.length} {t.podcasts.statsEpisodes}
        </span>
      </div>

      {savedPodcasts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedPodcasts.map((podcast) => (
            <PodcastCard
              key={podcast.id}
              podcast={podcast}
              isCurrent={activePodcastId === podcast.id}
              isPlaying={isPlaying && activePodcastId === podcast.id}
              onPlay={() => onPlayPodcast(podcast)}
              isSaved={true}
              onToggleSave={onToggleSave}
              lang={lang}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#0d0f15] rounded-3xl border border-white/10 space-y-4 font-tajawal max-w-lg mx-auto">
          <Bookmark className="w-14 h-14 text-slate-600 mx-auto" />
          <h3 className="text-xl font-bold text-white">{t.podcasts.noSavedText}</h3>
          <p className="text-xs text-slate-400 leading-relaxed px-6">
            {t.podcasts.noSavedDesc}
          </p>
        </div>
      )}

    </div>
  );
};

export default SavedPodcastsPage;
