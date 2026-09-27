import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { MiniChallenge } from '../../types/learning';

interface MiniChallengeViewProps {
  challenge: MiniChallenge;
  onComplete: () => void;
}

export const MiniChallengeView: React.FC<MiniChallengeViewProps> = ({
  challenge,
  onComplete,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const selectedOption = challenge.options.find((o) => o.id === selectedOptionId);
  const isCorrect = selectedOptionId === challenge.correctOptionId;

  const handleSelect = (id: string) => {
    if (submitted && isCorrect) return; // Locked on success
    setSelectedOptionId(id);
    setSubmitted(true);
  };

  const handleRetry = () => {
    setSelectedOptionId(null);
    setSubmitted(false);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs">
      {/* Challenge Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-purple-50 text-[#8400ff] border border-purple-100">
            <HelpCircle className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-900 font-mono">
            Test Your Understanding
          </span>
        </div>

        <button
          onClick={() => setShowHint(!showHint)}
          className="text-xs font-semibold text-purple-700 hover:text-[#8400ff] transition-colors cursor-pointer"
        >
          {showHint ? 'Hide Hint' : 'Need a Hint?'}
        </button>
      </div>

      {/* Hint Alert */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-3 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-900"
          >
            <span className="font-semibold mr-1">Hint:</span>
            {challenge.hint}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question */}
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-4 leading-snug">
        {challenge.question}
      </h3>

      {/* Visual Array Preview if provided */}
      {challenge.visualArray && (
        <div className="flex items-center gap-2 mb-6 p-3 bg-slate-50 rounded-xl border border-slate-200/70 w-fit">
          {challenge.visualArray.map((val, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-mono font-bold text-sm text-slate-800 shadow-2xs">
                {val}
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-1">
                {idx}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Option Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
        {challenge.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isThisCorrect = option.id === challenge.correctOptionId;

          let cardStyle =
            'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300 text-slate-800';

          if (submitted) {
            if (isSelected) {
              cardStyle = isThisCorrect
                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-200'
                : 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-200';
            } else if (isThisCorrect && !isCorrect) {
              cardStyle = 'bg-emerald-50/50 border-emerald-300 text-emerald-900';
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={submitted && isCorrect}
              className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${cardStyle} cursor-pointer`}
            >
              <span
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                  submitted && isSelected
                    ? isThisCorrect
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                {option.id}
              </span>
              <span className="text-sm font-medium pt-0.5 leading-snug">
                {option.text}
              </span>
            </button>
          );
        })}
      </div>

      {/* Explanation & Feedback Card */}
      <AnimatePresence>
        {submitted && selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-4 rounded-xl border mb-5 ${
              isCorrect
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                : 'bg-rose-50/80 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide font-mono">
                    Correct! Outstanding
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span className="text-xs font-bold text-rose-900 uppercase tracking-wide font-mono">
                    Not quite right
                  </span>
                </>
              )}
            </div>
            <p className="text-xs leading-relaxed opacity-90">
              {selectedOption.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div>
          {submitted && !isCorrect && (
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Try Again
            </button>
          )}
        </div>

        {submitted && isCorrect && (
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onComplete}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5" />
            Complete Lesson
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </div>
    </div>
  );
};
