import { Lesson, Topic } from '../../types/learning';
import { traversalFrequencyLesson } from './patterns/traversalFrequency';
import { twoPointersLesson } from './patterns/twoPointers';
import { slowFastPointerLesson } from './patterns/slowFastPointer';
import { slidingWindowLesson } from './patterns/slidingWindow';
import { prefixSumLesson } from './patterns/prefixSum';
import { suffixSumLesson } from './patterns/suffixSum';
import { prefixSuffixLesson } from './patterns/prefixSuffix';

export const arrayLessons: Record<string, Lesson> = {
  // CONCEPT 1: What is an Array?
  'what-is-an-array': {
    id: 'what-is-an-array',
    topicId: 'arrays',
    title: 'What is an Array?',
    shortDescription: 'Discover contiguous memory allocation and fixed-size layout.',
    category: 'concept',
    difficulty: 'Beginner',
    estimatedMinutes: 5,
    overview: 'An array is a fundamental linear data structure that stores elements of the same type in contiguous memory locations.',
    complexity: {
      time: 'O(1) access',
      space: 'O(N) memory',
      description: 'Elements are stored back-to-back in RAM, enabling instant mathematical address computation.',
    },
    steps: [
      {
        id: 1,
        title: 'Contiguous Memory Blocks',
        explanation: 'In physical RAM, an array reserves an unbroken, consecutive sequence of memory bytes.',
        keyIdea: 'Contiguity means every element sits immediately next to its neighbor in hardware memory.',
        visualization: {
          type: 'array',
          elements: [
            { id: 0, value: 42, address: '0x1000', label: 'Index 0', state: 'highlight' },
            { id: 1, value: 17, address: '0x1004', label: 'Index 1', state: 'highlight' },
            { id: 2, value: 89, address: '0x1008', label: 'Index 2', state: 'highlight' },
            { id: 3, value: 33, address: '0x100C', label: 'Index 3', state: 'highlight' },
          ],
          variables: [
            { name: 'Base Address', value: '0x1000', description: 'Start of array in RAM' },
            { name: 'Element Size', value: '4 Bytes', description: 'Standard 32-bit Integer' },
          ],
          callout: {
            text: 'Consecutive addresses: 0x1000, 0x1004, 0x1008, 0x100C',
            type: 'info',
          },
        },
        codeSnippet: {
          language: 'python',
          code: `# Static memory allocation
# 4 contiguous slots reserved in memory
numbers = [42, 17, 89, 33]`,
          activeLines: [3],
        },
      },
      {
        id: 2,
        title: 'Homogeneous Elements',
        explanation: 'All elements share the exact same byte width. Because every element is identical in size, the CPU knows where each starts without scanning.',
        keyIdea: 'Predictable element sizing enables instant random access calculations.',
        visualization: {
          type: 'array',
          elements: [
            { id: 0, value: 42, address: '4 Bytes', label: 'int32', state: 'active' },
            { id: 1, value: 17, address: '4 Bytes', label: 'int32', state: 'active' },
            { id: 2, value: 89, address: '4 Bytes', label: 'int32', state: 'active' },
            { id: 3, value: 33, address: '4 Bytes', label: 'int32', state: 'active' },
          ],
          variables: [
            { name: 'Type', value: 'int32', description: 'Uniform 4-byte width' },
            { name: 'Capacity', value: '4 slots', description: 'Total allocated memory' },
          ],
          callout: {
            text: 'Uniform byte width prevents fragmentation and allows arithmetic indexing.',
            type: 'highlight',
          },
        },
      },
      {
        id: 3,
        title: 'The Address Math Formula',
        explanation: 'To find the element at index i, the computer does not traverse from the start. It uses a single multiplication: Address = Base + (i × ElementSize).',
        keyIdea: 'Direct memory addressing makes array read operations O(1) constant time.',
        formula: 'Address(i) = BaseAddress + (i × sizeof(Type))',
        visualization: {
          type: 'array-index',
          elements: [
            { id: 0, value: 42, address: '0x1000', label: 'i = 0', state: 'muted' },
            { id: 1, value: 17, address: '0x1004', label: 'i = 1', state: 'muted' },
            { id: 2, value: 89, address: '0x1008', label: 'i = 2', state: 'success', annotation: 'Target' },
            { id: 3, value: 33, address: '0x100C', label: 'i = 3', state: 'muted' },
          ],
          pointers: [
            { id: 'target', name: 'i = 2', index: 2, position: 'bottom', color: 'indigo' },
          ],
          variables: [
            { name: 'Base', value: '0x1000' },
            { name: 'i', value: '2' },
            { name: 'Computed Address', value: '0x1008', highlight: true },
          ],
          callout: {
            text: '0x1000 + (2 × 4) = 0x1008 → Instantly loaded in 1 CPU cycle!',
            type: 'formula',
          },
        },
      },
    ],
    challenge: {
      question: 'Where are elements of an array stored relative to each other in physical memory?',
      options: [
        { id: 'A', text: 'Scattered randomly throughout RAM linked by pointers', explanation: 'That describes a Linked List, not an Array.' },
        { id: 'B', text: 'In contiguous (consecutive) memory addresses', explanation: 'Correct! An array requires an unbroken block of memory addresses.' },
        { id: 'C', text: 'In a hash bucket on the network', explanation: 'Hash tables use buckets, but local arrays exist in physical RAM blocks.' },
        { id: 'D', text: 'In reverse order on the CPU cache', explanation: 'Arrays maintain strict zero-indexed forward sequential order in RAM.' },
      ],
      correctOptionId: 'B',
      hint: 'Remember the formula: Address = Base + i * Size.',
    },
    takeaways: [
      'Arrays are contiguous blocks in memory with fixed element sizes.',
      'Accessing any element by index is instantaneous O(1).',
      'The price for O(1) access is expensive O(N) shifting during middle insertions/deletions.',
    ],
  },

  // CONCEPT 2: Array Indexing
  'array-indexing': {
    id: 'array-indexing',
    topicId: 'arrays',
    title: 'Array Indexing',
    shortDescription: 'Master zero-based indexing and direct O(1) element access.',
    category: 'concept',
    difficulty: 'Beginner',
    estimatedMinutes: 6,
    overview: 'Understand how zero-based indexing works under the hood and how code expressions resolve directly to memory values.',
    complexity: {
      time: 'O(1)',
      space: 'O(1)',
      description: 'Single CPU instruction directly dereferences the memory offset.',
    },
    steps: [
      {
        id: 1,
        title: 'Meet the Array',
        explanation: 'Here is a list of five numbers arranged in sequential order: 10, 20, 30, 40, and 50.',
        keyIdea: 'An array holds ordered values in consecutive slots.',
        visualization: {
          type: 'array',
          elements: [
            { id: 0, value: 10, state: 'default' },
            { id: 1, value: 20, state: 'default' },
            { id: 2, value: 30, state: 'default' },
            { id: 3, value: 40, state: 'default' },
            { id: 4, value: 50, state: 'default' },
          ],
          callout: { text: '5 values loaded in ordered sequence.', type: 'info' },
        },
        codeSnippet: {
          language: 'python',
          code: `arr = [10, 20, 30, 40, 50]`,
          activeLines: [1],
        },
      },
      {
        id: 2,
        title: 'Every Element Has an Index',
        explanation: 'In programming, positions start at 0, not 1. The index represents the offset (distance) from the very beginning of the array.',
        keyIdea: 'Index 0 means 0 steps away from start; index 1 means 1 step away.',
        visualization: {
          type: 'array-index',
          elements: [
            { id: 0, value: 10, label: '0', state: 'active' },
            { id: 1, value: 20, label: '1', state: 'active' },
            { id: 2, value: 30, label: '2', state: 'active' },
            { id: 3, value: 40, label: '3', state: 'active' },
            { id: 4, value: 50, label: '4', state: 'active' },
          ],
          variables: [{ name: 'Length', value: '5' }, { name: 'Valid Indices', value: '0 to 4' }],
          callout: { text: 'Index = Offset from start (0, 1, 2, 3, 4)', type: 'highlight' },
        },
      },
      {
        id: 3,
        title: 'Highlighting Index 2',
        explanation: 'Let us locate the element at index 2. We move 2 steps forward from the starting boundary.',
        keyIdea: 'Index 2 points to the 3rd physical slot in the array.',
        visualization: {
          type: 'array-index',
          elements: [
            { id: 0, value: 10, label: '0', state: 'muted' },
            { id: 1, value: 20, label: '1', state: 'muted' },
            { id: 2, value: 30, label: '2', state: 'highlight', annotation: 'Selected' },
            { id: 3, value: 40, label: '3', state: 'muted' },
            { id: 4, value: 50, label: '4', state: 'muted' },
          ],
          pointers: [
            { id: 'p2', name: 'index 2', index: 2, position: 'bottom', color: 'indigo', label: 'arr[2]' },
          ],
          variables: [{ name: 'Target Index', value: '2', highlight: true }, { name: 'Value', value: '30' }],
          callout: { text: 'Pointer positioned at index 2 (value: 30)', type: 'highlight', targetIndex: 2 },
        },
      },
    ],
    challenge: {
      question: 'Given the array: [1, 2, 3, 4, 5], what is the value of arr[3]?',
      visualArray: [1, 2, 3, 4, 5],
      options: [
        { id: 'A', text: '2', explanation: 'Index 1 holds 2.' },
        { id: 'B', text: '3', explanation: 'Index 2 holds 3.' },
        { id: 'C', text: '4', explanation: 'Correct! [0]=1, [1]=2, [2]=3, [3]=4.' },
        { id: 'D', text: '5', explanation: 'Index 4 holds 5.' },
      ],
      correctOptionId: 'C',
      hint: 'Count starting from index 0.',
    },
    takeaways: ['Indices start at 0.', 'Array access is O(1).', 'Index >= length causes IndexError.'],
  },

  // CONCEPT 3: Array Traversal
  'array-traversal': {
    id: 'array-traversal',
    topicId: 'arrays',
    title: 'Array Traversal',
    shortDescription: 'Visit each element sequentially with iteration pointers.',
    category: 'concept',
    difficulty: 'Beginner',
    estimatedMinutes: 7,
    overview: 'Traversal means visiting every element of an array in order, typically using a loop counter pointer i from 0 up to N - 1.',
    complexity: { time: 'O(N)', space: 'O(1)', description: 'Must visit all N elements exactly once.' },
    steps: [
      {
        id: 1,
        title: 'Starting the Loop',
        explanation: 'We initialize loop counter i = 0 pointing to the first item and accumulator total = 0.',
        keyIdea: 'Loop variable i tracks the current position during sequential visitation.',
        visualization: {
          type: 'array-index',
          elements: [
            { id: 0, value: 12, label: '0', state: 'active' },
            { id: 1, value: 25, label: '1' },
            { id: 2, value: 8, label: '2' },
            { id: 3, value: 42, label: '3' },
          ],
          pointers: [{ id: 'i', name: 'i = 0', index: 0, position: 'bottom', color: 'indigo' }],
          variables: [{ name: 'i', value: '0', highlight: true }, { name: 'val', value: '12' }],
          callout: { text: 'Step 1: i = 0. Adding arr[0] (12) to total.', type: 'info' },
        },
      },
    ],
    challenge: {
      question: 'For an array of length N, how many iterations does full traversal perform?',
      options: [
        { id: 'A', text: 'N / 2', explanation: 'Logarithmic/half is binary search.' },
        { id: 'B', text: 'N', explanation: 'Correct! Each element is visited once.' },
        { id: 'C', text: 'N^2', explanation: 'That is nested loops.' },
        { id: 'D', text: '1', explanation: '1 is constant time.' },
      ],
      correctOptionId: 'B',
      hint: 'Indices run from 0 to N-1.',
    },
    takeaways: ['Traversal visits each element once in O(N) time.', 'Space is O(1).'],
  },

  // CONCEPT 4: Array Operations
  'array-operations': {
    id: 'array-operations',
    topicId: 'arrays',
    title: 'Array Operations',
    shortDescription: 'Compare O(1) in-place updates with O(N) shifting operations.',
    category: 'concept',
    difficulty: 'Easy',
    estimatedMinutes: 8,
    overview: 'Explore the difference between in-place element updates vs inserting and deleting elements which require memory shifting.',
    complexity: { time: 'O(1) update / O(N) shift', space: 'O(1)', description: 'Shifting causes O(N) time.' },
    steps: [
      {
        id: 1,
        title: 'Updating in Place',
        explanation: 'Updating arr[2] = 99 directly overwrites the cell without moving any other elements.',
        keyIdea: 'Updates are O(1) because no elements move.',
        visualization: {
          type: 'operation-shift',
          elements: [
            { id: 0, value: 10 },
            { id: 1, value: 20 },
            { id: 2, value: 99, state: 'success', annotation: 'Updated!' },
            { id: 3, value: 40 },
          ],
          variables: [{ name: 'Time', value: 'O(1)', color: 'emerald' }],
          callout: { text: 'Direct cell overwrite. Zero shifts.', type: 'success' },
        },
      },
    ],
    challenge: {
      question: 'Why does inserting at index 0 take O(N) time?',
      options: [
        { id: 'A', text: 'Converts to linked list', explanation: 'No, stays an array.' },
        { id: 'B', text: 'All N existing elements must shift right', explanation: 'Correct! Memory contiguity requires shifting.' },
        { id: 'C', text: 'Index 0 is read-only', explanation: 'Index 0 is writable.' },
        { id: 'D', text: 'Compiler restriction', explanation: 'No.' },
      ],
      correctOptionId: 'B',
      hint: 'Where do existing elements go?',
    },
    takeaways: ['Reading/updating is O(1).', 'Middle insertion/deletion is O(N).'],
  },

  // =========================================================================
  // DEDICATED 7 ARRAY PROBLEM-SOLVING PATTERNS (STEP-BY-STEP WHITEBOARD PEDAGOGY)
  // =========================================================================
  'traversal-frequency-counting': traversalFrequencyLesson,
  'two-pointers': twoPointersLesson,
  'slow-fast-pointer': slowFastPointerLesson,
  'sliding-window': slidingWindowLesson,
  'prefix-sum': prefixSumLesson,
  'suffix-sum': suffixSumLesson,
  'prefix-suffix': prefixSuffixLesson,
};

export const arrayTopic: Topic = {
  id: 'arrays',
  title: 'Arrays',
  tagline: 'Master array fundamentals and problem-solving patterns.',
  description: 'Understand contiguous memory allocation, instant random access, and core two-pointer, sliding window, and prefix/suffix techniques.',
  iconName: 'LayoutGrid',
  concepts: [
    {
      id: 'what-is-an-array',
      title: 'What is an Array?',
      shortDescription: 'Explore contiguous memory allocation, fixed-size slots, and RAM addresses.',
      category: 'concept',
      difficulty: 'Beginner',
      estimatedMinutes: 5,
      visualPreviewType: 'memory-blocks',
    },
    {
      id: 'array-indexing',
      title: 'Array Indexing',
      shortDescription: 'Learn why arrays start at index 0 and how instant O(1) memory lookup works.',
      category: 'concept',
      difficulty: 'Beginner',
      estimatedMinutes: 6,
      visualPreviewType: 'indices',
    },
    {
      id: 'array-traversal',
      title: 'Array Traversal',
      shortDescription: 'Iterate through elements sequentially with index pointers and loops.',
      category: 'concept',
      difficulty: 'Beginner',
      estimatedMinutes: 7,
      visualPreviewType: 'traversal-arrow',
    },
    {
      id: 'array-operations',
      title: 'Array Operations',
      shortDescription: 'Compare instant O(1) in-place updates with O(N) element shifts.',
      category: 'concept',
      difficulty: 'Easy',
      estimatedMinutes: 8,
      visualPreviewType: 'insert-delete',
    },
  ],
  patterns: [
    {
      id: 'traversal-frequency-counting',
      patternNumber: '01',
      title: 'Traversal & Frequency Counting',
      shortDescription: 'Visit elements systematically and count how often values occur.',
      category: 'pattern',
      difficulty: 'Beginner',
      estimatedMinutes: 8,
      visualPreviewType: 'frequency-map',
      whenToUse: 'When you need to inspect every element or count occurrences.',
      commonProblemTypes: [
        'Find maximum/minimum',
        'Count occurrences',
        'Find duplicates',
        'Find unique elements',
        'Character/element frequency',
        'Build frequency maps',
      ],
      learningInsight: 'Many array problems begin with one simple operation: visit every element and extract useful information.',
    },
    {
      id: 'two-pointers',
      patternNumber: '02',
      title: 'Two Pointers',
      shortDescription: 'Use two indices that move strategically through an array.',
      category: 'pattern',
      difficulty: 'Medium',
      estimatedMinutes: 10,
      visualPreviewType: 'two-pointers',
      whenToUse: 'Look for problems involving pairs, ranges, sorted arrays, or searching from both ends.',
      commonProblemTypes: [
        'Two Sum in sorted arrays',
        'Pair with target sum',
        'Reverse array in place',
        'Remove duplicates in sorted array',
        'Container with most water',
        'Palindrome checking',
      ],
      learningInsight: 'Instead of checking every possible pair, use the structure of the problem to eliminate unnecessary work.',
    },
    {
      id: 'slow-fast-pointer',
      patternNumber: '03',
      title: 'Slow-Fast Pointer',
      shortDescription: 'Use two pointers moving at different speeds to detect or locate structure.',
      category: 'pattern',
      difficulty: 'Medium',
      estimatedMinutes: 10,
      visualPreviewType: 'slow-fast',
      whenToUse: 'When one pointer needs to explore while another tracks position or speed.',
      commonProblemTypes: [
        'Find middle element',
        'Detect cycles in index jumps',
        'Remove elements in-place',
        'Move zeroes to end',
        'Partitioning arrays',
        'Find repeated movement patterns',
      ],
      learningInsight: 'The key idea is not simply two pointers. The important idea is that the pointers have different movement rules.',
    },
    {
      id: 'sliding-window',
      patternNumber: '04',
      title: 'Sliding Window',
      shortDescription: 'Maintain a continuous subarray/window while expanding or shrinking it.',
      category: 'pattern',
      difficulty: 'Medium',
      estimatedMinutes: 12,
      visualPreviewType: 'sliding-window',
      whenToUse: 'Look for contiguous subarray or substring problems.',
      commonProblemTypes: [
        'Maximum sum subarray of size K',
        'Minimum-length subarray with target sum',
        'Longest subarray with condition',
        'Maximum distinct elements in window',
        'Subarray with target constraints',
      ],
      learningInsight: 'Instead of recalculating every subarray from scratch, maintain information about the current window.',
    },
    {
      id: 'prefix-sum',
      patternNumber: '05',
      title: 'Prefix Sum',
      shortDescription: 'Precompute cumulative sums to answer range-sum queries efficiently.',
      category: 'pattern',
      difficulty: 'Easy',
      estimatedMinutes: 10,
      visualPreviewType: 'prefix-bars',
      whenToUse: 'When multiple queries ask for sums of continuous ranges.',
      commonProblemTypes: [
        'Range sum queries in O(1)',
        'Subarray sum equals K',
        'Find pivot / equilibrium index',
        '2D matrix subgrid sums',
        'Running product / cumulative metrics',
      ],
      learningInsight: 'Do expensive work once, then answer repeated queries quickly.',
    },
    {
      id: 'suffix-sum',
      patternNumber: '06',
      title: 'Suffix Sum',
      shortDescription: 'Precompute cumulative information from right to left.',
      category: 'pattern',
      difficulty: 'Easy',
      estimatedMinutes: 8,
      visualPreviewType: 'suffix-bars',
      whenToUse: 'When each element depends on information from elements to its right.',
      commonProblemTypes: [
        'Right-side sum queries',
        'Product/sum of elements after index',
        'Right-side comparisons (Leaders)',
        'Trapping rain water right-wall tracking',
        'Combining with prefix information',
      ],
      learningInsight: 'Prefix works from left → right. Suffix works from right → left.',
    },
    {
      id: 'prefix-suffix',
      patternNumber: '07',
      title: 'Prefix + Suffix',
      shortDescription: 'Combine information from both sides of an element.',
      category: 'pattern',
      difficulty: 'Medium',
      estimatedMinutes: 12,
      visualPreviewType: 'prefix-suffix',
      whenToUse: 'When the answer depends on both the left side and right side of each position.',
      commonProblemTypes: [
        'Product of array except self',
        'Trapping Rain Water',
        'Equilibrium index',
        'Left/right maximum comparisons',
        'Best split position',
      ],
      learningInsight: 'Many difficult-looking array problems become simpler when you precompute what exists on both sides.',
    },
  ],
  stats: {
    totalLessons: 11,
    estimatedHours: 1.8,
  },
};
