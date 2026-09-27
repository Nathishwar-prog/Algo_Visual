import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, BookOpen, Sparkles, LayoutGrid, ArrowRight, CornerDownLeft } from 'lucide-react';
import { allTopics } from '../../data/topics/catalog';
import { arrayTopic } from '../../data/topics/arrays';

interface SearchResultItem {
  id: string;
  topicId: string;
  title: string;
  subtitle: string;
  category: 'topic' | 'pattern' | 'concept' | 'algorithm';
  difficulty?: string;
  patternNumber?: string;
  keywords?: string[];
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic: (topicId: string) => void;
  onSelectLesson: (lessonId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTopic,
  onSelectLesson,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Compile all searchable items
  const allItems: SearchResultItem[] = [];

  // Add all topics
  allTopics.forEach((t) => {
    allItems.push({
      id: t.id,
      topicId: t.id,
      title: t.title,
      subtitle: t.tagline,
      category: 'topic',
      keywords: [t.title, t.tagline, t.description],
    });

    // Add concepts
    t.concepts.forEach((c) => {
      allItems.push({
        id: c.id,
        topicId: t.id,
        title: c.title,
        subtitle: `${t.title} Concept · ${c.shortDescription}`,
        category: 'concept',
        difficulty: c.difficulty,
        keywords: [c.title, c.shortDescription],
      });
    });

    // Add patterns
    t.patterns.forEach((p) => {
      allItems.push({
        id: p.id,
        topicId: t.id,
        title: p.title,
        subtitle: `${t.title} Pattern ${p.patternNumber ? `[${p.patternNumber}]` : ''} · ${p.shortDescription}`,
        category: 'pattern',
        difficulty: p.difficulty,
        patternNumber: p.patternNumber,
        keywords: [
          p.title,
          p.shortDescription,
          p.whenToUse || '',
          ...(p.commonProblemTypes || []),
        ],
      });
    });
  });

  const normalizedQuery = query.trim().toLowerCase();
  const filteredItems = normalizedQuery
    ? allItems.filter((item) => {
        if (item.title.toLowerCase().includes(normalizedQuery)) return true;
        if (item.subtitle.toLowerCase().includes(normalizedQuery)) return true;
        if (item.patternNumber && item.patternNumber.toLowerCase().includes(normalizedQuery)) return true;
        if (
          item.keywords &&
          item.keywords.some((k) => k.toLowerCase().includes(normalizedQuery))
        )
          return true;
        return false;
      })
    : allItems.slice(0, 10); // Quick suggestions when empty

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredItems[selectedIndex];
        if (selected) {
          handleSelect(selected);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  const handleSelect = (item: SearchResultItem) => {
    onClose();
    if (item.category === 'topic') {
      onSelectTopic(item.id);
    } else {
      onSelectLesson(item.id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-start justify-center p-4 pt-16 sm:pt-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        transition={{ duration: 0.15 }}
        className="w-full max-w-2xl bg-white rounded-2xl border border-purple-200 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-purple-100 bg-purple-50/30">
          <Search className="w-4 h-4 text-[#8400ff] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search topics, patterns (e.g. Two Pointers, Prefix Sum, Suffix Sum)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-purple-700 bg-purple-100/70 border border-purple-200 rounded">
              ESC
            </kbd>
          )}
        </div>

        {/* Quick Filter Badges */}
        <div className="px-4 py-2 border-b border-purple-100/70 bg-purple-50/40 flex items-center gap-1.5 overflow-x-auto text-[11px] font-medium text-slate-500 scrollbar-none">
          <span className="text-purple-800/80 font-bold shrink-0 text-[10px] uppercase font-mono">7 Patterns:</span>
          <button
            onClick={() => setQuery('Traversal & Frequency')}
            className="px-2 py-0.5 rounded-lg bg-white border border-purple-200 text-purple-900 hover:bg-purple-100 hover:border-purple-300 transition-colors whitespace-nowrap shadow-2xs text-[10px] font-semibold"
          >
            01 Traversal
          </button>
          <button
            onClick={() => setQuery('Two Pointers')}
            className="px-2 py-0.5 rounded-lg bg-white border border-purple-200 text-purple-900 hover:bg-purple-100 hover:border-purple-300 transition-colors whitespace-nowrap shadow-2xs text-[10px] font-semibold"
          >
            02 Two Pointers
          </button>
          <button
            onClick={() => setQuery('Slow-Fast')}
            className="px-2 py-0.5 rounded-lg bg-white border border-purple-200 text-purple-900 hover:bg-purple-100 hover:border-purple-300 transition-colors whitespace-nowrap shadow-2xs text-[10px] font-semibold"
          >
            03 Slow-Fast
          </button>
          <button
            onClick={() => setQuery('Sliding Window')}
            className="px-2 py-0.5 rounded-lg bg-white border border-purple-200 text-purple-900 hover:bg-purple-100 hover:border-purple-300 transition-colors whitespace-nowrap shadow-2xs text-[10px] font-semibold"
          >
            04 Sliding Window
          </button>
          <button
            onClick={() => setQuery('Prefix Sum')}
            className="px-2 py-0.5 rounded-lg bg-white border border-purple-200 text-purple-900 hover:bg-purple-100 hover:border-purple-300 transition-colors whitespace-nowrap shadow-2xs text-[10px] font-semibold"
          >
            05 Prefix Sum
          </button>
          <button
            onClick={() => setQuery('Suffix Sum')}
            className="px-2 py-0.5 rounded-lg bg-white border border-purple-200 text-purple-900 hover:bg-purple-100 hover:border-purple-300 transition-colors whitespace-nowrap shadow-2xs text-[10px] font-semibold"
          >
            06 Suffix Sum
          </button>
          <button
            onClick={() => setQuery('Prefix + Suffix')}
            className="px-2 py-0.5 rounded-lg bg-white border border-purple-200 text-purple-900 hover:bg-purple-100 hover:border-purple-300 transition-colors whitespace-nowrap shadow-2xs text-[10px] font-semibold"
          >
            07 Prefix + Suffix
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-50">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={`${item.category}-${item.id}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-50/90 text-purple-950 border border-purple-200/80 shadow-2xs'
                      : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0 pr-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        item.category === 'pattern'
                          ? 'bg-gradient-to-br from-[#8400ff] to-[#a855f7] text-white shadow-2xs'
                          : item.category === 'concept'
                          ? 'bg-purple-100 text-[#8400ff]'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.category === 'pattern' ? (
                        <Sparkles className="w-3.5 h-3.5" />
                      ) : item.category === 'concept' ? (
                        <BookOpen className="w-3.5 h-3.5" />
                      ) : (
                        <LayoutGrid className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        {item.patternNumber && (
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-purple-100 text-[#8400ff]">
                            {item.patternNumber}
                          </span>
                        )}
                        <h4 className="text-sm font-bold truncate">
                          {item.title}
                        </h4>
                        {item.difficulty && (
                          <span className="text-[10px] font-semibold text-slate-500 font-mono">
                            · {item.difficulty}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[11px] font-semibold capitalize px-2 py-0.5 rounded ${
                        item.category === 'pattern'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.category}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-slate-500">
              <Search className="w-6 h-6 mx-auto mb-2 text-slate-400" />
              <p className="text-sm font-semibold text-slate-700">No matching results found</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for "Two Pointers", "Sliding Window", or "Arrays"</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-mono">
              <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded">↑</kbd>
              <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded">↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1 font-mono">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded flex items-center gap-0.5">
                <CornerDownLeft className="w-2.5 h-2.5" />
              </kbd>
              select
            </span>
          </div>
          <span className="text-purple-700 font-medium font-mono">
            {filteredItems.length} results
          </span>
        </div>
      </motion.div>
    </div>
  );
};
