import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, Zap, CheckCircle2, RotateCcw, AlertTriangle, CheckSquare, TrendingUp, Sparkles } from 'lucide-react';
import { Lesson } from '../../types/learning';
import { VisualArray } from '../visualization/VisualArray';
import { CodePanel } from '../code/CodePanel';
import { ExplanationPanel } from './ExplanationPanel';
import { StepProgress } from './StepProgress';
import { MiniChallengeView } from './MiniChallengeView';

interface LessonViewerProps {
  lesson: Lesson;
  onBack: () => void;
  onCompleteLesson?: (lessonId: string) => void;
}

type LessonTab = 'walkthrough' | 'checklist' | 'mistakes' | 'optimization';

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  onBack,
  onCompleteLesson,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isChallengeActive, setIsChallengeActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState<LessonTab>('walkthrough');

  const steps = lesson.steps;
  const currentStep = steps[currentStepIndex];

  // Auto-play timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && !isChallengeActive && activeTab === 'walkthrough') {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            setIsChallengeActive(true);
            return prev;
          }
        });
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, isChallengeActive, steps.length, activeTab]);

  const handleNext = useCallback(() => {
    if (isChallengeActive) return;
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsChallengeActive(true);
    }
  }, [currentStepIndex, steps.length, isChallengeActive]);

  const handlePrev = useCallback(() => {
    if (isChallengeActive) {
      setIsChallengeActive(false);
    } else if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  }, [currentStepIndex, isChallengeActive]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'walkthrough') return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onBack();
      } else if (e.key.toLowerCase() === 'p') {
        setIsPlaying((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onBack, activeTab]);

  const handleChallengeComplete = () => {
    setIsCompleted(true);
    if (onCompleteLesson) {
      onCompleteLesson(lesson.id);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setIsChallengeActive(false);
    setIsCompleted(false);
    setIsPlaying(false);
    setActiveTab('walkthrough');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-between p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* 1. TOP BAR */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-purple-100">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-200 bg-white text-xs font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-900 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          {/* Breadcrumbs with clean unboxed typography */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="text-slate-800 font-semibold capitalize">
              {lesson.topicId}
            </span>
            <span aria-hidden="true" className="text-slate-300">
              /
            </span>
            <span className="capitalize">{lesson.category}s</span>
            <span aria-hidden="true" className="text-slate-300">
              /
            </span>
            <span className="text-purple-900 font-bold truncate max-w-[200px] sm:max-w-none">
              {lesson.patternNumber ? `[${lesson.patternNumber}] ` : ''}
              {lesson.title}
            </span>
          </div>
        </div>

        {/* Right side status & step indicator */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>{lesson.estimatedMinutes} min</span>
          </div>
          <span aria-hidden="true" className="text-slate-300">
            ·
          </span>
          <div className="flex items-center gap-1.5 font-semibold text-[#8400ff] bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 shadow-2xs">
            <Zap className="w-3 h-3 text-[#8400ff]" />
            <span>
              {isChallengeActive
                ? 'Mini Challenge'
                : `Step ${currentStepIndex + 1} of ${steps.length}`}
            </span>
          </div>
        </div>
      </header>

      {/* Lesson View Sub-Navigation Tabs */}
      <div className="my-4 flex items-center gap-1 p-1 bg-purple-50/70 border border-purple-100 rounded-xl w-fit overflow-x-auto">
        <button
          onClick={() => setActiveTab('walkthrough')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'walkthrough'
              ? 'bg-white text-purple-950 shadow-xs border border-purple-200 font-bold'
              : 'text-slate-600 hover:text-purple-900'
          }`}
        >
          Visual Walkthrough
        </button>

        {lesson.recognitionChecklist && (
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'checklist'
                ? 'bg-white text-purple-950 shadow-xs border border-purple-200 font-bold'
                : 'text-slate-600 hover:text-purple-900'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5 text-[#8400ff]" />
            <span>Recognition Checklist</span>
          </button>
        )}

        {lesson.bruteForceVsOptimized && (
          <button
            onClick={() => setActiveTab('optimization')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'optimization'
                ? 'bg-white text-purple-950 shadow-xs border border-purple-200 font-bold'
                : 'text-slate-600 hover:text-purple-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Brute Force → Optimization</span>
          </button>
        )}

        {lesson.commonMistakes && (
          <button
            onClick={() => setActiveTab('mistakes')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'mistakes'
                ? 'bg-white text-purple-950 shadow-xs border border-purple-200 font-bold'
                : 'text-slate-600 hover:text-purple-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
            <span>Common Mistakes ({lesson.commonMistakes.length})</span>
          </button>
        )}
      </div>

      {/* 2. MAIN CONTENT STAGE */}
      <main className="my-4 flex-1 flex flex-col gap-6">
        <AnimatePresence mode="wait">
          {isCompleted ? (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl border border-purple-200 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm my-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-emerald-50 text-[#8400ff] flex items-center justify-center mx-auto mb-5 border border-purple-200 shadow-xs">
                <CheckCircle2 className="w-8 h-8 text-[#8400ff]" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Pattern Mastered!
              </h2>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                You have mastered{' '}
                <span className="font-semibold text-purple-950">
                  {lesson.title}
                </span>
                . You now know the mental recognition clues, algorithmic mechanics, and in-place code implementation.
              </p>

              {/* Key Takeaways */}
              <div className="bg-purple-50/40 rounded-2xl p-5 text-left mb-6 border border-purple-100">
                <span className="text-xs font-bold font-mono uppercase text-purple-900 block mb-3">
                  Key Takeaways
                </span>
                <ul className="space-y-2 text-xs text-slate-700">
                  {lesson.takeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#8400ff] font-bold">✓</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Review Again
                </button>
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#8400ff] to-[#a855f7] hover:from-[#7300e0] hover:to-[#9333ea] rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Back to Curriculum
                </button>
              </div>
            </motion.div>
          ) : isChallengeActive ? (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-3xl mx-auto w-full my-auto"
            >
              <MiniChallengeView
                challenge={lesson.challenge}
                onComplete={handleChallengeComplete}
              />
            </motion.div>
          ) : activeTab === 'checklist' && lesson.recognitionChecklist ? (
            /* TAB: PATTERN RECOGNITION CHECKLIST */
            <motion.div
              key="checklist"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="bg-white rounded-2xl border border-purple-200 p-6 sm:p-8 max-w-3xl mx-auto w-full shadow-xs"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#8400ff] mb-2">
                <CheckSquare className="w-4 h-4" />
                <span>Pattern Recognition Diagnostic</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                How Do I Recognize {lesson.title}?
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Whenever you encounter a new DSA problem, ask yourself these diagnostic questions:
              </p>

              <div className="space-y-3 mb-8">
                {lesson.recognitionChecklist.map((question, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-100 flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#8400ff] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-xs font-medium text-slate-800 leading-snug">
                      {question}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-100/70 to-violet-50 border border-purple-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-purple-950 block">
                    Learning Insight
                  </span>
                  <span className="text-xs text-purple-900">
                    {lesson.learningInsight || 'Look for problem clues rather than memorizing code solutions.'}
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('walkthrough')}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#8400ff] hover:bg-[#7300e0] rounded-lg transition-colors shrink-0 ml-4 cursor-pointer"
                >
                  Resume Visuals
                </button>
              </div>
            </motion.div>
          ) : activeTab === 'optimization' && lesson.bruteForceVsOptimized ? (
            /* TAB: BRUTE FORCE VS OPTIMIZATION */
            <motion.div
              key="optimization"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="bg-white rounded-2xl border border-purple-200 p-6 sm:p-8 max-w-3xl mx-auto w-full shadow-xs"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>Algorithmic Optimization Journey</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Why Brute Force Fails & Why This Pattern Wins
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                {lesson.bruteForceVsOptimized.observation}
              </p>

              {/* Side by side comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50">
                  <span className="text-xs font-bold text-rose-800 uppercase font-mono block mb-1">
                    Brute Force Approach
                  </span>
                  <span className="text-2xl font-extrabold font-mono text-rose-700 block mb-2">
                    {lesson.bruteForceVsOptimized.bruteComplexity}
                  </span>
                  <p className="text-xs text-rose-900/80 leading-relaxed">
                    Evaluates redundant or impossible combinations, leading to exponential or quadratic bottlenecks on large arrays.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                  <span className="text-xs font-bold text-emerald-800 uppercase font-mono block mb-1">
                    Optimized Pattern
                  </span>
                  <span className="text-2xl font-extrabold font-mono text-emerald-700 block mb-2">
                    {lesson.bruteForceVsOptimized.optimizedComplexity}
                  </span>
                  <p className="text-xs text-emerald-900/80 leading-relaxed">
                    {lesson.bruteForceVsOptimized.explanation}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <button
                  onClick={() => setActiveTab('walkthrough')}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#8400ff] hover:bg-[#7300e0] rounded-xl transition-colors cursor-pointer"
                >
                  Back to Visual Simulation
                </button>
              </div>
            </motion.div>
          ) : activeTab === 'mistakes' && lesson.commonMistakes ? (
            /* TAB: COMMON MISTAKES */
            <motion.div
              key="mistakes"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="bg-white rounded-2xl border border-purple-200 p-6 sm:p-8 max-w-3xl mx-auto w-full shadow-xs"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-600 mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Avoid Interview Pitfalls</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Common Mistakes in {lesson.title}
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Candidates frequently stumble over these edge cases and logic traps:
              </p>

              <div className="space-y-4 mb-6">
                {lesson.commonMistakes.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2"
                  >
                    <div className="flex items-start gap-2 text-xs font-bold text-rose-700">
                      <span className="text-rose-500 font-bold shrink-0">❌</span>
                      <span>{item.mistake}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-slate-700 pl-4 border-l-2 border-emerald-500">
                      <span className="text-emerald-700 font-bold shrink-0">Fix:</span>
                      <span>{item.fix}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-right">
                <button
                  onClick={() => setActiveTab('walkthrough')}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#8400ff] hover:bg-[#7300e0] rounded-xl transition-colors cursor-pointer"
                >
                  Return to Visual Lesson
                </button>
              </div>
            </motion.div>
          ) : (
            /* DEFAULT: VISUAL WALKTHROUGH */
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              {/* Primary Visual Animation Canvas */}
              <VisualArray visualState={currentStep.visualization} />

              {/* Split Deck: Explanation + Synchronized Code */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                <ExplanationPanel
                  step={currentStep}
                  totalSteps={steps.length}
                />
                <CodePanel codeSnippet={currentStep.codeSnippet} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. BOTTOM CONTROLS & STEP PROGRESS */}
      {!isCompleted && activeTab === 'walkthrough' && (
        <footer className="pt-4">
          <StepProgress
            steps={steps}
            currentStepIndex={currentStepIndex}
            onStepSelect={(idx) => setCurrentStepIndex(idx)}
            onNext={handleNext}
            onPrev={handlePrev}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying((p) => !p)}
            onReset={handleRestart}
            isChallengeActive={isChallengeActive}
            onToggleChallenge={() => setIsChallengeActive((c) => !c)}
          />
        </footer>
      )}
    </div>
  );
};

