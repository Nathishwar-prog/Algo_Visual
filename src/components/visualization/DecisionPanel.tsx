import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, HelpCircle, Compass, Zap } from 'lucide-react';
import { DecisionData } from '../../types/learning';

interface DecisionPanelProps {
  decision: DecisionData;
}

export const DecisionPanel: React.FC<DecisionPanelProps> = ({ decision }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
      className="my-3 w-full max-w-2xl mx-auto rounded-2xl border border-purple-200/90 bg-gradient-to-r from-purple-50/70 via-white to-violet-50/50 p-3.5 sm:p-4 shadow-xs"
    >
      <div className="flex items-center gap-1.5 text-[10px] font-mono font-extrabold uppercase tracking-wider text-[#8400ff] mb-2.5">
        <Compass className="w-3.5 h-3.5 text-[#8400ff]" />
        <span>Algorithmic Decision Reasoning (What → Why → Result)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* WHAT? */}
        <div className="bg-white/90 rounded-xl p-2.5 border border-purple-100 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 font-mono mb-1">
            <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[9px]">
              1
            </span>
            <span className="uppercase text-[#8400ff]">WHAT?</span>
          </div>
          <p className="text-xs font-semibold text-slate-800 leading-snug">
            {decision.what}
          </p>
        </div>

        {/* WHY? */}
        <div className="bg-white/90 rounded-xl p-2.5 border border-purple-100 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 font-mono mb-1">
            <span className="w-4 h-4 rounded-full bg-purple-100 text-[#8400ff] flex items-center justify-center text-[9px]">
              2
            </span>
            <span className="uppercase text-[#8400ff]">WHY?</span>
          </div>
          <p className="text-xs text-slate-700 leading-snug">
            {decision.why}
          </p>
        </div>

        {/* RESULT */}
        <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-2.5 border border-[#c084fc]/60 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-purple-900 font-mono mb-1">
            <span className="w-4 h-4 rounded-full bg-[#8400ff] text-white flex items-center justify-center text-[9px]">
              3
            </span>
            <span className="uppercase text-[#8400ff]">RESULT / MOVE</span>
          </div>
          <p className="text-xs font-bold text-purple-950 leading-snug flex items-center gap-1">
            <span>{decision.result}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8400ff] shrink-0" />
          </p>
        </div>
      </div>
    </motion.div>
  );
};
