import React from 'react';
import { ArrowRight, CheckCircle2, Lightbulb, Clock } from 'lucide-react';
import { LessonMeta } from '../../types/learning';

interface PatternCardProps {
  pattern: LessonMeta;
  isCompleted?: boolean;
  onSelect: () => void;
}

export const PatternCard: React.FC<PatternCardProps> = ({
  pattern,
  isCompleted = false,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className="group relative flex flex-col justify-between bg-white rounded-2xl border border-purple-100 p-5 sm:p-6 hover:border-[#a855f7] hover:ring-2 hover:ring-purple-100 hover:shadow-xl hover:shadow-purple-200/40 transition-all duration-200 cursor-pointer overflow-hidden hover:-translate-y-1"
    >
      <div>
        {/* Top Header: Pattern Number + Difficulty */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-sm font-extrabold font-mono text-[#8400ff] bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200/80">
            {pattern.patternNumber || '01'}
          </span>

          <div className="flex items-center gap-2">
            {isCompleted && (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Learned
              </span>
            )}

            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${
                pattern.difficulty === 'Beginner'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : pattern.difficulty === 'Easy'
                  ? 'bg-sky-50 text-sky-800 border-sky-200'
                  : 'bg-purple-50 text-purple-900 border-purple-200'
              }`}
            >
              {pattern.difficulty}
            </span>
          </div>
        </div>

        {/* Pattern Name */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#8400ff] transition-colors tracking-tight mb-1.5">
          {pattern.title}
        </h3>

        {/* Short One-Line Explanation */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {pattern.shortDescription}
        </p>

        {/* Visual Mini-Preview */}
        <div className="w-full h-20 rounded-xl bg-gradient-to-b from-purple-50/50 to-white border border-purple-100 p-2.5 mb-4 flex items-center justify-center overflow-hidden">
          {renderPatternPreview(pattern.id)}
        </div>

        {/* When to use hint */}
        {pattern.whenToUse && (
          <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100/90 text-xs text-purple-950 flex items-start gap-2 mb-4">
            <Lightbulb className="w-3.5 h-3.5 text-[#8400ff] shrink-0 mt-0.5" />
            <span className="text-[11px] leading-snug">
              <strong className="text-[#8400ff]">When to use: </strong>
              {pattern.whenToUse}
            </span>
          </div>
        )}

        {/* Common problem types */}
        {pattern.commonProblemTypes && pattern.commonProblemTypes.length > 0 && (
          <div className="mb-4">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-1.5 tracking-wider">
              Common Problems
            </span>
            <div className="flex flex-wrap gap-1.5">
              {pattern.commonProblemTypes.slice(0, 3).map((prob, i) => (
                <span
                  key={i}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600"
                >
                  {prob}
                </span>
              ))}
              {pattern.commonProblemTypes.length > 3 && (
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md text-slate-400">
                  +{pattern.commonProblemTypes.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-400 font-mono">
          <Clock className="w-3.5 h-3.5" />
          <span>{pattern.estimatedMinutes} min</span>
        </div>

        <span className="flex items-center gap-1 font-bold text-[#8400ff] group-hover:text-[#7300e0] group-hover:translate-x-1 transition-all">
          <span>Learn Pattern</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};

function renderPatternPreview(id: string) {
  switch (id) {
    case 'traversal-frequency-counting':
      return (
        <div className="flex flex-col items-center gap-1.5 w-full">
          <div className="flex items-center gap-1">
            {[2, 1, 2, 3, 1, 2].map((v, i) => (
              <span
                key={i}
                className={`w-6 h-6 rounded flex items-center justify-center font-mono text-[10px] font-bold border ${
                  i === 2
                    ? 'bg-[#8400ff] text-white border-purple-700 shadow-2xs scale-105'
                    : 'bg-white text-slate-700 border-purple-200'
                }`}
              >
                {v}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[9px] font-mono font-semibold text-purple-900 bg-purple-100/60 px-2 py-0.5 rounded">
            <span>2 → 3×</span>
            <span>·</span>
            <span>1 → 2×</span>
            <span>·</span>
            <span>3 → 1×</span>
          </div>
        </div>
      );

    case 'two-pointers':
      return (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 6, 8].map((v, i) => (
              <span
                key={i}
                className={`w-6 h-6 rounded flex items-center justify-center font-mono text-[10px] font-bold border ${
                  i === 0
                    ? 'bg-purple-100 border-[#8400ff] text-purple-950 ring-1 ring-purple-300'
                    : i === 5
                    ? 'bg-rose-50 border-rose-500 text-rose-950 ring-1 ring-rose-200'
                    : 'bg-white text-slate-700 border-purple-100'
                }`}
              >
                {v}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between w-full max-w-[160px] text-[8px] font-mono font-bold">
            <span className="text-[#8400ff]">left →</span>
            <span className="text-rose-600">← right</span>
          </div>
        </div>
      );

    case 'slow-fast-pointer':
      return (
        <div className="flex flex-col items-center gap-1 w-full">
          <div className="flex items-center justify-between w-full max-w-[170px] text-[8px] font-mono font-semibold">
            <span className="text-indigo-600">slow: 1 step</span>
            <span className="text-rose-600">fast: 2 steps</span>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5, 6].map((v, i) => (
              <div key={i} className="flex flex-col items-center">
                <span
                  className={`w-6 h-6 rounded flex items-center justify-center font-mono text-[9px] font-bold border ${
                    i === 1
                      ? 'bg-indigo-100 border-indigo-500 text-indigo-950'
                      : i === 3
                      ? 'bg-rose-100 border-rose-500 text-rose-950'
                      : 'bg-white text-slate-700 border-purple-100'
                  }`}
                >
                  {v}
                </span>
                <span className="text-[7px] font-mono font-bold mt-0.5">
                  {i === 1 ? 'S' : i === 3 ? 'F' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'sliding-window':
      return (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 relative">
            <div className="absolute inset-y-0 left-0 right-7 bg-purple-100/90 border border-[#a855f7] rounded-lg pointer-events-none" />
            {[1, 2, 3, 4, 5, 6].map((v, i) => (
              <span
                key={i}
                className={`w-6 h-6 rounded flex items-center justify-center font-mono text-[10px] font-bold relative z-10 ${
                  i <= 2 ? 'text-purple-950 font-extrabold' : 'text-slate-400'
                }`}
              >
                {v}
              </span>
            ))}
          </div>
          <span className="text-[9px] font-mono font-bold text-[#8400ff]">
            └─ WINDOW (size k) ─┘
          </span>
        </div>
      );

    case 'prefix-sum':
      return (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 text-[8px] font-mono text-slate-500">
            <span>Arr: [2, 4, 1, 3, 5]</span>
          </div>
          <div className="flex items-center gap-1">
            {[2, 6, 7, 10, 15].map((v, i) => (
              <span
                key={i}
                className={`w-6 h-5 rounded flex items-center justify-center font-mono text-[9px] font-bold border ${
                  i === 3
                    ? 'bg-gradient-to-br from-[#8400ff] to-[#a855f7] text-white border-purple-700'
                    : 'bg-purple-50 text-purple-900 border-purple-200'
                }`}
              >
                {v}
              </span>
            ))}
          </div>
          <span className="text-[8px] font-mono text-[#8400ff] font-bold">
            P[R] - P[L - 1] = O(1)
          </span>
        </div>
      );

    case 'suffix-sum':
      return (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 text-[8px] font-mono text-slate-500">
            <span>Right ← Left</span>
          </div>
          <div className="flex items-center gap-1">
            {[15, 13, 9, 8, 5].map((v, i) => (
              <span
                key={i}
                className={`w-6 h-5 rounded flex items-center justify-center font-mono text-[9px] font-bold border ${
                  i === 4
                    ? 'bg-gradient-to-bl from-rose-500 to-purple-600 text-white'
                    : 'bg-purple-50 text-purple-900 border-purple-200'
                }`}
              >
                {v}
              </span>
            ))}
          </div>
          <span className="text-[8px] font-mono text-rose-700 font-bold">
            suffix[i] = arr[i] + suffix[i+1]
          </span>
        </div>
      );

    case 'prefix-suffix':
      return (
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-2 text-[8px] font-mono">
            <span className="text-[#8400ff] font-bold">Left P: [3, 4, 6]</span>
            <span className="text-slate-400">·</span>
            <span className="text-rose-600 font-bold">Right S: [9, 4]</span>
          </div>
          <div className="flex items-center gap-1 py-0.5">
            {[3, 1, 2, 5, 4].map((v, i) => (
              <span
                key={i}
                className={`w-6 h-5 rounded flex items-center justify-center font-mono text-[9px] font-bold border ${
                  i === 2
                    ? 'bg-[#8400ff] text-white border-purple-700 ring-2 ring-purple-200'
                    : 'bg-white text-slate-700 border-purple-200'
                }`}
              >
                {v}
              </span>
            ))}
          </div>
          <span className="text-[8px] font-mono text-emerald-700 font-bold">
            Left Info + Right Info = Answer
          </span>
        </div>
      );

    default:
      return (
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4].map((v, i) => (
            <span
              key={i}
              className="w-6 h-6 rounded bg-purple-50 border border-purple-200 flex items-center justify-center font-mono text-[9px] font-semibold text-purple-900"
            >
              {v}
            </span>
          ))}
        </div>
      );
  }
}
