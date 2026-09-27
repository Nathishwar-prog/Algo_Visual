import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Sparkles, Brain, AlertCircle, Compass, Code, Cpu } from 'lucide-react';
import { LessonStep } from '../../types/learning';
import { LearningCheckpoint } from './LearningCheckpoint';
import { MemoryHookBanner } from './MemoryHookBanner';

interface ExplanationPanelProps {
  step: LessonStep;
  totalSteps: number;
}

export const ExplanationPanel: React.FC<ExplanationPanelProps> = ({
  step,
  totalSteps,
}) => {
  const getPhaseBadge = () => {
    switch (step.phase) {
      case 'problem':
        return { label: '1. The Problem', color: 'bg-purple-100 text-[#8400ff] border-purple-200' };
      case 'observe':
        return { label: '2. Observation', color: 'bg-sky-100 text-sky-800 border-sky-200' };
      case 'think':
        return { label: '3. Pause & Think', color: 'bg-amber-100 text-amber-900 border-amber-200' };
      case 'brute-force':
        return { label: '4. Brute Force Motivation', color: 'bg-rose-100 text-rose-800 border-rose-200' };
      case 'discovery':
        return { label: '5. Pattern Discovery', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
      case 'setup':
        return { label: '6. Strategic Setup', color: 'bg-purple-100 text-[#8400ff] border-purple-200' };
      case 'calculation':
      case 'decision':
        return { label: '7. Decision Reasoning', color: 'bg-emerald-100 text-emerald-900 border-emerald-200' };
      case 'action':
        return { label: '8. Step Execution', color: 'bg-purple-100 text-purple-950 border-purple-200' };
      case 'code':
        return { label: '9. Code Synchronization', color: 'bg-slate-100 text-slate-800 border-slate-200' };
      case 'complexity':
        return { label: '10. Complexity Analysis', color: 'bg-emerald-100 text-emerald-900 border-emerald-200' };
      case 'mistakes':
        return { label: '11. Common Mistakes ("Watch Out!")', color: 'bg-rose-100 text-rose-800 border-rose-200' };
      case 'summary':
        return { label: '12. Key Takeaway & Mental Model', color: 'bg-purple-100 text-[#8400ff] border-purple-200' };
      default:
        return null;
    }
  };

  const phaseBadge = getPhaseBadge();

  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col bg-white rounded-2xl border border-purple-200/90 p-4 sm:p-5 shadow-xs"
    >
      {/* Step Header & Phase */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#8400ff] font-mono flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8400ff]" />
          Step {step.id} of {totalSteps}
        </span>

        {phaseBadge && (
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${phaseBadge.color}`}>
            {phaseBadge.label}
          </span>
        )}
      </div>

      {/* Step Title */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-2">
        {step.title}
      </h3>

      {/* Main explanation prose */}
      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
        {step.explanation}
      </p>

      {/* Math formula if present */}
      {step.formula && (
        <div className="mb-4 px-3.5 py-2 rounded-xl bg-purple-50/60 border border-purple-200/80 font-mono text-xs text-purple-950 font-semibold shadow-2xs">
          <span className="text-purple-400 select-none mr-2 font-bold">fx</span>
          {step.formula}
        </div>
      )}

      {/* Interactive Checkpoint if present */}
      {step.checkpoint && (
        <div className="my-2">
          <LearningCheckpoint checkpoint={step.checkpoint} />
        </div>
      )}

      {/* Memory Hook if present */}
      {step.memoryHook && (
        <div className="my-2">
          <MemoryHookBanner hook={step.memoryHook} />
        </div>
      )}

      {/* Key Idea Callout Box */}
      <div className="mt-auto p-3.5 rounded-xl bg-gradient-to-r from-purple-50/90 via-purple-50/40 to-white border border-purple-200/90 flex items-start gap-2.5 shadow-2xs">
        <div className="p-1 rounded-lg bg-white border border-purple-200 text-[#8400ff] shadow-2xs shrink-0 mt-0.5">
          <Lightbulb className="w-3.5 h-3.5" />
        </div>
        <div>
          <span className="text-xs font-bold text-purple-950 block mb-0.5">
            Key Teacher Insight
          </span>
          <span className="text-xs text-purple-900/90 leading-snug block font-medium">
            {step.keyIdea}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
