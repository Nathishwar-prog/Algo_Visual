import React from 'react';
import { motion } from 'motion/react';
import { ComparisonData } from '../../types/learning';

interface ComparisonDisplayProps {
  comparison: ComparisonData;
}

export const ComparisonDisplay: React.FC<ComparisonDisplayProps> = ({ comparison }) => {
  const getBadgeStyle = () => {
    switch (comparison.status) {
      case 'smaller':
        return 'bg-amber-50 text-amber-900 border-amber-300';
      case 'greater':
        return 'bg-purple-50 text-purple-900 border-purple-300';
      case 'equal':
      case 'success':
        return 'bg-emerald-50 text-emerald-900 border-emerald-300';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="my-3 px-4 py-2.5 rounded-2xl bg-white border border-purple-100 shadow-xs flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto"
    >
      <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-slate-800">
        <span className="text-slate-500 font-normal">{comparison.expression} =</span>
        <span className="text-[#8400ff] bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200">
          {comparison.evaluation}
        </span>
        <span className="text-slate-400 font-extrabold text-sm">{comparison.operator}</span>
        <span className="text-slate-700 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-200">
          Target ({comparison.target})
        </span>
      </div>

      <div
        className={`px-3 py-1 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 shadow-2xs ${getBadgeStyle()}`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            comparison.status === 'equal' || comparison.status === 'success'
              ? 'bg-emerald-500'
              : comparison.status === 'smaller'
              ? 'bg-amber-500'
              : 'bg-[#8400ff]'
          }`}
        />
        <span>{comparison.outcome}</span>
      </div>
    </motion.div>
  );
};
