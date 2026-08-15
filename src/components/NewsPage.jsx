import React, { useState } from 'react';
import { Newspaper, Search, ArrowRight, Share2, Eye, X } from 'lucide-react';
import { realNewsArticles } from '../data/newsData';
import { translations } from '../data/translations';

const NewsPage = ({ onBackToHome, lang = 'ar' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const t = translations[lang] || translations.ar;

  const filteredArticles = realNewsArticles.filter((item) =>
    item.title.includes(searchQuery) || item.summary.includes(searchQuery)
  );

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
            <Newspaper className="w-5 h-5 text-[#0082A6]" />
            <h1 className="font-tajawal font-black text-2xl text-white">{t.news.pageTitle}</h1>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder={t.news.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#0d0f15] border border-white/15 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#0082A6] transition-all font-tajawal"
        />
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <div 
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="flex flex-col gap-4 group cursor-pointer bg-[#0d0f15] p-5 rounded-2xl border border-white/10 hover:border-white/25 transition-all justify-between"
          >
            <div className="space-y-4">
              <div className="relative w-full h-48 rounded-xl overflow-hidden bg-black/40 border border-white/10">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded text-white text-[10px] font-bold font-tajawal shadow-md ${article.categoryBg}`}>
                  {article.category}
                </span>
              </div>

              <div className="flex flex-col gap-2 text-right font-montserrat">
                <span className="text-[10px] text-slate-400 font-roboto">{article.time} · {article.date}</span>
                <h3 className="text-base font-bold text-white group-hover:text-[#38BDF8] transition-colors leading-snug font-tajawal">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-400 font-poppins line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#38BDF8] font-bold font-tajawal">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{t.news.readCoverage}</span>
              </span>
              <span className="text-[10px] text-slate-500 font-roboto">{article.source}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Article Full Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0d0f15] border border-white/20 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 text-right relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 left-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <span className={`inline-block px-3 py-1 rounded text-white text-xs font-bold font-tajawal ${selectedArticle.categoryBg}`}>
              {selectedArticle.category}
            </span>

            <h2 className="font-tajawal font-black text-xl sm:text-2xl text-white leading-snug">
              {selectedArticle.title}
            </h2>

            <div className="flex items-center justify-between text-xs text-slate-400 border-y border-white/10 py-3 font-roboto">
              <span>{selectedArticle.time} · {selectedArticle.date}</span>
              <span>{t.news.officialSource}</span>
            </div>

            <img 
              src={selectedArticle.image} 
              alt={selectedArticle.title} 
              className="w-full h-72 object-cover rounded-2xl border border-white/15" 
            />

            <p className="text-slate-200 text-sm font-poppins leading-relaxed whitespace-pre-line">
              {selectedArticle.summary}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/10 font-tajawal">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-xl bg-[#0082A6] text-white text-xs font-bold"
              >
                {t.news.close}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-slate-200 text-xs font-bold">
                <Share2 className="w-4 h-4" />
                <span>{t.news.share}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default NewsPage;
