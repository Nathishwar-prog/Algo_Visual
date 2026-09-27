import React from 'react';
import { motion } from 'motion/react';
import { VariableState } from '../../types/learning';

interface VariableDisplayProps {
  variables: VariableState[];
}

export const VariableDisplay: React.FC<VariableDisplayProps> = ({ variables }) => {
  if (!variables || variables.length === 0) return null;

  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-2 pt-2">
      {variables.map((variable, idx) => {
        const isHighlight = variable.highlight;
        const color = variable.color;

        let badgeStyle = 'bg-white border-slate-200 text-slate-800';
        if (color === 'emerald' || (isHighlight && !color)) {
          badgeStyle = 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold';
        } else if (color === 'rose') {
          badgeStyle = 'bg-rose-50 border-rose-300 text-rose-950 font-bold';
        } else if (color === 'amber') {
          badgeStyle = 'bg-amber-50 border-amber-300 text-amber-950 font-bold';
        }

        return (
          <motion.div
            key={`${variable.name}-${idx}`}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs shadow-xs transition-colors ${badgeStyle}`}
          >
            <span className="font-mono text-slate-500 font-medium">
              {variable.name}:
            </span>
            <span className="font-mono tabular-nums font-semibold">
              {variable.value}
            </span>
            {variable.description && (
              <span className="text-[11px] text-slate-400 font-normal ml-1 border-l border-slate-200 pl-1.5">
                {variable.description}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
