import React from 'react';
import { VisualState } from '../../types/learning';
import { ArrayVisualizer } from './ArrayVisualizer';

interface VisualArrayProps {
  visualState: VisualState;
  onElementClick?: (index: number) => void;
}

export const VisualArray: React.FC<VisualArrayProps> = ({
  visualState,
  onElementClick,
}) => {
  return (
    <ArrayVisualizer
      visualState={visualState}
      onElementClick={onElementClick}
    />
  );
};
