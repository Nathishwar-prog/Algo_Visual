import React, { useState } from 'react';
import { Sparkles, ArrowRight, Play, CheckCircle2, Search, Code2, Eye, Cpu } from 'lucide-react';
import { Topic } from '../../types/learning';
import { TopicCard } from '../learning/TopicCard';

interface DashboardViewProps {
  topics: Topic[];
  completedLessons: string[];
  onSelectTopic: (topicId: string) => void;
  onLaunchLesson: (lessonId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  topics,
  completedLessons,
  onSelectTopic,
  onLaunchLesson,
}) => {
  const [topicSearch, setTopicSearch] = useState('');

  const filteredTopics = topics.filter(
    (t) =>
      t.title.toLowerCase().includes(topicSearch.toLowerCase()) ||
      t.tagline.toLowerCase().includes(topicSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* 1. HERO SECTION */}
      <section className="mb-12 pt-4">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#8400ff] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#8400ff] animate-ping" />
            <span>Vibrant Visual Algorithm Curriculum</span>
            <span aria-hidden="true">·</span>
            <span>Zero Static Walls of Text</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] mb-4 text-balance text-slate-900">
            Understand DSA through{' '}
            <span className="bg-gradient-to-r from-[#8400ff] via-[#a855f7] to-[#c084fc] bg-clip-text text-transparent">
              step-by-step visual animations.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 max-w-2xl text-balance">
            Watch memory addresses compute, pointers converge, and sliding windows shift in real time synchronized with live code execution.
          </p>

          {/* Vibrant Color Template Bar */}
          <div className="mb-8 p-3 rounded-2xl bg-white border border-purple-100 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">
                Design Palette:
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-[#8400ff] shadow-2xs" title="#8400FF - Electric Violet" />
                <span className="w-5 h-5 rounded-md bg-[#a855f7] shadow-2xs" title="#A855F7 - Vibrant Purple" />
                <span className="w-5 h-5 rounded-md bg-[#c084fc] shadow-2xs" title="#C084FC - Lilac Glow" />
                <span className="w-5 h-5 rounded-md bg-[#e9d5ff] border border-purple-200" title="#E9D5FF - Soft Lavender" />
                <span className="w-5 h-5 rounded-md bg-[#faf5ff] border border-purple-200" title="#FAF5FF - Lavender Mist" />
              </div>
            </div>
            <div className="text-[11px] font-mono text-purple-700 font-medium">
              Vibrant High-Contrast Visual System
            </div>
          </div>

          {/* Quick Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <div className="p-3.5 rounded-xl bg-white border border-purple-100 hover:border-purple-300 hover:shadow-sm transition-all flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-purple-50 text-[#8400ff]">
                <Eye className="w-4 h-4 shrink-0" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block mb-0.5">
                  See the Mechanics
                </span>
                <span className="text-[11px] text-slate-500 leading-snug block">
                  Watch elements shift in RAM and pointers traverse boundaries.
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-purple-100 hover:border-purple-300 hover:shadow-sm transition-all flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-purple-50 text-[#a855f7]">
                <Code2 className="w-4 h-4 shrink-0" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block mb-0.5">
                  Code Synchronization
                </span>
                <span className="text-[11px] text-slate-500 leading-snug block">
                  Every visual frame highlights the exact executing source line.
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-purple-100 hover:border-purple-300 hover:shadow-sm transition-all flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-purple-50 text-[#8400ff]">
                <Cpu className="w-4 h-4 shrink-0" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block mb-0.5">
                  Interactive Practice
                </span>
                <span className="text-[11px] text-slate-500 leading-snug block">
                  Mini challenges after each lesson verify mental intuition.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURED SPOTLIGHT: ARRAYS TRACK WITH VIBRANT PURPLE GRADIENT */}
        <div className="bg-gradient-to-r from-[#20053b] via-[#3b0764] to-[#4c1d95] text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-purple-950/10 relative overflow-hidden border border-purple-500/20">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-gradient-to-br from-[#8400ff]/30 to-[#c084fc]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-300 font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#c084fc]" />
                <span>FEATURED TRACK · COMPLETE INTERACTIVE MODULE</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-white">
                Arrays & Core Problem-Solving Patterns
              </h2>

              <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed mb-4">
                Dive deep into 4 fundamental concepts and 4 high-frequency interview patterns: Two Pointers, Sliding Window, Prefix Sum, and Kadane's Algorithm.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onSelectTopic('arrays')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-purple-950 text-xs font-bold rounded-xl hover:bg-purple-50 transition-all shadow-md cursor-pointer hover:scale-[1.02]"
                >
                  <span>Explore Array Curriculum</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8400ff]" />
                </button>

                <button
                  onClick={() => onLaunchLesson('array-indexing')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8400ff] to-[#a855f7] hover:from-[#7300e0] hover:to-[#9333ea] text-white text-xs font-semibold rounded-xl border border-purple-400/40 transition-all cursor-pointer shadow-md shadow-purple-950/40 hover:scale-[1.02]"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Launch Array Indexing Demo</span>
                </button>
              </div>
            </div>

            {/* Miniature Array Animation Card on Hero */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-purple-300/30 p-4 max-w-sm w-full shadow-lg">
              <span className="text-[11px] font-mono text-purple-200 block mb-2 font-medium">
                Live Preview: Two Sum Convergence
              </span>
              <div className="flex items-center justify-center gap-1.5 py-3 bg-purple-950/60 rounded-xl mb-3 border border-purple-500/30">
                {[1, 3, 4, 6, 8, 11].map((val, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span
                      className={`w-7 h-7 rounded flex items-center justify-center font-mono text-xs font-bold ${
                        i === 2 || i === 3
                          ? 'bg-gradient-to-br from-[#8400ff] to-[#c084fc] text-white shadow-md shadow-purple-500/50'
                          : 'bg-white/10 text-white/80'
                      }`}
                    >
                      {val}
                    </span>
                    <span className="text-[9px] font-mono text-purple-300 mt-1 font-semibold">
                      {i === 2 ? 'L' : i === 3 ? 'R' : ''}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-[11px] text-purple-200 font-mono">
                <span>Sum = 4 + 6 = 10</span>
                <span className="text-[#c084fc] font-bold">Target Match!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CURRICULUM TOPICS CATALOG */}
      <section className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Curriculum Topics
            </h2>
            <p className="text-xs text-slate-500">
              Select a data structure to inspect interactive lessons and algorithmic patterns.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search topics..."
              value={topicSearch}
              onChange={(e) => setTopicSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-2xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTopics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              isSelected={topic.id === 'arrays'}
              onSelect={() => onSelectTopic(topic.id)}
              completedCount={
                topic.id === 'arrays'
                  ? [...topic.concepts, ...topic.patterns].filter((l) =>
                      completedLessons.includes(l.id)
                    ).length
                  : 0
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
};
