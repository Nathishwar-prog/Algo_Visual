import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Brain, BookmarkCheck } from 'lucide-react';

interface MemoryHookBannerProps {
  hook: string;
  patternTitle?: string;
}

export const MemoryHookBanner: React.FC<MemoryHookBannerProps> = ({ hook, patternTitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="my-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950 via-[#3b0764] to-[#4c1d95] text-white shadow-md relative overflow-hidden border border-purple-400/30"
    >
      <div className="absolute right-0 top-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c084fc] to-[#8400ff] text-white flex items-center justify-center font-bold shadow-sm shadow-purple-500/50 shrink-0">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-purple-300 block mb-0.5">
              Mental Model & Memory Hook
            </span>
            <h4 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
              <span>"{hook}"</span>
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900/60 border border-purple-400/30 text-xs font-semibold text-purple-200">
          <BookmarkCheck className="w-3.5 h-3.5 text-[#c084fc]" />
          <span>Remember this in interviews</span>
        </div>
      </div>
    </motion.div>
  );
};
