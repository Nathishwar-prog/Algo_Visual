/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { allTopics } from './data/topics/catalog';
import { arrayLessons, arrayTopic } from './data/topics/arrays';
import { LessonViewer } from './components/learning/LessonViewer';
import { TopicPageView } from './components/learning/TopicPageView';
import { DashboardView } from './components/dashboard/DashboardView';
import { TopBar } from './components/navigation/TopBar';
import { GlobalSearchModal } from './components/navigation/GlobalSearchModal';
import { InteractiveLab } from './components/visualizer/InteractiveLab';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'topic' | 'lesson'>('dashboard');
  const [activeTopicId, setActiveTopicId] = useState<string>('arrays');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>(['what-is-an-array']);
  const [isLabOpen, setIsLabOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global ⌘K / Ctrl+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeTopic = allTopics.find((t) => t.id === activeTopicId) || arrayTopic;
  const activeLesson = activeLessonId ? arrayLessons[activeLessonId] : null;

  const handleSelectTopic = (topicId: string) => {
    setActiveTopicId(topicId);
    setCurrentView('topic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchLesson = (lessonId: string) => {
    if (arrayLessons[lessonId]) {
      setActiveLessonId(lessonId);
      setActiveTopicId('arrays');
      setCurrentView('lesson');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If user selected another topic's preview lesson, default to arrays indexing
      setActiveLessonId('array-indexing');
      setActiveTopicId('arrays');
      setCurrentView('lesson');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCompleteLesson = (lessonId: string) => {
    setCompletedLessons((prev) => (prev.includes(lessonId) ? prev : [...prev, lessonId]));
  };

  const handleBackToTopic = () => {
    setCurrentView('topic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 flex flex-col font-sans selection:bg-purple-200 selection:text-purple-950">
      {/* Strict 3-Zone Top Bar Navigation with Global Search */}
      <TopBar
        currentView={currentView}
        activeTopicId={activeTopicId}
        onNavigateHome={handleNavigateHome}
        onSelectTopic={handleSelectTopic}
        onOpenQuickDemo={() => setIsLabOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Switcher */}
      <div className="flex-1 flex flex-col">
        {currentView === 'lesson' && activeLesson ? (
          <LessonViewer
            lesson={activeLesson}
            onBack={handleBackToTopic}
            onCompleteLesson={handleCompleteLesson}
          />
        ) : currentView === 'topic' ? (
          <TopicPageView
            topic={activeTopic}
            completedLessons={completedLessons}
            onSelectLesson={handleLaunchLesson}
            onBackToDashboard={handleNavigateHome}
          />
        ) : (
          <DashboardView
            topics={allTopics}
            completedLessons={completedLessons}
            onSelectTopic={handleSelectTopic}
            onLaunchLesson={handleLaunchLesson}
          />
        )}
      </div>

      {/* Global Search & Command Palette Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTopic={handleSelectTopic}
        onSelectLesson={handleLaunchLesson}
      />

      {/* Interactive Algorithm Sandbox Modal */}
      {isLabOpen && <InteractiveLab onClose={() => setIsLabOpen(false)} />}

      {/* Clean Minimalist Footer with Vibrant Purple accents */}
      <footer className="mt-auto border-t border-purple-100 bg-white py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8400ff] to-[#a855f7]">
              AlgoVisual
            </span>
            <span aria-hidden="true">·</span>
            <span>Interactive Data Structures & Algorithms Learning Engine</span>
          </div>

          <div className="flex items-center gap-3 text-purple-900/80 font-medium">
            <span>Contiguous Memory</span>
            <span aria-hidden="true">·</span>
            <span>Two Pointers</span>
            <span aria-hidden="true">·</span>
            <span>Sliding Window</span>
            <span aria-hidden="true">·</span>
            <span>Kadane's Algorithm</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
