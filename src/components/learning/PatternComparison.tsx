import React, { useState } from 'react';
import { ArrowRight, HelpCircle, Layers, CheckCircle2 } from 'lucide-react';

interface PatternComparisonProps {
  onSelectPattern: (patternId: string) => void;
}

export const PatternComparison: React.FC<PatternComparisonProps> = ({ onSelectPattern }) => {
  const [selectedPatternIndex, setSelectedPatternIndex] = useState(0);

  const patterns = [
    {
      id: 'traversal-frequency-counting',
      name: 'Traversal & Frequency',
      coreConcept: 'Visit every element systematically and count occurrences.',
      movement: 'Pointer moves linearly: 0 → 1 → 2 → ... → n-1',
      bestFor: 'Counts, maximums, duplicates, hash maps',
      complexity: 'Time O(n), Space O(k)',
      whyChoose: 'When each element can be processed individually or counted in a single pass without range coordination.',
    },
    {
      id: 'two-pointers',
      name: 'Two Pointers',
      coreConcept: 'Two indices move strategically inward or outward based on comparison.',
      movement: 'left → starts at 0, ← right starts at n-1, converging',
      bestFor: 'Sorted arrays, pair sums, palindromes, container boundaries',
      complexity: 'Time O(n), Space O(1)',
      whyChoose: 'When the array is sorted and comparing two positions allows decisively pruning half the remaining candidates.',
    },
    {
      id: 'slow-fast-pointer',
      name: 'Slow-Fast Pointer',
      coreConcept: 'Two pointers moving with different speeds (1x vs 2x) or roles (read vs write).',
      movement: 'Fast scans ahead; slow tracks placement / midpoint',
      bestFor: 'In-place element removal, cycle detection, finding middle element',
      complexity: 'Time O(n), Space O(1)',
      whyChoose: 'When one index explores ahead while another preserves boundary order or tracks relative speed.',
    },
    {
      id: 'sliding-window',
      name: 'Sliding Window',
      coreConcept: 'Maintain a contiguous subsegment/window while expanding or contracting it.',
      movement: 'Expand right edge; contract left edge when condition fails',
      bestFor: 'Contiguous subarrays/substrings, maximum sum of size K, minimum window length',
      complexity: 'Time O(n), Space O(1)',
      whyChoose: 'When subproblems strictly involve contiguous subarrays and adjacent windows overlap by k-1 elements.',
    },
    {
      id: 'prefix-sum',
      name: 'Prefix Sum',
      coreConcept: 'Precompute cumulative sums from left to right.',
      movement: 'Forward accumulation: prefix[i] = prefix[i-1] + arr[i]',
      bestFor: 'Repeated range sum queries (L, R) in O(1)',
      complexity: 'Time O(n) build, O(1) query',
      whyChoose: 'When you need to answer multiple range sum queries on static array data without re-looping.',
    },
    {
      id: 'suffix-sum',
      name: 'Suffix Sum',
      coreConcept: 'Precompute cumulative sums from right to left.',
      movement: 'Backward accumulation: suffix[i] = arr[i] + suffix[i+1]',
      bestFor: 'Right-hand totals, leaders in array, products of elements to the right',
      complexity: 'Time O(n) build, O(1) query',
      whyChoose: 'When every element needs quick access to the aggregate sum/max of everything to its right.',
    },
    {
      id: 'prefix-suffix',
      name: 'Prefix + Suffix',
      coreConcept: 'Combine precomputed information from both sides of each element.',
      movement: 'Two passes: Forward prefix pass + Backward suffix pass',
      bestFor: 'Product of array except self, Trapping rain water, Equilibrium index',
      complexity: 'Time O(n), Space O(n)',
      whyChoose: 'When the answer at index i strictly depends on all elements to its left AND all elements to its right.',
    },
  ];

  const current = patterns[selectedPatternIndex];

  return (
    <div className="bg-gradient-to-br from-purple-50/40 via-white to-violet-50/30 rounded-3xl border border-purple-200/90 p-6 sm:p-8 shadow-sm mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-purple-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#8400ff] mb-1">
            <Layers className="w-4 h-4" />
            <span>Interactive Mental Model</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Know the Difference
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any pattern to inspect how pointer movements, memory structures, and problem scopes differ.
          </p>
        </div>
      </div>

      {/* Pattern Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
        {patterns.map((p, idx) => {
          const isActive = idx === selectedPatternIndex;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPatternIndex(idx)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#8400ff] to-[#a855f7] text-white shadow-sm shadow-purple-300'
                  : 'bg-white border border-purple-100 text-slate-700 hover:bg-purple-50 hover:text-purple-900'
              }`}
            >
              {p.name}
            </button>
          );
        })}
      </div>

      {/* Comparison Detail Card */}
      <div className="bg-white rounded-2xl border border-purple-100 p-5 sm:p-7 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-[#8400ff]">
              Pattern 0{selectedPatternIndex + 1}
            </span>
            <h4 className="text-lg font-bold text-slate-900">
              {current.name}
            </h4>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            {current.coreConcept}
          </p>

          <div className="space-y-2.5 text-xs">
            <div className="p-2.5 rounded-lg bg-purple-50/60 border border-purple-100">
              <span className="font-bold text-purple-950 block mb-0.5">
                Movement Rule:
              </span>
              <span className="font-mono text-purple-900">{current.movement}</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-800 block mb-0.5">
                Why choose this over others?
              </span>
              <span className="text-slate-600 leading-snug">{current.whyChoose}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between h-full bg-purple-50/30 rounded-xl p-5 border border-purple-100/80">
          <div>
            <span className="text-[11px] font-mono uppercase font-bold text-purple-900/60 block mb-2">
              Complexity & Scope
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-purple-100">
                <span className="text-slate-500 font-medium">Complexity:</span>
                <span className="font-mono font-bold text-emerald-700">{current.complexity}</span>
              </div>
              <div className="flex items-start justify-between py-1 border-b border-purple-100 gap-2">
                <span className="text-slate-500 font-medium shrink-0">Best suited for:</span>
                <span className="text-slate-800 text-right">{current.bestFor}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectPattern(current.id)}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#8400ff] to-[#a855f7] hover:from-[#7300e0] hover:to-[#9333ea] shadow-sm shadow-purple-300 transition-all cursor-pointer hover:scale-[1.01]"
          >
            <span>Learn {current.name} Interactive Lesson</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
