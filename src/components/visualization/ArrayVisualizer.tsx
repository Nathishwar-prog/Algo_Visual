import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VisualState } from '../../types/learning';
import { ArrayElement } from './ArrayElement';
import { Pointer } from './Pointer';
import { WindowBracket } from './WindowBracket';
import { VariableDisplay } from './VariableDisplay';
import { ComparisonDisplay } from './ComparisonDisplay';
import { DecisionPanel } from './DecisionPanel';

interface ArrayVisualizerProps {
  visualState: VisualState;
  onElementClick?: (index: number) => void;
}

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
  visualState,
  onElementClick,
}) => {
  const {
    elements,
    secondaryElements,
    secondaryTitle,
    tertiaryElements,
    tertiaryTitle,
    pointers = [],
    window,
    variables = [],
    frequencyMap,
    comparison,
    decision,
    callout,
  } = visualState;

  // Separate top and bottom pointers by index
  const topPointersByIndex = pointers
    .filter((p) => p.position === 'top')
    .reduce<Record<number, typeof pointers>>((acc, p) => {
      acc[p.index] = acc[p.index] ? [...acc[p.index], p] : [p];
      return acc;
    }, {});

  const bottomPointersByIndex = pointers
    .filter((p) => p.position !== 'top')
    .reduce<Record<number, typeof pointers>>((acc, p) => {
      acc[p.index] = acc[p.index] ? [...acc[p.index], p] : [p];
      return acc;
    }, {});

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-purple-50/40 via-white to-purple-50/20 rounded-3xl border border-purple-200/90 shadow-sm min-h-[350px] relative overflow-hidden">
      {/* Whiteboard Background Texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(#8400ff 1px, transparent 1px), radial-gradient(#8400ff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
        }}
      />

      {/* Dynamic Callout / Status Bar */}
      <AnimatePresence mode="wait">
        {callout && (
          <motion.div
            key={callout.text}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className={`mb-4 px-4 py-2 rounded-xl border text-xs font-semibold max-w-xl text-center shadow-xs flex items-center justify-center gap-2 ${
              callout.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                : callout.type === 'warning'
                ? 'bg-amber-50 text-amber-900 border-amber-200'
                : callout.type === 'formula'
                ? 'bg-purple-50 text-purple-950 border-purple-200 font-mono'
                : 'bg-white text-purple-950 border-purple-200 shadow-purple-100/50'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                callout.type === 'success'
                  ? 'bg-emerald-500'
                  : callout.type === 'warning'
                  ? 'bg-amber-500'
                  : 'bg-[#8400ff]'
              }`}
            />
            <span>{callout.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Array Stage */}
      <div className="w-full flex flex-col items-center justify-center overflow-x-auto py-2 px-2 scrollbar-thin relative z-10">
        <div className="inline-flex flex-col items-center min-w-max">
          {/* Elements Row */}
          <div className="flex items-end gap-2.5 sm:gap-3.5">
            {elements.map((el, idx) => {
              const topPointers = topPointersByIndex[idx] || [];
              const bottomPointers = bottomPointersByIndex[idx] || [];

              return (
                <div key={el.id} className="flex flex-col items-center">
                  {/* Top pointers */}
                  <div className="min-h-[28px] flex flex-col justify-end items-center">
                    {topPointers.map((p) => (
                      <Pointer key={p.id} pointer={p} />
                    ))}
                  </div>

                  {/* Array Box */}
                  <ArrayElement
                    element={el}
                    index={idx}
                    isTarget={callout?.targetIndex === idx}
                    onClick={() => onElementClick?.(idx)}
                  />

                  {/* Bottom pointers */}
                  <div className="min-h-[34px] flex flex-col justify-start items-center">
                    {bottomPointers.map((p) => (
                      <Pointer key={p.id} pointer={p} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sliding Window Bracket if present */}
          {window && (
            <WindowBracket
              window={window}
              totalElements={elements.length}
            />
          )}

          {/* Secondary Array (e.g. Prefix Array or Transformed Array) */}
          {secondaryElements && secondaryElements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 pt-5 border-t border-purple-100 w-full flex flex-col items-center"
            >
              {secondaryTitle && (
                <span className="text-xs font-bold text-purple-900 mb-2.5 tracking-wide flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8400ff]" />
                  {secondaryTitle}
                </span>
              )}
              <div className="flex items-center gap-2.5 sm:gap-3.5">
                {secondaryElements.map((el, idx) => (
                  <ArrayElement
                    key={el.id}
                    element={el}
                    index={idx}
                    showIndex={true}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Tertiary Array (e.g. Suffix Array in Prefix+Suffix) */}
          {tertiaryElements && tertiaryElements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 pt-4 border-t border-purple-100 w-full flex flex-col items-center"
            >
              {tertiaryTitle && (
                <span className="text-xs font-bold text-rose-700 mb-2.5 tracking-wide flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  {tertiaryTitle}
                </span>
              )}
              <div className="flex items-center gap-2.5 sm:gap-3.5">
                {tertiaryElements.map((el, idx) => (
                  <ArrayElement
                    key={el.id}
                    element={el}
                    index={idx}
                    showIndex={true}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Comparison Calculation Display (if present) */}
      {comparison && <ComparisonDisplay comparison={comparison} />}

      {/* Frequency Map Table (if present in Traversal pattern) */}
      {frequencyMap && frequencyMap.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 p-3 rounded-2xl bg-white border border-purple-200/80 shadow-2xs max-w-md w-full"
        >
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-purple-100 text-[10px] font-mono font-bold text-slate-500 uppercase">
            <span>Element Value</span>
            <span>Frequency Count</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {frequencyMap.map((entry) => (
              <div
                key={entry.key}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono font-bold transition-all ${
                  entry.highlight
                    ? 'bg-purple-100 border-[#8400ff] text-purple-950 shadow-xs scale-105'
                    : 'bg-purple-50/50 border-purple-100 text-slate-700'
                }`}
              >
                <span className="text-[#8400ff]">{entry.key}</span>
                <span className="text-slate-400">→</span>
                <span className="text-slate-900">{entry.count}×</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Decision Reasoning Panel (What -> Why -> Result) */}
      {decision && <DecisionPanel decision={decision} />}

      {/* Live Variable Inspector */}
      {variables && variables.length > 0 && (
        <div className="mt-4 w-full flex justify-center">
          <VariableDisplay variables={variables} />
        </div>
      )}
    </div>
  );
};
