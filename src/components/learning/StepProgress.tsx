import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import { LessonStep } from '../../types/learning';

interface StepProgressProps {
  steps: LessonStep[];
  currentStepIndex: number;
  onStepSelect: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  isChallengeActive: boolean;
  onToggleChallenge: () => void;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  currentStepIndex,
  onStepSelect,
  onNext,
  onPrev,
  isPlaying,
  onTogglePlay,
  onReset,
  isChallengeActive,
  onToggleChallenge,
}) => {
  const isFirstStep = currentStepIndex === 0 && !isChallengeActive;
  const isLastStep = currentStepIndex === steps.length - 1;

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Playback & Reset controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onTogglePlay}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          title={isPlaying ? 'Pause Auto-play (P)' : 'Start Auto-play (P)'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
              <span>Play</span>
            </>
          )}
        </button>

        <button
          onClick={onReset}
          className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
          title="Reset to step 1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <div className="hidden md:flex items-center gap-1 text-[11px] font-mono text-slate-400 pl-2 border-l border-slate-200">
          <span>Space: Next</span>
          <span>·</span>
          <span>Esc: Exit</span>
        </div>
      </div>

      {/* Step Dots & Progress */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {steps.map((step, idx) => {
          const isActive = currentStepIndex === idx && !isChallengeActive;
          const isPassed = idx < currentStepIndex && !isChallengeActive;

          return (
            <button
              key={step.id}
              onClick={() => {
                if (isChallengeActive) onToggleChallenge();
                onStepSelect(idx);
              }}
              title={`Step ${idx + 1}: ${step.title}`}
              className="group relative py-1 px-1 cursor-pointer focus:outline-none"
            >
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-7 sm:w-8 bg-gradient-to-r from-[#8400ff] to-[#a855f7] ring-2 ring-purple-200'
                    : isPassed
                    ? 'w-2.5 sm:w-3 bg-purple-300 hover:bg-purple-400'
                    : 'w-2 sm:w-2.5 bg-slate-200 hover:bg-purple-200'
                }`}
              />
            </button>
          );
        })}

        {/* Mini Challenge Step indicator */}
        <button
          onClick={onToggleChallenge}
          title="Mini Challenge"
          className="group relative py-1 px-1 cursor-pointer focus:outline-none ml-1"
        >
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              isChallengeActive
                ? 'w-7 sm:w-8 bg-emerald-600 ring-2 ring-emerald-200'
                : 'w-2.5 sm:w-3 bg-slate-200 hover:bg-emerald-300'
            }`}
          />
        </button>
      </div>

      {/* Navigation Buttons: Previous & Next */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={isFirstStep}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
            isFirstStep
              ? 'border-slate-100 text-slate-300 cursor-not-allowed bg-slate-50/50'
              : 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        {isLastStep && !isChallengeActive ? (
          <button
            onClick={onToggleChallenge}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#8400ff] to-[#a855f7] hover:from-[#7300e0] hover:to-[#9333ea] shadow-sm shadow-purple-300 transition-all cursor-pointer hover:scale-[1.02]"
          >
            <span>Challenge</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={isChallengeActive}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isChallengeActive
                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#8400ff] to-[#a855f7] hover:from-[#7300e0] hover:to-[#9333ea] text-white shadow-sm shadow-purple-300 hover:scale-[1.02]'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
