import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Sparkles, CheckCircle2, Search, CheckSquare, Layers, BookCheck } from 'lucide-react';
import { Topic, LessonMeta } from '../../types/learning';
import { LessonCard } from './LessonCard';
import { PatternCard } from './PatternCard';
import { PatternRecognitionChecklist } from './PatternRecognitionChecklist';
import { PatternComparison } from './PatternComparison';
import { PatternCheatSheet } from './PatternCheatSheet';

interface TopicPageViewProps {
  topic: Topic;
  completedLessons: string[];
  onSelectLesson: (lessonId: string) => void;
  onBackToDashboard: () => void;
}

export const TopicPageView: React.FC<TopicPageViewProps> = ({
  topic,
  completedLessons,
  onSelectLesson,
  onBackToDashboard,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'patterns' | 'concepts' | 'cheatsheet'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const totalLessons = topic.concepts.length + topic.patterns.length;
  const completedCount = [...topic.concepts, ...topic.patterns].filter((l) =>
    completedLessons.includes(l.id)
  ).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Patterns progress
  const patternCompletedCount = topic.patterns.filter((p) => completedLessons.includes(p.id)).length;
  const patternProgressPercent = Math.round((patternCompletedCount / topic.patterns.length) * 100);

  const filterList = (list: LessonMeta[]) => {
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q) ||
        (item.whenToUse && item.whenToUse.toLowerCase().includes(q))
    );
  };

  const filteredConcepts = filterList(topic.concepts);
  const filteredPatterns = filterList(topic.patterns);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Top Breadcrumb & Back */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-200 bg-white text-xs font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-900 transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Curriculum Overview</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <span className="font-semibold text-slate-800">{completedCount}</span>
          <span>of {totalLessons} completed ({progressPercent}%)</span>
        </div>
      </div>

      {/* Topic Hero Header with Vibrant Purple Gradient Accents */}
      <div className="bg-gradient-to-br from-white via-purple-50/40 to-violet-50/30 rounded-3xl border border-purple-200/90 p-6 sm:p-8 mb-8 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-bl from-purple-200/30 via-violet-100/20 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#8400ff] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8400ff]" />
            <span>Data Structure Module</span>
            <span aria-hidden="true">·</span>
            <span>{totalLessons} Interactive Lessons</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2.5">
            {topic.title}{' '}
            <span className="bg-gradient-to-r from-[#8400ff] to-[#a855f7] bg-clip-text text-transparent">
              Mastery & Patterns
            </span>
          </h1>

          <p className="text-base text-slate-600 leading-relaxed mb-6 max-w-2xl">
            {topic.tagline}
          </p>

          {/* Progress Bar & Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t border-purple-100/80">
            <div className="flex-1 max-w-xs">
              <div className="flex items-center justify-between text-xs text-slate-600 font-medium mb-1.5">
                <span>Total Progress</span>
                <span className="font-mono text-[#8400ff] font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-purple-100/70 rounded-full h-2.5 overflow-hidden p-0.5">
                <div
                  style={{ width: `${progressPercent}%` }}
                  className="h-full bg-gradient-to-r from-[#8400ff] via-[#a855f7] to-[#c084fc] rounded-full transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-600 font-medium sm:ml-auto">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-purple-100 shadow-2xs">
                <BookOpen className="w-4 h-4 text-[#8400ff]" />
                <span className="font-semibold">{topic.concepts.length} Concepts</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-purple-100 shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#a855f7]" />
                <span className="font-semibold">{topic.patterns.length} Core Patterns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LEARNING PROGRESSION BANNER FOR ARRAY PATTERNS */}
      <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950 via-[#2e0854] to-[#4c1d95] text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-300 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#c084fc]" />
            <span>ARRAY PATTERNS MASTERY TRACK</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            {patternCompletedCount} of {topic.patterns.length} Patterns Completed
          </h3>
          <p className="text-xs text-purple-200 mt-0.5">
            Master these 7 patterns to solve 85%+ of array-based technical interview questions.
          </p>
        </div>

        <div className="flex items-center gap-4 min-w-[200px]">
          <div className="w-full">
            <div className="flex justify-between text-xs font-mono text-purple-200 mb-1">
              <span>Track Progress</span>
              <span>{patternProgressPercent}%</span>
            </div>
            <div className="w-full bg-purple-900/60 rounded-full h-2.5 p-0.5 border border-purple-500/30 overflow-hidden">
              <div
                style={{ width: `${patternProgressPercent}%` }}
                className="h-full bg-gradient-to-r from-[#c084fc] to-[#e9d5ff] rounded-full transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar: Interactive buttons + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-1 p-1 bg-purple-50/80 border border-purple-100 rounded-xl w-fit overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-white text-purple-950 shadow-xs border border-purple-200/60 font-bold'
                : 'text-slate-600 hover:text-purple-900'
            }`}
          >
            All ({totalLessons})
          </button>
          <button
            onClick={() => setActiveTab('patterns')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'patterns'
                ? 'bg-white text-purple-950 shadow-xs border border-purple-200/60 font-bold'
                : 'text-slate-600 hover:text-purple-900'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#8400ff]" />
            <span>7 Patterns</span>
          </button>
          <button
            onClick={() => setActiveTab('concepts')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'concepts'
                ? 'bg-white text-purple-950 shadow-xs border border-purple-200/60 font-bold'
                : 'text-slate-600 hover:text-purple-900'
            }`}
          >
            Concepts ({topic.concepts.length})
          </button>
          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'cheatsheet'
                ? 'bg-white text-purple-950 shadow-xs border border-purple-200/60 font-bold'
                : 'text-slate-600 hover:text-purple-900'
            }`}
          >
            <BookCheck className="w-3 h-3 text-[#8400ff]" />
            <span>Cheat Sheet</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
          <input
            type="text"
            placeholder="Search patterns or clues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-purple-200/80 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#8400ff] focus:ring-1 focus:ring-purple-200 shadow-2xs"
          />
        </div>
      </div>

      {/* DEDICATED SECTION 1: ARRAY PROBLEM-SOLVING PATTERNS (7 PATTERNS) */}
      {(activeTab === 'all' || activeTab === 'patterns') && filteredPatterns.length > 0 && (
        <section className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 pb-3 border-b border-purple-100 gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#8400ff] mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Core Algorithmic Blueprints</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                ARRAY PROBLEM-SOLVING PATTERNS
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                The 7 foundational mental models to transform brute-force O(n²) solutions into optimal O(n) implementations.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
              {filteredPatterns.length} of 7 Patterns
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPatterns.map((pattern) => (
              <PatternCard
                key={pattern.id}
                pattern={pattern}
                isCompleted={completedLessons.includes(pattern.id)}
                onSelect={() => onSelectLesson(pattern.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* DEDICATED SECTION 2: HOW DO I RECOGNIZE THIS PATTERN? */}
      {(activeTab === 'all' || activeTab === 'patterns') && (
        <PatternRecognitionChecklist onSelectPattern={onSelectLesson} />
      )}

      {/* DEDICATED SECTION 3: KNOW THE DIFFERENCE (INTERACTIVE COMPARISON) */}
      {(activeTab === 'all' || activeTab === 'patterns') && (
        <PatternComparison onSelectPattern={onSelectLesson} />
      )}

      {/* DEDICATED SECTION 4: PATTERN CHEAT SHEET */}
      {(activeTab === 'all' || activeTab === 'patterns' || activeTab === 'cheatsheet') && (
        <PatternCheatSheet onSelectPattern={onSelectLesson} />
      )}

      {/* CONCEPTS SECTION */}
      {(activeTab === 'all' || activeTab === 'concepts') && filteredConcepts.length > 0 && (
        <section className="mb-14">
          <div className="flex items-baseline justify-between mb-4 border-b border-purple-100 pb-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Fundamental Array Concepts
              </h2>
              <p className="text-xs text-slate-500">
                Core mental models, memory mechanics, and operations.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {filteredConcepts.length} modules
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredConcepts.map((concept) => (
              <LessonCard
                key={concept.id}
                lesson={concept}
                isCompleted={completedLessons.includes(concept.id)}
                onSelect={() => onSelectLesson(concept.id)}
              />
            ))}
          </div>
        </section>
      )}

      {filteredConcepts.length === 0 && filteredPatterns.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-purple-200">
          <p className="text-sm font-semibold text-slate-700">
            No patterns or concepts match "{searchQuery}"
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-2 text-xs font-semibold text-[#8400ff] hover:underline cursor-pointer"
          >
            Clear search filter
          </button>
        </div>
      )}
    </div>
  );
};

