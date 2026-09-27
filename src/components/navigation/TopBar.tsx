import React from 'react';
import { Sparkles, Search } from 'lucide-react';

interface TopBarProps {
  currentView: 'dashboard' | 'topic' | 'lesson';
  activeTopicId?: string;
  onNavigateHome: () => void;
  onSelectTopic: (topicId: string) => void;
  onOpenQuickDemo: () => void;
  onOpenSearch: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentView,
  activeTopicId,
  onNavigateHome,
  onSelectTopic,
  onOpenQuickDemo,
  onOpenSearch,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-purple-100 px-4 sm:px-6 lg:px-8 py-3.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={onNavigateHome}
          className="text-lg font-extrabold tracking-tight text-slate-900 hover:text-purple-700 transition-colors flex items-center gap-2 cursor-pointer focus:outline-none group shrink-0"
        >
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#8400ff] via-[#a855f7] to-[#c084fc] text-white flex items-center justify-center font-mono font-bold text-sm shadow-sm shadow-purple-300 group-hover:scale-105 transition-transform">
            A
          </span>
          <span className="bg-gradient-to-r from-slate-900 via-purple-950 to-purple-800 bg-clip-text text-transparent">
            AlgoVisual
          </span>
        </button>

        {/* Global Search Input Trigger in TopBar */}
        <button
          onClick={onOpenSearch}
          className="flex-1 max-w-sm hidden sm:flex items-center justify-between px-3 py-1.5 rounded-xl border border-purple-200/80 bg-purple-50/40 hover:bg-purple-50 text-slate-500 hover:text-slate-800 transition-all cursor-pointer shadow-2xs group"
          title="Search topics, patterns, or algorithms (⌘K)"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#8400ff]" />
            <span className="text-xs text-slate-500 group-hover:text-purple-950 font-medium">
              Search topics, patterns...
            </span>
          </div>
          <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-purple-700 bg-white border border-purple-200 rounded shadow-2xs">
            ⌘K
          </kbd>
        </button>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <button
            onClick={onNavigateHome}
            className={`hover:text-purple-700 transition-colors cursor-pointer ${
              currentView === 'dashboard' ? 'text-purple-600 font-bold' : ''
            }`}
          >
            Curriculum
          </button>
          <button
            onClick={() => onSelectTopic('arrays')}
            className={`hover:text-purple-700 transition-colors cursor-pointer ${
              currentView === 'topic' && activeTopicId === 'arrays'
                ? 'text-purple-600 font-bold'
                : ''
            }`}
          >
            Arrays
          </button>
          <button
            onClick={() => {
              onSelectTopic('arrays');
            }}
            className="hover:text-purple-700 transition-colors cursor-pointer"
          >
            7 Patterns
          </button>
          <button
            onClick={onOpenQuickDemo}
            className="hover:text-purple-700 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8400ff] animate-pulse" />
            <span>Interactive Lab</span>
          </button>
        </nav>

        {/* Zone 3: Actions + Mobile Search */}
        <div className="flex items-center gap-2">
          {/* Mobile search trigger button */}
          <button
            onClick={onOpenSearch}
            className="sm:hidden p-2 rounded-lg border border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenQuickDemo}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#8400ff] via-[#9333ea] to-[#a855f7] hover:from-[#7300e0] hover:to-[#9333ea] rounded-lg shadow-sm shadow-purple-300 transition-all hover:scale-[1.02] whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Lab</span>
          </button>
        </div>
      </div>
    </header>
  );
};


