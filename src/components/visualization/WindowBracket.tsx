import React from 'react';
import { motion } from 'motion/react';
import { WindowData } from '../../types/learning';

interface WindowBracketProps {
  window: WindowData;
  totalElements: number;
}

export const WindowBracket: React.FC<WindowBracketProps> = ({
  window,
}) => {
  const isPeak = window.color === 'emerald';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      className="mt-3 w-full flex flex-col items-center"
    >
      {/* Sliding window bracket visualization */}
      <div
        className={`w-full max-w-md py-2 px-3 rounded-lg border flex items-center justify-between transition-colors shadow-xs ${
          isPeak
            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
            : 'bg-purple-50/90 border-[#a855f7] text-purple-950 shadow-sm shadow-purple-100'
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isPeak ? 'bg-emerald-500' : 'bg-[#8400ff]'
            }`}
          />
          <span className="text-xs font-semibold font-mono tracking-tight">
            {window.label ?? `Window [${window.startIndex}..${window.endIndex}]`}
          </span>
        </div>
        {window.value && (
          <span
            className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
              isPeak
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-purple-200/80 text-purple-900 border border-purple-300'
            }`}
          >
            {window.value}
          </span>
        )}
      </div>
    </motion.div>
  );
};
