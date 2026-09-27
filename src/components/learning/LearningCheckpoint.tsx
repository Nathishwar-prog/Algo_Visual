import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { CheckpointData } from '../../types/learning';

interface LearningCheckpointProps {
  checkpoint: CheckpointData;
  onAnswerSelected?: (isCorrect: boolean) => void;
}

export const LearningCheckpoint: React.FC<LearningCheckpointProps> = ({
  checkpoint,
  onAnswerSelected,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedOptionId(id);
    const option = checkpoint.options.find((o) => o.id === id);
    if (option && onAnswerSelected) {
      onAnswerSelected(option.isCorrect);
    }
  };

  const selectedOption = checkpoint.options.find((o) => o.id === selectedOptionId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="my-3 w-full max-w-2xl mx-auto rounded-2xl border-2 border-dashed border-[#c084fc] bg-gradient-to-r from-purple-50/60 via-white to-violet-50/40 p-4 shadow-xs"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#8400ff] bg-purple-100/70 px-2 py-0.5 rounded-md">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Pause & Think</span>
        </span>
        {checkpoint.prompt && (
          <span className="text-xs text-slate-500 font-medium">
            {checkpoint.prompt}
          </span>
        )}
      </div>

      <h4 className="text-sm font-bold text-slate-900 mb-3">
        {checkpoint.question}
      </h4>

      {/* Option Buttons */}
      <div className="flex flex-wrap gap-2.5 mb-3">
        {checkpoint.options.map((option) => {
          const isChosen = selectedOptionId === option.id;
          let btnStyle = 'bg-white border-purple-200 text-slate-800 hover:border-[#8400ff] hover:bg-purple-50/50';

          if (isChosen) {
            btnStyle = option.isCorrect
              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-200'
              : 'bg-rose-50 border-rose-400 text-rose-950 font-bold ring-2 ring-rose-200';
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-2xs flex items-center gap-2 ${btnStyle}`}
            >
              <span>{option.text}</span>
              {isChosen && (
                <span>
                  {option.isCorrect ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-rose-500 inline" />
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Feedback */}
      <AnimatePresence>
        {selectedOption && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-3 rounded-xl text-xs leading-relaxed border ${
              selectedOption.isCorrect
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                : 'bg-amber-50/80 border-amber-200 text-amber-950'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <span>{selectedOption.isCorrect ? '✓ Spot on!' : '💡 Let\'s reason through it:'}</span>
            </div>
            <p>{selectedOption.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
