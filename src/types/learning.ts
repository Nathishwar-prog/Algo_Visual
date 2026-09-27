export type Difficulty = 'Beginner' | 'Easy' | 'Medium' | 'Hard';

export type LessonCategory = 'concept' | 'pattern' | 'algorithm';

export interface ArrayElementData {
  id: string | number;
  value: number | string;
  state?: 'default' | 'highlight' | 'active' | 'success' | 'warning' | 'muted' | 'comparing' | 'inserted' | 'deleted';
  label?: string;
  address?: string;
  annotation?: string;
}

export interface PointerData {
  id: string;
  name: string;
  index: number;
  position?: 'top' | 'bottom';
  color?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky' | 'violet';
  label?: string;
}

export interface WindowData {
  startIndex: number;
  endIndex: number;
  label?: string;
  value?: string | number;
  color?: string;
}

export interface VariableState {
  name: string;
  value: string | number;
  highlight?: boolean;
  color?: string;
  description?: string;
}

export interface FrequencyEntry {
  key: string | number;
  count: number;
  highlight?: boolean;
}

export interface ComparisonData {
  expression: string;
  evaluation: string;
  operator: '<' | '>' | '==' | '!=' | '≤' | '≥';
  target: string | number;
  outcome: string;
  status: 'smaller' | 'greater' | 'equal' | 'neutral' | 'success';
}

export interface DecisionData {
  what: string;
  why: string;
  result: string;
}

export interface CheckpointOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface CheckpointData {
  prompt?: string;
  question: string;
  options: CheckpointOption[];
}

export interface VisualState {
  type:
    | 'array'
    | 'array-index'
    | 'two-pointers'
    | 'slow-fast'
    | 'sliding-window'
    | 'prefix-sum'
    | 'suffix-sum'
    | 'prefix-suffix'
    | 'frequency-counting'
    | 'kadane'
    | 'operation-shift';
  elements: ArrayElementData[];
  secondaryElements?: ArrayElementData[];
  secondaryTitle?: string;
  tertiaryElements?: ArrayElementData[];
  tertiaryTitle?: string;
  pointers?: PointerData[];
  window?: WindowData;
  variables?: VariableState[];
  frequencyMap?: FrequencyEntry[];
  comparison?: ComparisonData;
  decision?: DecisionData;
  callout?: {
    text: string;
    type?: 'info' | 'highlight' | 'formula' | 'success' | 'warning';
    targetIndex?: number;
  };
  codeSync?: {
    activeToken?: string;
    targetElementId?: string | number;
  };
  complexityBar?: {
    bruteLabel: string;
    bruteScore: number;
    optimizedLabel: string;
    optimizedScore: number;
  };
}

export interface CodeSnippet {
  language: string;
  code: string;
  activeLines?: number[];
  highlightTokens?: string[];
  explanation?: string;
}

export type StepPhase =
  | 'problem'
  | 'observe'
  | 'think'
  | 'brute-force'
  | 'discovery'
  | 'setup'
  | 'calculation'
  | 'decision'
  | 'action'
  | 'execution'
  | 'code'
  | 'complexity'
  | 'mistakes'
  | 'summary';

export interface LessonStep {
  id: number;
  phase?: StepPhase;
  title: string;
  explanation: string;
  keyIdea: string;
  formula?: string;
  decision?: DecisionData;
  comparison?: ComparisonData;
  checkpoint?: CheckpointData;
  memoryHook?: string;
  visualization: VisualState;
  codeSnippet?: CodeSnippet;
}

export interface ChallengeOption {
  id: string;
  text: string;
  explanation: string;
}

export interface MiniChallenge {
  question: string;
  visualArray?: (number | string)[];
  options: ChallengeOption[];
  correctOptionId: string;
  hint: string;
}

export interface CommonMistake {
  mistake: string;
  fix: string;
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  patternNumber?: string;
  shortDescription: string;
  category: LessonCategory;
  difficulty: Difficulty;
  estimatedMinutes: number;
  whenToUse?: string;
  commonProblemTypes?: string[];
  learningInsight?: string;
  recognitionChecklist?: string[];
  commonMistakes?: CommonMistake[];
  bruteForceVsOptimized?: {
    bruteComplexity: string;
    optimizedComplexity: string;
    observation: string;
    explanation: string;
  };
  overview: string;
  complexity: {
    time: string;
    space: string;
    description: string;
  };
  steps: LessonStep[];
  challenge: MiniChallenge;
  takeaways: string[];
}

export interface LessonMeta {
  id: string;
  patternNumber?: string;
  title: string;
  shortDescription: string;
  category: LessonCategory;
  difficulty: Difficulty;
  estimatedMinutes: number;
  visualPreviewType: string;
  whenToUse?: string;
  commonProblemTypes?: string[];
  learningInsight?: string;
}

export interface Topic {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  concepts: LessonMeta[];
  patterns: LessonMeta[];
  algorithms?: LessonMeta[];
  stats: {
    totalLessons: number;
    estimatedHours: number;
  };
}

