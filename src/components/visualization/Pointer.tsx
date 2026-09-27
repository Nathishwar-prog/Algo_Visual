import React from 'react';
import { motion } from 'motion/react';
import { PointerData } from '../../types/learning';

interface PointerProps {
  pointer: PointerData;
}

export const Pointer: React.FC<PointerProps> = ({ pointer }) => {
  const getColorStyles = () => {
    switch (pointer.color) {
      case 'emerald':
        return {
          text: 'text-emerald-700',
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          arrow: 'text-emerald-600',
        };
      case 'rose':
        return {
          text: 'text-rose-700',
          bg: 'bg-rose-50',
          border: 'border-rose-200',
          arrow: 'text-rose-600',
        };
      case 'amber':
        return {
          text: 'text-amber-800',
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          arrow: 'text-amber-600',
        };
      case 'sky':
        return {
          text: 'text-sky-700',
          bg: 'bg-sky-50',
          border: 'border-sky-200',
          arrow: 'text-sky-600',
        };
      case 'violet':
        return {
          text: 'text-violet-700',
          bg: 'bg-violet-50',
          border: 'border-violet-200',
          arrow: 'text-violet-600',
        };
      default:
        return {
          text: 'text-purple-900',
          bg: 'bg-purple-100/90',
          border: 'border-[#a855f7]',
          arrow: 'text-[#8400ff]',
        };
    }
  };

  const colors = getColorStyles();
  const isTop = pointer.position === 'top';

  return (
    <motion.div
      initial={{ opacity: 0, y: isTop ? -8 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`flex flex-col items-center pointer-events-none select-none ${
        isTop ? 'mb-1' : 'mt-1'
      }`}
    >
      {isTop ? (
        <>
          <div
            className={`px-2 py-0.5 rounded text-xs font-semibold font-mono border shadow-2xs whitespace-nowrap ${colors.bg} ${colors.text} ${colors.border}`}
          >
            {pointer.name}
            {pointer.label ? ` (${pointer.label})` : ''}
          </div>
          {/* Down arrow pointing to element */}
          <svg
            className={`w-3.5 h-3.5 -mt-0.5 ${colors.arrow}`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21l-8-9h16l-8 9z" />
          </svg>
        </>
      ) : (
        <>
          {/* Up arrow pointing to element */}
          <svg
            className={`w-3.5 h-3.5 -mb-0.5 ${colors.arrow}`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 3l8 9h-16l8-9z" />
          </svg>
          <div
            className={`px-2 py-0.5 rounded text-xs font-semibold font-mono border shadow-2xs whitespace-nowrap ${colors.bg} ${colors.text} ${colors.border}`}
          >
            {pointer.name}
            {pointer.label ? ` = ${pointer.label}` : ''}
          </div>
        </>
      )}
    </motion.div>
  );
};
