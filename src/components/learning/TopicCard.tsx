import React from 'react';
import {
  LayoutGrid,
  Type,
  Hash,
  Link,
  Layers,
  ListOrdered,
  Search,
  ArrowUpDown,
  GitBranch,
  Share2,
  Boxes,
  ArrowRight,
} from 'lucide-react';
import { Topic } from '../../types/learning';

interface TopicCardProps {
  topic: Topic;
  isSelected?: boolean;
  onSelect: () => void;
  completedCount?: number;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  isSelected = false,
  onSelect,
  completedCount = 0,
}) => {
  const getTopicIcon = (name: string) => {
    switch (name) {
      case 'Type':
        return <Type className="w-4 h-4 text-[#8400ff]" />;
      case 'Hash':
        return <Hash className="w-4 h-4 text-[#a855f7]" />;
      case 'Link':
        return <Link className="w-4 h-4 text-[#7c3aed]" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-[#9333ea]" />;
      case 'ListOrdered':
        return <ListOrdered className="w-4 h-4 text-[#8400ff]" />;
      case 'Search':
        return <Search className="w-4 h-4 text-[#a855f7]" />;
      case 'ArrowUpDown':
        return <ArrowUpDown className="w-4 h-4 text-[#c084fc]" />;
      case 'GitBranch':
        return <GitBranch className="w-4 h-4 text-[#7c3aed]" />;
      case 'Share2':
        return <Share2 className="w-4 h-4 text-[#9333ea]" />;
      case 'Boxes':
        return <Boxes className="w-4 h-4 text-[#8400ff]" />;
      default:
        return <LayoutGrid className="w-4 h-4 text-[#8400ff]" />;
    }
  };

  const totalLessons = topic.concepts.length + topic.patterns.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div
      onClick={onSelect}
      className={`group relative flex flex-col justify-between bg-white rounded-2xl border p-5 transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'border-[#8400ff] shadow-md shadow-purple-200/50 ring-2 ring-purple-200'
          : 'border-slate-200/90 hover:border-[#c084fc] hover:shadow-md hover:shadow-purple-100/60 hover:-translate-y-0.5'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-purple-50/80 border border-purple-200/80 flex items-center justify-center">
            {getTopicIcon(topic.iconName)}
          </div>

          {/* Unboxed metadata */}
          <div className="text-[11px] font-mono text-purple-700/80 font-medium">
            {topic.stats.estimatedHours} hrs
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#8400ff] transition-colors tracking-tight mb-1">
          {topic.title}
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {topic.tagline}
        </p>
      </div>

      <div>
        {/* Progress bar in vibrant gradient */}
        <div className="w-full bg-purple-50 rounded-full h-1.5 mb-3 overflow-hidden border border-purple-100">
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-[#8400ff] via-[#a855f7] to-[#c084fc] transition-all duration-300"
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span>{totalLessons} modules</span>
          <span className="flex items-center gap-1 font-semibold text-[#8400ff] group-hover:translate-x-0.5 transition-transform">
            Explore <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};

