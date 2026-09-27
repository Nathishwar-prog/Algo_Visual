import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Play, Pause, RotateCcw, ChevronRight, Shuffle, Sliders } from 'lucide-react';
import { VisualArray } from '../visualization/VisualArray';
import { VisualState } from '../../types/learning';

interface InteractiveLabProps {
  onClose: () => void;
}

type LabMode = 'two-pointers' | 'sliding-window' | 'linear-search' | 'reverse';

export const InteractiveLab: React.FC<InteractiveLabProps> = ({ onClose }) => {
  const [arrayInput, setArrayInput] = useState('2, 4, 7, 9, 12, 15, 18');
  const [elements, setElements] = useState<number[]>([2, 4, 7, 9, 12, 15, 18]);
  const [mode, setMode] = useState<LabMode>('two-pointers');
  const [target, setTarget] = useState(21);
  const [windowK, setWindowK] = useState(3);

  // Execution state
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Generate trace frames based on current mode and array
  const generateFrames = (): VisualState[] => {
    const arr = elements;
    const frames: VisualState[] = [];

    if (mode === 'two-pointers') {
      // Two Sum on sorted array
      let left = 0;
      let right = arr.length - 1;

      frames.push({
        type: 'two-pointers',
        elements: arr.map((val, i) => ({
          id: i,
          value: val,
          state: i === left || i === right ? 'active' : 'default',
        })),
        pointers: [
          { id: 'left', name: 'left', index: left, position: 'bottom', color: 'indigo', label: `${arr[left]}` },
          { id: 'right', name: 'right', index: right, position: 'bottom', color: 'rose', label: `${arr[right]}` },
        ],
        variables: [
          { name: 'left', value: `${left} (val ${arr[left]})` },
          { name: 'right', value: `${right} (val ${arr[right]})` },
          { name: 'current_sum', value: `${arr[left] + arr[right]}` },
          { name: 'target', value: `${target}` },
        ],
        callout: {
          text: `Initial state: sum = ${arr[left]} + ${arr[right]} = ${arr[left] + arr[right]}. Target is ${target}.`,
          type: 'info',
        },
      });

      let found = false;
      while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) {
          frames.push({
            type: 'two-pointers',
            elements: arr.map((val, i) => ({
              id: i,
              value: val,
              state: i === left || i === right ? 'success' : 'muted',
            })),
            pointers: [
              { id: 'left', name: 'left', index: left, position: 'bottom', color: 'emerald', label: `${arr[left]}` },
              { id: 'right', name: 'right', index: right, position: 'bottom', color: 'emerald', label: `${arr[right]}` },
            ],
            variables: [
              { name: 'Result', value: `Pair found at [${left}, ${right}]!`, highlight: true, color: 'emerald' },
              { name: 'Sum', value: `${arr[left]} + ${arr[right]} = ${target}` },
            ],
            callout: {
              text: `Match found! arr[${left}] (${arr[left]}) + arr[${right}] (${arr[right]}) = ${target}!`,
              type: 'success',
            },
          });
          found = true;
          break;
        } else if (sum < target) {
          left++;
          frames.push({
            type: 'two-pointers',
            elements: arr.map((val, i) => ({
              id: i,
              value: val,
              state: i === left || i === right ? 'active' : 'default',
            })),
            pointers: [
              { id: 'left', name: 'left', index: left, position: 'bottom', color: 'indigo', label: `${arr[left]}` },
              { id: 'right', name: 'right', index: right, position: 'bottom', color: 'rose', label: `${arr[right]}` },
            ],
            variables: [
              { name: 'left', value: `${left}` },
              { name: 'right', value: `${right}` },
              { name: 'current_sum', value: `${arr[left] + arr[right]}`, highlight: true },
              { name: 'target', value: `${target}` },
            ],
            callout: {
              text: `Sum (${sum}) < target (${target}). Increment left to increase sum.`,
              type: 'warning',
            },
          });
        } else {
          right--;
          frames.push({
            type: 'two-pointers',
            elements: arr.map((val, i) => ({
              id: i,
              value: val,
              state: i === left || i === right ? 'active' : 'default',
            })),
            pointers: [
              { id: 'left', name: 'left', index: left, position: 'bottom', color: 'indigo', label: `${arr[left]}` },
              { id: 'right', name: 'right', index: right, position: 'bottom', color: 'rose', label: `${arr[right]}` },
            ],
            variables: [
              { name: 'left', value: `${left}` },
              { name: 'right', value: `${right}` },
              { name: 'current_sum', value: `${arr[left] + arr[right]}`, highlight: true },
              { name: 'target', value: `${target}` },
            ],
            callout: {
              text: `Sum (${sum}) > target (${target}). Decrement right to decrease sum.`,
              type: 'warning',
            },
          });
        }
      }

      if (!found && left >= right) {
        frames.push({
          type: 'two-pointers',
          elements: arr.map((val, i) => ({ id: i, value: val, state: 'muted' })),
          variables: [{ name: 'Result', value: 'No pair exists with that target', color: 'rose' }],
          callout: {
            text: `Search ended without finding a pair summing to ${target}.`,
            type: 'warning',
          },
        });
      }
    } else if (mode === 'sliding-window') {
      const k = Math.min(windowK, arr.length);
      let windowSum = 0;
      for (let i = 0; i < k; i++) windowSum += arr[i];
      let maxSum = windowSum;
      let maxStart = 0;

      frames.push({
        type: 'sliding-window',
        elements: arr.map((val, i) => ({
          id: i,
          value: val,
          state: i < k ? 'highlight' : 'default',
        })),
        window: { startIndex: 0, endIndex: k - 1, label: `Window [0..${k - 1}]`, value: `Sum: ${windowSum}` },
        variables: [
          { name: 'window_sum', value: `${windowSum}`, highlight: true },
          { name: 'max_sum', value: `${maxSum}` },
        ],
        callout: { text: `Initial window of size ${k} has sum ${windowSum}.`, type: 'info' },
      });

      for (let i = k; i < arr.length; i++) {
        const entering = arr[i];
        const leaving = arr[i - k];
        windowSum = windowSum - leaving + entering;
        if (windowSum > maxSum) {
          maxSum = windowSum;
          maxStart = i - k + 1;
        }

        frames.push({
          type: 'sliding-window',
          elements: arr.map((val, idx) => ({
            id: idx,
            value: val,
            state: idx >= i - k + 1 && idx <= i ? (windowSum === maxSum ? 'success' : 'highlight') : 'muted',
            annotation: idx === i ? `+${entering}` : idx === i - k ? `-${leaving}` : undefined,
          })),
          window: {
            startIndex: i - k + 1,
            endIndex: i,
            label: `Window [${i - k + 1}..${i}]`,
            value: `Sum: ${windowSum}`,
            color: windowSum === maxSum ? 'emerald' : 'indigo',
          },
          variables: [
            { name: 'window_sum', value: `${windowSum}` },
            { name: 'max_sum', value: `${maxSum}`, highlight: true, color: 'emerald' },
          ],
          callout: {
            text: `Shifted: -${leaving}, +${entering} => sum = ${windowSum}. Peak max_sum: ${maxSum}.`,
            type: windowSum === maxSum ? 'success' : 'info',
          },
        });
      }
    } else if (mode === 'linear-search') {
      let foundIndex = -1;
      for (let i = 0; i < arr.length; i++) {
        const isMatch = arr[i] === target;
        frames.push({
          type: 'array-index',
          elements: arr.map((val, idx) => ({
            id: idx,
            value: val,
            state: idx === i ? (isMatch ? 'success' : 'active') : idx < i ? 'muted' : 'default',
            annotation: idx === i ? (isMatch ? 'FOUND!' : 'Checking') : undefined,
          })),
          pointers: [{ id: 'i', name: `i = ${i}`, index: i, position: 'bottom', color: isMatch ? 'emerald' : 'indigo' }],
          variables: [
            { name: 'Index i', value: `${i}` },
            { name: 'arr[i]', value: `${arr[i]}` },
            { name: 'Target', value: `${target}` },
          ],
          callout: {
            text: isMatch ? `Match found at index ${i}!` : `Checking index ${i}: ${arr[i]} != ${target}.`,
            type: isMatch ? 'success' : 'info',
          },
        });
        if (isMatch) {
          foundIndex = i;
          break;
        }
      }
      if (foundIndex === -1) {
        frames.push({
          type: 'array-index',
          elements: arr.map((val, idx) => ({ id: idx, value: val, state: 'muted' })),
          variables: [{ name: 'Result', value: 'Element not found', color: 'rose' }],
          callout: { text: `Finished scanning all ${arr.length} elements. ${target} not found.`, type: 'warning' },
        });
      }
    }

    return frames;
  };

  const frames = generateFrames();
  const currentFrame = frames[Math.min(stepIndex, frames.length - 1)] || frames[0];

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setStepIndex((prev) => {
          if (prev < frames.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 1500);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, frames.length]);

  const handleArrayChange = (val: string) => {
    setArrayInput(val);
    const parsed = val
      .split(',')
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n));
    if (parsed.length > 0) {
      if (mode === 'two-pointers') {
        parsed.sort((a, b) => a - b);
      }
      setElements(parsed);
      setStepIndex(0);
      setIsPlaying(false);
    }
  };

  const handleRandomize = () => {
    const len = Math.floor(Math.random() * 4) + 5;
    const rand = Array.from({ length: len }, () => Math.floor(Math.random() * 30) + 1);
    if (mode === 'two-pointers') rand.sort((a, b) => a - b);
    setElements(rand);
    setArrayInput(rand.join(', '));
    setStepIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-3xl border border-purple-200/90 shadow-2xl shadow-purple-950/20 max-w-4xl w-full max-h-[94vh] flex flex-col overflow-hidden">
        {/* Attractive Vibrant Purple Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100 bg-gradient-to-r from-purple-50/80 via-white to-violet-50/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#8400ff] via-[#a855f7] to-[#c084fc] text-white shadow-md shadow-purple-300">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Interactive Algorithm Sandbox</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-100 text-[#8400ff] font-bold">
                  LIVE ENGINE
                </span>
              </h2>
              <p className="text-[11px] text-purple-800/80 font-medium">
                Test custom arrays, watch real-time pointer convergence & sliding windows
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-purple-100/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Bar with Vibrant Card Styling */}
        <div className="p-5 border-b border-purple-100/80 bg-white grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[11px] font-bold text-purple-900 block mb-1">
              Algorithm Mode
            </label>
            <div className="flex rounded-xl bg-purple-50/80 p-1 border border-purple-100">
              <button
                onClick={() => {
                  setMode('two-pointers');
                  setStepIndex(0);
                  setIsPlaying(false);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === 'two-pointers'
                    ? 'bg-gradient-to-r from-[#8400ff] to-[#a855f7] text-white shadow-sm shadow-purple-300 font-bold'
                    : 'text-purple-900/80 hover:text-[#8400ff]'
                }`}
              >
                Two Sum
              </button>
              <button
                onClick={() => {
                  setMode('sliding-window');
                  setStepIndex(0);
                  setIsPlaying(false);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === 'sliding-window'
                    ? 'bg-gradient-to-r from-[#8400ff] to-[#a855f7] text-white shadow-sm shadow-purple-300 font-bold'
                    : 'text-purple-900/80 hover:text-[#8400ff]'
                }`}
              >
                Sliding Window
              </button>
              <button
                onClick={() => {
                  setMode('linear-search');
                  setStepIndex(0);
                  setIsPlaying(false);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === 'linear-search'
                    ? 'bg-gradient-to-r from-[#8400ff] to-[#a855f7] text-white shadow-sm shadow-purple-300 font-bold'
                    : 'text-purple-900/80 hover:text-[#8400ff]'
                }`}
              >
                Linear Search
              </button>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-purple-900 block mb-1">
              Array Elements (comma separated)
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={arrayInput}
                onChange={(e) => handleArrayChange(e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-mono rounded-xl border border-purple-200 bg-white text-slate-800 focus:outline-none focus:border-[#8400ff] focus:ring-1 focus:ring-purple-200 shadow-2xs"
              />
              <button
                onClick={handleRandomize}
                className="p-1.5 rounded-xl border border-purple-200 text-[#8400ff] bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer"
                title="Randomize array"
              >
                <Shuffle className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-purple-900 block mb-1">
              {mode === 'sliding-window' ? 'Window Size k' : 'Target Value'}
            </label>
            {mode === 'sliding-window' ? (
              <input
                type="number"
                min={1}
                max={elements.length}
                value={windowK}
                onChange={(e) => {
                  setWindowK(parseInt(e.target.value) || 2);
                  setStepIndex(0);
                }}
                className="w-full px-3 py-1.5 text-xs font-mono rounded-xl border border-purple-200 bg-white text-slate-800 focus:outline-none focus:border-[#8400ff] focus:ring-1 focus:ring-purple-200 shadow-2xs"
              />
            ) : (
              <input
                type="number"
                value={target}
                onChange={(e) => {
                  setTarget(parseInt(e.target.value) || 0);
                  setStepIndex(0);
                }}
                className="w-full px-3 py-1.5 text-xs font-mono rounded-xl border border-purple-200 bg-white text-slate-800 focus:outline-none focus:border-[#8400ff] focus:ring-1 focus:ring-purple-200 shadow-2xs"
              />
            )}
          </div>
        </div>

        {/* Visual Stage */}
        <div className="p-6 flex-1 overflow-y-auto bg-purple-50/20">
          {currentFrame && <VisualArray visualState={currentFrame} />}
        </div>

        {/* Controls Footer */}
        <div className="px-6 py-3.5 border-t border-purple-100 bg-gradient-to-r from-purple-50/50 via-white to-purple-50/40 flex items-center justify-between">
          <div className="text-xs font-mono text-purple-800 font-semibold">
            Frame {stepIndex + 1} of {frames.length}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setStepIndex(0);
                setIsPlaying(false);
              }}
              className="p-2 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-100/60 transition-colors cursor-pointer"
              title="Reset frames"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#8400ff] to-[#a855f7] hover:from-[#7300e0] hover:to-[#9333ea] rounded-xl shadow-sm shadow-purple-300 transition-all hover:scale-[1.02] cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-white" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Auto-step</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                if (stepIndex < frames.length - 1) setStepIndex((s) => s + 1);
              }}
              disabled={stepIndex >= frames.length - 1}
              className={`flex items-center gap-1 px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                stepIndex >= frames.length - 1
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
                  : 'border-purple-200 bg-white text-purple-900 hover:bg-purple-50 shadow-2xs'
              }`}
            >
              <span>Next Frame</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
