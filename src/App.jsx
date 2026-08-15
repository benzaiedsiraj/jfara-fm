import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NewsTicker from './components/NewsTicker';
import MainSection from './components/MainSection';
import PodcastsPage from './components/PodcastsPage';
import SchedulePage from './components/SchedulePage';
import NewsPage from './components/NewsPage';
import WeatherPage from './components/WeatherPage';
import SavedPodcastsPage from './components/SavedPodcastsPage';
import Footer from './components/Footer';
import CyberBackground from './components/CyberBackground';
import LiveVideoModal from './components/LiveVideoModal';
import { translations } from './data/translations';

/* ── Schedule data for computing live broadcast show ── */
const weekSchedule = {
  'الأحد': [{ start: '07:30', end: '10:00', title: 'صباح جفارة' }, { start: '10:30', end: '12:00', title: 'لقاء خاص' }, { start: '16:00', end: '17:30', title: 'أهل الخيل' }, { start: '18:00', end: '19:30', title: 'عشوية لايت' }],
  'الإثنين': [{ start: '07:30', end: '10:00', title: 'صباح جفارة' }, { start: '10:30', end: '12:00', title: 'لقاء خاص' }, { start: '16:00', end: '17:30', title: 'بنقردان اليوم' }, { start: '18:00', end: '19:30', title: 'خلّي بصمتك' }],
  'الثلاثاء': [{ start: '07:30', end: '10:00', title: 'صباح جفارة' }, { start: '10:30', end: '12:00', title: 'صحتك أولاً' }, { start: '16:00', end: '17:30', title: 'أهل الخيل' }, { start: '18:00', end: '19:30', title: 'عشوية لايت' }],
  'الأربعاء': [{ start: '07:30', end: '10:00', title: 'صباح جفارة' }, { start: '10:30', end: '12:00', title: 'لقاء خاص' }, { start: '16:00', end: '17:30', title: 'بنقردان اليوم' }, { start: '18:00', end: '19:30', title: 'خلّي بصمتك' }],
  'الخميس': [{ start: '07:30', end: '10:00', title: 'صباح جفارة' }, { start: '10:30', end: '12:00', title: 'لقاء خاص' }, { start: '16:00', end: '17:30', title: 'أهل الخيل' }, { start: '18:00', end: '19:30', title: 'عشوية لايت' }],
  'الجمعة': [{ start: '07:30', end: '10:00', title: 'صباح جفارة' }, { start: '10:30', end: '12:00', title: 'الجمعة المباركة' }, { start: '16:00', end: '17:30', title: 'بنقردان اليوم' }, { start: '18:00', end: '19:30', title: 'خلّي بصمتك' }],
  'السبت': [{ start: '08:00', end: '10:00', title: 'صباح الويكاند' }, { start: '10:30', end: '12:00', title: 'أهل الخيل' }, { start: '16:00', end: '18:00', title: 'عشوية لايت' }, { start: '18:00', end: '19:30', title: 'لقاء خاص' }]
};

const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

function timeToMinutes(str) {
  const [h, m] = str.split(':').map(Number);
  return h * 60 + m;
}

function getCurrentShowTitle(now) {
  const todayName = dayNames[now.getDay()];
  const todayShows = weekSchedule[todayName] || [];
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const current = todayShows.find(
    (s) => nowMinutes >= timeToMinutes(s.start) && nowMinutes < timeToMinutes(s.end)
  );
  return current ? current.title : null;
}

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.85);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'podcasts' | 'schedule' | 'news' | 'weather' | 'saved'
  const [lang, setLang] = useState('ar'); // 'ar' | 'fr' | 'en'
  const [isLiveVideoOpen, setIsLiveVideoOpen] = useState(false);
  const [currentShowTitle, setCurrentShowTitle] = useState(getCurrentShowTitle(new Date()));
  
  // Podcast playback state
  const [activePodcast, setActivePodcast] = useState(null);
  
  // Saved Podcasts IDs (Persisted in LocalStorage)
  const [savedPodcastIds, setSavedPodcastIds] = useState(() => {
    try {
      const stored = localStorage.getItem('jfara_saved_podcasts');
      return stored ? JSON.parse(stored) : ['p1', 'p2'];
    } catch {
      return ['p1', 'p2'];
    }
  });

  // Handle Language Change
  const handleChangeLang = (newLang) => {
    setLang(newLang);
    const dir = translations[newLang]?.dir || 'rtl';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', newLang);
  };

  useEffect(() => {
    try {
      localStorage.setItem('jfara_saved_podcasts', JSON.stringify(savedPodcastIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedPodcastIds]);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentShowTitle(getCurrentShowTitle(new Date()));
    }, 30000);
    return () => clearInterval(id);
  }, []);

  const handleToggleSave = (podcastId) => {
    setSavedPodcastIds((prev) =>
      prev.includes(podcastId)
        ? prev.filter((id) => id !== podcastId)
        : [...prev, podcastId]
    );
  };

  const handlePlayPodcast = (podcast) => {
    if (activePodcast?.id === podcast.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActivePodcast(podcast);
      setIsPlaying(true);
    }
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-surface text-white flex flex-col justify-between overflow-x-hidden selection:bg-[#0082A6] selection:text-white transition-colors duration-500">
      {/* Animated Topology Wireframe & Rotating Globe Background */}
      <CyberBackground theme="dark" />

      {/* Main Header Bar */}
      <Header
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentView={currentView}
        onNavigate={handleNavigate}
        savedCount={savedPodcastIds.length}
        lang={lang}
        onChangeLang={handleChangeLang}
      />

      {/* Breaking News Ticker with Jfara FM Logo Separator Nodes */}
      <NewsTicker lang={lang} />

      {/* Editorial Broadcast Main Portal Views */}
      <main className="flex-grow relative z-10">
        {currentView === 'home' && (
          <MainSection
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            onNavigate={handleNavigate}
            onPlayPodcast={handlePlayPodcast}
            activePodcastId={activePodcast?.id}
            savedPodcastIds={savedPodcastIds}
            onToggleSave={handleToggleSave}
            lang={lang}
            onOpenLiveVideo={() => setIsLiveVideoOpen(true)}
          />
        )}

        {currentView === 'podcasts' && (
          <PodcastsPage
            onBackToHome={() => handleNavigate('home')}
            activePodcastId={activePodcast?.id}
            isPlaying={isPlaying}
            onPlayPodcast={handlePlayPodcast}
            savedPodcastIds={savedPodcastIds}
            onToggleSave={handleToggleSave}
            lang={lang}
          />
        )}

        {currentView === 'schedule' && (
          <SchedulePage onBackToHome={() => handleNavigate('home')} lang={lang} />
        )}

        {currentView === 'news' && (
          <NewsPage onBackToHome={() => handleNavigate('home')} lang={lang} />
        )}

        {currentView === 'weather' && (
          <WeatherPage onBackToHome={() => handleNavigate('home')} lang={lang} />
        )}

        {currentView === 'saved' && (
          <SavedPodcastsPage
            onBackToHome={() => handleNavigate('home')}
            savedPodcastIds={savedPodcastIds}
            onToggleSave={handleToggleSave}
            onPlayPodcast={handlePlayPodcast}
            activePodcastId={activePodcast?.id}
            isPlaying={isPlaying}
            lang={lang}
          />
        )}
      </main>

      {/* Footer & Docked Audio Controller */}
      <Footer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        volume={volume}
        setVolume={setVolume}
        currentShowTitle={currentShowTitle}
        activePodcast={activePodcast}
        lang={lang}
        onOpenLiveVideo={() => setIsLiveVideoOpen(true)}
      />

      {/* Live Studio Video Stream Modal */}
      <LiveVideoModal
        isOpen={isLiveVideoOpen}
        onClose={() => setIsLiveVideoOpen(false)}
        currentShowTitle={currentShowTitle}
        lang={lang}
      />
    </div>
  );
}

export default App;
