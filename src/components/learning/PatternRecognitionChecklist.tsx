import React, { useState } from 'react';
import { CheckSquare, ArrowRight, Sparkles } from 'lucide-react';

interface PatternRecognitionChecklistProps {
  onSelectPattern: (patternId: string) => void;
}

export const PatternRecognitionChecklist: React.FC<PatternRecognitionChecklistProps> = ({
  onSelectPattern,
}) => {
  const checklists = [
    {
      patternName: 'Two Pointers',
      lessonId: 'two-pointers',
      badge: 'Pattern 02',
      questions: [
        'Is the input array sorted or can it be sorted without losing required index associations?',
        'Are you searching for a pair of numbers or comparing elements at opposite boundaries?',
        'Does moving one pointer inward decisively eliminate impossible candidates?',
      ],
      trigger: 'If YES → consider Two Pointers',
    },
    {
      patternName: 'Sliding Window',
      lessonId: 'sliding-window',
      badge: 'Pattern 04',
      questions: [
        'Is the problem strictly about a contiguous subarray or substring?',
        'Do you need the longest, shortest, or optimal subarray satisfying a constraint?',
        'Can you update the next window state in O(1) by dropping the exiting element and adding the entering element?',
      ],
      trigger: 'If YES → consider Sliding Window',
    },
    {
      patternName: 'Prefix Sum',
      lessonId: 'prefix-sum',
      badge: 'Pattern 05',
      questions: [
        'Are there multiple queries asking for the sum or aggregate between range [L, R]?',
        'Do you repeatedly need cumulative information from the beginning up to index i?',
        'Is the array static without frequent mid-array mutations?',
      ],
      trigger: 'If YES → consider Prefix Sum',
    },
    {
      patternName: 'Prefix + Suffix',
      lessonId: 'prefix-suffix',
      badge: 'Pattern 07',
      questions: [
        'Does the final answer for position i strictly depend on elements to its left AND elements to its right?',
        'Can you precompute left-hand metrics in one forward pass and right-hand metrics in one reverse pass?',
        'Can you combine left[i] and right[i] in O(1) to find the current answer?',
      ],
      trigger: 'If YES → consider Prefix + Suffix',
    },
    {
      patternName: 'Slow-Fast Pointer',
      lessonId: 'slow-fast-pointer',
      badge: 'Pattern 03',
      questions: [
        'Do two pointers require different movement rules (e.g. read pointer vs write pointer)?',
        'Are you modifying an array in-place without allocating a new array?',
        'Are you detecting a cycle in index jumps or finding a midpoint without knowing length?',
      ],
      trigger: 'If YES → consider Slow-Fast Pointer',
    },
    {
      patternName: 'Suffix Sum',
      lessonId: 'suffix-sum',
      badge: 'Pattern 06',
      questions: [
        'Does each position depend only on the elements to its right?',
        'Do you need to find leaders, right-hand max, or products after an index?',
      ],
      trigger: 'If YES → consider Suffix Sum',
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-purple-200/90 p-6 sm:p-8 shadow-sm mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-purple-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#8400ff] mb-1">
            <CheckSquare className="w-4 h-4" />
            <span>Problem-Solving Decision Trees</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            How Do I Recognize This Pattern?
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Answer these diagnostic questions whenever encountering an unknown array challenge.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {checklists.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-5 rounded-2xl border border-purple-100/90 bg-purple-50/20 hover:border-[#a855f7] hover:shadow-md transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-[#8400ff]">
                  {item.badge}
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {item.patternName}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {item.questions.map((q, qIdx) => (
                  <div key={qIdx} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="text-[#8400ff] font-bold shrink-0 mt-0.5">✓</span>
                    <span className="leading-snug">{q}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-purple-100/80">
              <button
                onClick={() => onSelectPattern(item.lessonId)}
                className="w-full flex items-center justify-between text-xs font-bold text-[#8400ff] group-hover:text-[#7300e0] cursor-pointer"
              >
                <span>{item.trigger}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
