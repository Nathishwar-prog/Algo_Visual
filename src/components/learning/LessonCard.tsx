import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { LessonMeta } from '../../types/learning';

interface LessonCardProps {
  lesson: LessonMeta;
  isCompleted?: boolean;
  onSelect: () => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  isCompleted = false,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className="group relative flex flex-col justify-between bg-white rounded-2xl border border-purple-100/90 p-5 hover:border-[#a855f7] hover:ring-2 hover:ring-purple-100 hover:shadow-lg hover:shadow-purple-100/60 transition-all duration-200 cursor-pointer overflow-hidden hover:-translate-y-0.5"
    >
      <div>
        {/* Top unboxed metadata line with typographic separators */}
        <div className="flex items-center justify-between gap-2 mb-3 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                lesson.difficulty === 'Beginner' || lesson.difficulty === 'Easy'
                  ? 'bg-emerald-500'
                  : lesson.difficulty === 'Medium'
                  ? 'bg-[#a855f7]'
                  : 'bg-rose-500'
              }`}
            />
            <span className="font-semibold text-slate-700">
              {lesson.difficulty}
            </span>
            <span aria-hidden="true">·</span>
            <span>{lesson.estimatedMinutes} min</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{lesson.category}</span>
          </div>

          {isCompleted && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#8400ff] bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              <CheckCircle2 className="w-3 h-3 text-[#8400ff]" />
              Completed
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#8400ff] transition-colors tracking-tight mb-1.5">
          {lesson.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {lesson.shortDescription}
        </p>

        {/* Small Visual Miniature Preview with vibrant purple styling */}
        <div className="w-full h-14 rounded-xl bg-purple-50/40 border border-purple-100 p-2 mb-4 flex items-center justify-center overflow-hidden">
          {renderVisualPreview(lesson.visualPreviewType)}
        </div>
      </div>

      {/* Card Action Link */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#8400ff] group-hover:text-[#7300e0]">
        <span>
          {lesson.category === 'pattern' ? 'View Pattern' : 'View Concept'}
        </span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};

function renderVisualPreview(type: string) {
  switch (type) {
    case 'indices':
      return (
        <div className="flex items-center gap-1">
          {[10, 20, 30, 40].map((num, i) => (
            <div key={i} className="flex flex-col items-center">
              <span
                className={`w-7 h-6 rounded flex items-center justify-center font-mono text-[10px] font-bold border ${
                  i === 2
                    ? 'bg-gradient-to-br from-[#8400ff] to-[#a855f7] text-white border-purple-700 shadow-sm'
                    : 'bg-white text-slate-700 border-purple-100'
                }`}
              >
                {num}
              </span>
              <span className="text-[8px] font-mono text-purple-700 mt-0.5 font-semibold">
                {i}
              </span>
            </div>
          ))}
        </div>
      );
    case 'two-pointers':
      return (
        <div className="flex items-center gap-1">
          {[1, 3, 4, 6, 8, 11].map((num, i) => (
            <div key={i} className="flex flex-col items-center">
              <span
                className={`w-6 h-6 rounded flex items-center justify-center font-mono text-[9px] font-bold border ${
                  i === 0
                    ? 'bg-purple-100 border-[#8400ff] text-purple-950 ring-1 ring-purple-300'
                    : i === 5
                    ? 'bg-rose-50 border-rose-500 text-rose-900 ring-1 ring-rose-200'
                    : 'bg-white text-slate-700 border-purple-100'
                }`}
              >
                {num}
              </span>
              <span className="text-[7px] font-mono text-purple-800 mt-0.5 font-bold">
                {i === 0 ? 'L' : i === 5 ? 'R' : ''}
              </span>
            </div>
          ))}
        </div>
      );
    case 'sliding-window':
      return (
        <div className="flex items-center gap-1 relative">
          <div className="absolute inset-y-0 left-0 right-7 bg-purple-100/90 border border-[#a855f7] rounded-lg pointer-events-none" />
          {[2, 1, 5, 1, 3].map((num, i) => (
            <span
              key={i}
              className={`w-6 h-6 rounded flex items-center justify-center font-mono text-[9px] font-bold relative z-10 ${
                i <= 2 ? 'text-purple-950 font-extrabold' : 'text-slate-400'
              }`}
            >
              {num}
            </span>
          ))}
        </div>
      );
    case 'prefix-bars':
      return (
        <div className="flex items-end gap-1.5 h-8">
          {[2, 6, 7, 10, 15].map((val, i) => (
            <div
              key={i}
              style={{ height: `${(val / 15) * 26 + 6}px` }}
              className={`w-4 rounded-t border transition-all ${
                i === 3
                  ? 'bg-gradient-to-t from-[#8400ff] to-[#c084fc] border-purple-700 shadow-xs'
                  : 'bg-purple-200 border-purple-300'
              }`}
            />
          ))}
        </div>
      );
    case 'kadane-graph':
      return (
        <div className="flex items-center gap-1">
          {[-2, 1, -3, 4, -1, 2].map((num, i) => (
            <span
              key={i}
              className={`px-1 py-0.5 rounded font-mono text-[9px] font-bold ${
                num > 0
                  ? 'bg-purple-100 text-purple-900 border border-purple-200'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {num}
            </span>
          ))}
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-1">
          {[10, 20, 30, 40].map((num, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded bg-white border border-purple-100 flex items-center justify-center font-mono text-[9px] font-semibold text-slate-700"
            >
              {num}
            </div>
          ))}
        </div>
      );
  }
}

