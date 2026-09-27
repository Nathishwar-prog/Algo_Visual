import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { CodeSnippet } from '../../types/learning';

interface CodePanelProps {
  codeSnippet?: CodeSnippet;
  title?: string;
}

export const CodePanel: React.FC<CodePanelProps> = ({
  codeSnippet,
  title = 'Implementation',
}) => {
  const [copied, setCopied] = useState(false);

  if (!codeSnippet) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-slate-50/60 rounded-xl border border-slate-200 text-slate-400 text-xs text-center font-mono">
        <Terminal className="w-5 h-5 mb-2 opacity-50" />
        No code snippet for this conceptual step
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = codeSnippet.code.split('\n');
  const activeLines = codeSnippet.activeLines || [];

  return (
    <div className="flex flex-col bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* Code Header */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-slate-200/80 bg-slate-50/80">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-indigo-600" />
          <span className="text-xs font-semibold text-slate-700 tracking-tight">
            {title}
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            · {codeSnippet.language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 rounded transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-600" />
              <span className="text-emerald-700 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Lines with Line Numbers & Active Line Glow */}
      <div className="p-3 overflow-x-auto text-xs font-mono leading-relaxed bg-white">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const lineNumber = idx + 1;
              const isActive = activeLines.includes(lineNumber);

              return (
                <tr
                  key={idx}
                  className={`transition-colors duration-150 ${
                    isActive
                      ? 'bg-indigo-50/70 border-l-2 border-indigo-600 -ml-1 pl-1'
                      : 'hover:bg-slate-50/60'
                  }`}
                >
                  {/* Line Number */}
                  <td className="w-8 py-0.5 pr-3 text-right select-none text-[11px] text-slate-300 font-mono">
                    {lineNumber}
                  </td>

                  {/* Code Line Text */}
                  <td
                    className={`py-0.5 pl-2 font-mono whitespace-pre ${
                      isActive ? 'text-indigo-950 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    {renderSyntaxHighlight(line, isActive)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {codeSnippet.explanation && (
        <div className="px-3.5 py-2 border-t border-slate-100 bg-slate-50/50 text-[11px] text-slate-500">
          <span className="font-semibold text-slate-700">Execution note: </span>
          {codeSnippet.explanation}
        </div>
      )}
    </div>
  );
};

// Lightweight, crisp syntax highlighter without bulky external dependencies
function renderSyntaxHighlight(line: string, isActive: boolean) {
  if (line.trim().startsWith('#') || line.trim().startsWith('//')) {
    return <span className="text-slate-400 italic">{line}</span>;
  }

  // Keywords
  const parts = line.split(
    /(\b(?:def|return|for|in|while|if|elif|else|try|except|as|print|len|sum|max|min|range)\b|[()[\],:=+\-*\/<>]|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b\d+\b)/g
  );

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;

        if (
          /^(def|return|for|in|while|if|elif|else|try|except|as)$/.test(part)
        ) {
          return (
            <span key={i} className="text-violet-600 font-semibold">
              {part}
            </span>
          );
        }
        if (/^(print|len|sum|max|min|range)$/.test(part)) {
          return (
            <span key={i} className="text-indigo-600 font-medium">
              {part}
            </span>
          );
        }
        if (/^(".*"|'.*')$/.test(part)) {
          return (
            <span key={i} className="text-emerald-700">
              {part}
            </span>
          );
        }
        if (/^\d+$/.test(part)) {
          return (
            <span key={i} className="text-amber-700 font-medium">
              {part}
            </span>
          );
        }
        if (/^[()[\],:=+\-*\/<>]$/.test(part)) {
          return (
            <span key={i} className="text-slate-400">
              {part}
            </span>
          );
        }

        return (
          <span
            key={i}
            className={isActive ? 'text-slate-900' : 'text-slate-700'}
          >
            {part}
          </span>
        );
      })}
    </>
  );
}
