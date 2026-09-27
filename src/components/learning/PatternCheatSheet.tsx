import React from 'react';
import { ArrowRight, Sparkles, BookCheck } from 'lucide-react';

interface PatternCheatSheetProps {
  onSelectPattern: (patternId: string) => void;
}

export const PatternCheatSheet: React.FC<PatternCheatSheetProps> = ({ onSelectPattern }) => {
  const cheatSheetRows = [
    {
      clue: 'Visit every element',
      pattern: 'Traversal',
      time: 'O(n)',
      space: 'O(1)',
      lessonId: 'array-traversal',
      example: 'Max/min, linear scan',
    },
    {
      clue: 'Count occurrences / frequencies',
      pattern: 'Frequency Counting',
      time: 'O(n)',
      space: 'O(k)',
      lessonId: 'traversal-frequency-counting',
      example: 'Duplicates, majority element, anagrams',
    },
    {
      clue: 'Pair / sorted array / opposite ends',
      pattern: 'Two Pointers',
      time: 'O(n)',
      space: 'O(1)',
      lessonId: 'two-pointers',
      example: 'Two sum sorted, reverse array, palindrome',
    },
    {
      clue: 'Different pointer speeds / roles',
      pattern: 'Slow-Fast Pointer',
      time: 'O(n)',
      space: 'O(1)',
      lessonId: 'slow-fast-pointer',
      example: 'In-place remove, midpoint, cycle detection',
    },
    {
      clue: 'Contiguous subarray / substring of size k or condition',
      pattern: 'Sliding Window',
      time: 'O(n)',
      space: 'O(1)',
      lessonId: 'sliding-window',
      example: 'Max sum subarray of size K, longest substring',
    },
    {
      clue: 'Repeated range sums / cumulative lookups',
      pattern: 'Prefix Sum',
      time: 'O(1) query',
      space: 'O(n)',
      lessonId: 'prefix-sum',
      example: 'Range sum (L, R) in O(1), subarray sum = K',
    },
    {
      clue: 'Information strictly from the right side',
      pattern: 'Suffix Sum',
      time: 'O(1) query',
      space: 'O(n)',
      lessonId: 'suffix-sum',
      example: 'Right-side sum, leaders in array',
    },
    {
      clue: 'Left + Right two-sided constraints',
      pattern: 'Prefix + Suffix',
      time: 'O(n)',
      space: 'O(n)',
      lessonId: 'prefix-suffix',
      example: 'Product except self, Trapping rain water',
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-purple-200/90 p-6 sm:p-8 shadow-sm overflow-hidden mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-purple-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#8400ff] mb-1">
            <BookCheck className="w-4 h-4" />
            <span>Fast Revision Guide</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Array Pattern Cheat Sheet
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Identify the optimal algorithmic pattern by matching problem clues.
          </p>
        </div>

        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-[#8400ff] border border-purple-200 w-fit">
          8 Core Patterns
        </span>
      </div>

      {/* Responsive Table / Card Layout */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-purple-100/80 text-[11px] font-mono text-purple-900/70 uppercase">
              <th className="py-2.5 px-3">Problem Clue</th>
              <th className="py-2.5 px-3">Optimal Pattern</th>
              <th className="py-2.5 px-3">Time</th>
              <th className="py-2.5 px-3">Space</th>
              <th className="py-2.5 px-3">Typical Application</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cheatSheetRows.map((row, i) => (
              <tr
                key={i}
                onClick={() => onSelectPattern(row.lessonId)}
                className="hover:bg-purple-50/50 transition-colors group cursor-pointer"
              >
                <td className="py-3 px-3 font-semibold text-slate-900">
                  <span className="text-purple-600 mr-1.5 font-bold">"</span>
                  {row.clue}
                  <span className="text-purple-600 ml-0.5 font-bold">"</span>
                </td>
                <td className="py-3 px-3">
                  <span className="font-bold text-[#8400ff] group-hover:text-[#7300e0] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#a855f7]" />
                    {row.pattern}
                  </span>
                </td>
                <td className="py-3 px-3 font-mono font-semibold text-emerald-700">
                  {row.time}
                </td>
                <td className="py-3 px-3 font-mono text-slate-600">
                  {row.space}
                </td>
                <td className="py-3 px-3 text-slate-500">
                  {row.example}
                </td>
                <td className="py-3 px-3 text-right">
                  <span className="inline-flex items-center gap-1 font-bold text-[11px] text-[#8400ff] group-hover:translate-x-1 transition-transform">
                    Practice <ArrowRight className="w-3 h-3" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
