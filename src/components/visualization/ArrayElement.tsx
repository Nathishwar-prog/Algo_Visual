import React from 'react';
import { motion } from 'motion/react';
import { ArrayElementData } from '../../types/learning';

interface ArrayElementProps {
  element: ArrayElementData;
  index: number;
  showIndex?: boolean;
  isTarget?: boolean;
  onClick?: () => void;
}

export const ArrayElement: React.FC<ArrayElementProps> = ({
  element,
  index,
  showIndex = true,
  isTarget = false,
  onClick,
}) => {
  const getStateStyles = () => {
    switch (element.state) {
      case 'active':
        return 'bg-purple-50/90 border-[#8400ff] text-purple-950 shadow-md shadow-purple-200/50 ring-2 ring-[#c084fc]';
      case 'highlight':
        return 'bg-gradient-to-br from-purple-50 to-violet-100/70 border-[#a855f7] text-purple-950 shadow-md shadow-purple-200/50 ring-2 ring-[#e9d5ff]';
      case 'success':
        return 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-md ring-2 ring-emerald-200/70';
      case 'warning':
        return 'bg-amber-50 border-amber-500 text-amber-950 shadow-sm ring-2 ring-amber-200/60';
      case 'muted':
        return 'bg-slate-50/70 border-slate-200 text-slate-400 opacity-50';
      case 'comparing':
        return 'bg-purple-100/70 border-[#c084fc] text-purple-950 shadow-sm ring-2 ring-purple-200';
      case 'inserted':
        return 'bg-gradient-to-br from-purple-100 to-indigo-100 border-[#8400ff] text-purple-950 shadow-md ring-2 ring-purple-300';
      default:
        return 'bg-white border-purple-100/90 text-slate-800 shadow-2xs hover:border-purple-300';
    }
  };

  return (
    <div className="flex flex-col items-center select-none">
      {/* Element Address or Top Annotation */}
      {element.address && (
        <span className="text-[11px] font-mono tabular-nums text-slate-400 mb-1.5 font-medium tracking-tight">
          {element.address}
        </span>
      )}

      {/* Array Element Box */}
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{
          opacity: 1,
          scale: isTarget ? 1.06 : 1,
          y: 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 380,
          damping: 26,
          mass: 0.8,
        }}
        onClick={onClick}
        className={`relative w-14 h-14 sm:w-16 sm:h-16 flex flex-col items-center justify-center rounded-xl border-2 transition-colors cursor-default ${getStateStyles()}`}
      >
        <span className="text-lg sm:text-xl font-bold font-mono tabular-nums tracking-tight">
          {element.value}
        </span>

        {/* Small badge annotation if present */}
        {element.annotation && (
          <span className="absolute -top-2.5 px-1.5 py-0.2 text-[10px] font-semibold bg-white border border-slate-200 rounded text-slate-600 shadow-xs whitespace-nowrap">
            {element.annotation}
          </span>
        )}
      </motion.div>

      {/* Index number or label below */}
      {showIndex && (
        <div className="flex flex-col items-center mt-1.5">
          <span className="text-xs font-mono font-semibold text-slate-500">
            {element.label ?? index}
          </span>
        </div>
      )}
    </div>
  );
};
