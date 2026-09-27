import { Lesson } from '../../../types/learning';

export const slowFastPointerLesson: Lesson = {
  id: 'slow-fast-pointer',
  topicId: 'arrays',
  patternNumber: '03',
  title: 'Slow-Fast Pointer',
  shortDescription: 'Use two pointers moving at different speeds to detect or locate structure.',
  category: 'pattern',
  difficulty: 'Medium',
  estimatedMinutes: 10,
  whenToUse: 'When one pointer needs to explore while another tracks position or speed.',
  commonProblemTypes: [
    'Find middle element of array/sequence',
    'Detect cycles in index-jump mappings (Floyd cycle detection)',
    'Remove duplicates in-place (slow = write pointer, fast = read pointer)',
    'Move zeroes to end in-place',
    'Partitioning arrays',
    'Find duplicate number in array of N+1 integers',
  ],
  learningInsight: 'The key idea is not simply two pointers. The important idea is that the pointers have different movement rules.',
  recognitionChecklist: [
    'Do you need one pointer to scan ahead while another tracks write position?',
    'Are you finding a midpoint without knowing the total length in advance?',
    'Is there an index-based cycle or repeated jump sequence?',
    'If YES → Slow-Fast Pointer.',
  ],
  bruteForceVsOptimized: {
    bruteComplexity: 'O(n) with extra memory or O(n²) deletion shifts',
    optimizedComplexity: 'O(n) time, O(1) space',
    observation: 'Deleting elements from arrays requires expensive shifting of remaining items.',
    explanation: 'A reader-writer slow/fast pointer pair rewrites valid items in-place in a single forward pass.',
  },
  commonMistakes: [
    {
      mistake: 'Confusing the roles of reader and writer pointers.',
      fix: 'Remember: fast always reads every item; slow only advances when a valid item is written.',
    },
    {
      mistake: 'In midpoint/cycle detection, moving fast past the array boundary without checking bounds.',
      fix: 'Always ensure fast and fast.next (or fast + 2) do not exceed array length.',
    },
    {
      mistake: 'Forgetting to return slow + 1 as the length of the deduplicated array.',
      fix: 'Since slow is 0-indexed, the number of unique elements is slow + 1.',
    },
  ],
  overview: 'Coordinate two pointers with different speeds (1x vs 2x) or different responsibilities (reader vs writer) to solve problems in-place without allocating auxiliary arrays.',
  complexity: {
    time: 'O(n)',
    space: 'O(1)',
    description: 'Fast pointer inspects each element once; modifications occur directly in memory.',
  },
  steps: [
    {
      id: 1,
      phase: 'problem',
      title: 'Step 1: The Problem & The Array',
      explanation: 'We are given a sorted array with duplicates: [1, 1, 2, 3, 3, 4]. Our goal is to remove duplicates IN-PLACE so that only unique elements remain at the start, using O(1) extra memory.',
      keyIdea: 'In-place means modifying the existing array directly without creating a new copy.',
      visualization: {
        type: 'array',
        elements: [
          { id: 0, value: 1, label: '0' },
          { id: 1, value: 1, label: '1' },
          { id: 2, value: 2, label: '2' },
          { id: 3, value: 3, label: '3' },
          { id: 4, value: 3, label: '4' },
          { id: 5, value: 4, label: '5' },
        ],
        callout: { text: 'Sorted array with duplicates. Memory constraint: O(1) auxiliary space.', type: 'info' },
      },
    },
    {
      id: 2,
      phase: 'brute-force',
      title: 'Step 2: Why Naive Deletion Fails',
      explanation: 'In physical memory, an array is contiguous. If you delete an element from the middle, all subsequent elements must shift left. Doing this for multiple duplicates degrades performance to O(n²)!',
      keyIdea: 'Physical array contiguity makes repeated deletions slow.',
      visualization: {
        type: 'array',
        elements: [
          { id: 0, value: 1, label: '0' },
          { id: 1, value: 1, label: '1', state: 'deleted', annotation: 'Delete?' },
          { id: 2, value: 2, label: '2', state: 'comparing', annotation: '← Shift' },
          { id: 3, value: 3, label: '3', state: 'comparing', annotation: '← Shift' },
          { id: 4, value: 3, label: '4', state: 'comparing', annotation: '← Shift' },
          { id: 5, value: 4, label: '5', state: 'comparing', annotation: '← Shift' },
        ],
        callout: { text: 'Deleting element 1 forces all subsequent items to shift left: O(n) per deletion!', type: 'warning' },
      },
    },
    {
      id: 3,
      phase: 'discovery',
      title: 'Step 3: Why Different Movement Rules?',
      explanation: 'Ordinary Two Pointers move from opposite ends. But that scrambles sorted order! Instead, we move two pointers in the SAME direction, but with DIFFERENT roles: one explores ahead (fast), and one manages the unique boundary (slow).',
      keyIdea: 'Different roles or speeds solve in-place modifications without shifting.',
      visualization: {
        type: 'slow-fast',
        elements: [
          { id: 0, value: 1, label: '0' },
          { id: 1, value: 1, label: '1' },
          { id: 2, value: 2, label: '2' },
          { id: 3, value: 3, label: '3' },
          { id: 4, value: 3, label: '4' },
          { id: 5, value: 4, label: '5' },
        ],
        callout: { text: 'Both pointers start near the beginning, moving left → right.', type: 'info' },
      },
    },
    {
      id: 4,
      phase: 'setup',
      title: 'Step 4: Introduce the Slow Pointer (The Writer)',
      explanation: 'We place the "slow" pointer at index 0. The element at arr[0] is guaranteed to be the first unique element. "slow" marks the boundary of our deduplicated list.',
      keyIdea: 'Slow only moves when a verified unique element needs to be written.',
      visualization: {
        type: 'slow-fast',
        elements: [
          { id: 0, value: 1, label: '0', state: 'active', annotation: 'Writer' },
          { id: 1, value: 1, label: '1' },
          { id: 2, value: 2, label: '2' },
          { id: 3, value: 3, label: '3' },
          { id: 4, value: 3, label: '4' },
          { id: 5, value: 4, label: '5' },
        ],
        pointers: [{ id: 'slow', name: 'slow (write)', index: 0, position: 'bottom', color: 'indigo', label: '0' }],
        variables: [{ name: 'slow', value: '0 (arr[0]=1)' }],
        callout: { text: 'Slow pointer initialized at index 0 (holds unique item 1).', type: 'info' },
      },
      codeSnippet: {
        language: 'python',
        code: `def remove_duplicates(nums):
    if not nums: return 0
    slow = 0`,
        activeLines: [3],
      },
    },
    {
      id: 5,
      phase: 'setup',
      title: 'Step 5: Introduce the Fast Pointer (The Reader)',
      explanation: 'We place the "fast" pointer at index 1. "fast" will scan forward element-by-element, inspecting every value.',
      keyIdea: 'Fast explores ahead; slow manages the curated result.',
      visualization: {
        type: 'slow-fast',
        elements: [
          { id: 0, value: 1, label: '0', state: 'active' },
          { id: 1, value: 1, label: '1', state: 'comparing', annotation: 'Reader' },
          { id: 2, value: 2, label: '2' },
          { id: 3, value: 3, label: '3' },
          { id: 4, value: 3, label: '4' },
          { id: 5, value: 4, label: '5' },
        ],
        pointers: [
          { id: 'slow', name: 'slow (write)', index: 0, position: 'bottom', color: 'indigo', label: '0' },
          { id: 'fast', name: 'fast (read)', index: 1, position: 'top', color: 'rose', label: '1' },
        ],
        variables: [
          { name: 'slow', value: '0 (arr[0]=1)' },
          { name: 'fast', value: '1 (arr[1]=1)' },
        ],
        callout: { text: 'Fast pointer placed at index 1 to inspect arr[1].', type: 'info' },
      },
      codeSnippet: {
        language: 'python',
        code: `    for fast in range(1, len(nums)):
        # Compare arr[fast] with arr[slow]`,
        activeLines: [1, 2],
      },
    },
    {
      id: 6,
      phase: 'decision',
      title: 'Step 6: Compare Positions & Encounter Duplicate',
      explanation: 'We compare arr[fast] (1) with arr[slow] (1). They are equal! Because it is a duplicate, we do NOT want to write it.',
      keyIdea: 'When duplicate is detected, slow stays put while fast moves on.',
      decision: {
        what: 'arr[fast] == arr[slow] (1 == 1).',
        why: 'Value 1 is already recorded at slow boundary.',
        result: 'Slow stays at 0. Fast advances to explore next slot.',
      },
      visualization: {
        type: 'slow-fast',
        elements: [
          { id: 0, value: 1, label: '0', state: 'active' },
          { id: 1, value: 1, label: '1', state: 'warning', annotation: 'Duplicate!' },
          { id: 2, value: 2, label: '2' },
          { id: 3, value: 3, label: '3' },
          { id: 4, value: 3, label: '4' },
          { id: 5, value: 4, label: '5' },
        ],
        pointers: [
          { id: 'slow', name: 'slow (stay)', index: 0, position: 'bottom', color: 'indigo' },
          { id: 'fast', name: 'fast →', index: 1, position: 'top', color: 'rose' },
        ],
        comparison: {
          expression: 'arr[fast] == arr[slow]',
          evaluation: '1 == 1',
          operator: '==',
          target: '1',
          outcome: 'Duplicate detected! Ignore and advance fast.',
          status: 'smaller',
        },
        callout: { text: 'arr[1] == arr[0] (duplicate). Fast moves, slow waits.', type: 'warning' },
      },
    },
    {
      id: 7,
      phase: 'execution',
      title: 'Step 7: Fast Advances to Index 2 (Discovers Value 2)',
      explanation: 'Fast moves to index 2 (value 2). Now compare arr[fast] (2) with arr[slow] (1): 2 != 1. A brand new unique value has been discovered!',
      keyIdea: 'Difference from arr[slow] signals a new unique number.',
      decision: {
        what: 'arr[fast] (2) != arr[slow] (1).',
        why: 'Found a new unique element.',
        result: 'Advance slow to index 1, then copy arr[fast] into arr[slow].',
      },
      visualization: {
        type: 'slow-fast',
        elements: [
          { id: 0, value: 1, label: '0', state: 'success' },
          { id: 1, value: 1, label: '1', state: 'muted' },
          { id: 2, value: 2, label: '2', state: 'active', annotation: 'New Unique!' },
          { id: 3, value: 3, label: '3' },
          { id: 4, value: 3, label: '4' },
          { id: 5, value: 4, label: '5' },
        ],
        pointers: [
          { id: 'slow', name: 'slow', index: 0, position: 'bottom', color: 'indigo' },
          { id: 'fast', name: 'fast', index: 2, position: 'top', color: 'emerald', label: 'val 2' },
        ],
        callout: { text: 'arr[2] = 2 != 1. Unique number found!', type: 'success' },
      },
      codeSnippet: {
        language: 'python',
        code: `        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]`,
        activeLines: [1, 2, 3],
      },
    },
    {
      id: 8,
      phase: 'action',
      title: 'Step 8: Write Unique Value In-Place',
      explanation: 'Slow advances to index 1, and we copy 2 into arr[1]. The unique prefix is now [1, 2]. Notice: we did not allocate any extra arrays!',
      keyIdea: 'Overwriting duplicates in-place keeps space complexity O(1).',
      visualization: {
        type: 'slow-fast',
        elements: [
          { id: 0, value: 1, label: '0', state: 'success' },
          { id: 1, value: 2, label: '1', state: 'success', annotation: 'Written!' },
          { id: 2, value: 2, label: '2', state: 'muted' },
          { id: 3, value: 3, label: '3' },
          { id: 4, value: 3, label: '4' },
          { id: 5, value: 4, label: '5' },
        ],
        pointers: [
          { id: 'slow', name: 'slow (write)', index: 1, position: 'bottom', color: 'emerald', label: '1' },
          { id: 'fast', name: 'fast (read)', index: 2, position: 'top', color: 'indigo', label: '2' },
        ],
        variables: [
          { name: 'Unique count', value: '2 items ([1, 2])', highlight: true, color: 'emerald' },
        ],
        callout: { text: 'Value 2 written to arr[1]. Unique boundary expanded!', type: 'success' },
      },
    },
    {
      id: 9,
      phase: 'think',
      title: 'Step 9: Pause & Think Checkpoint',
      explanation: 'Fast now moves to index 3 with value 3. Test your prediction on what happens next.',
      keyIdea: 'Predict the reader-writer coordination.',
      checkpoint: {
        prompt: 'Current state: slow is at index 1 (value 2). Fast is at index 3 (value 3).',
        question: 'Because arr[fast] (3) != arr[slow] (2), what exact steps occur?',
        options: [
          {
            id: 'A',
            text: 'Slow moves to index 2, and arr[2] is overwritten with 3',
            isCorrect: true,
            explanation: 'Correct! slow increments from 1 to 2, and writes value 3 into position arr[2].',
          },
          {
            id: 'B',
            text: 'Slow jumps to index 3 directly',
            isCorrect: false,
            explanation: 'Incorrect. Slow must increment one index at a time to maintain contiguous unique elements.',
          },
          {
            id: 'C',
            text: 'Fast resets to 0',
            isCorrect: false,
            explanation: 'Incorrect. Fast only moves forward toward the end of the array.',
          },
        ],
      },
      visualization: {
        type: 'slow-fast',
        elements: [
          { id: 0, value: 1, label: '0', state: 'success' },
          { id: 1, value: 2, label: '1', state: 'success' },
          { id: 2, value: 2, label: '2', state: 'muted' },
          { id: 3, value: 3, label: '3', state: 'active', annotation: 'Think!' },
          { id: 4, value: 3, label: '4' },
          { id: 5, value: 4, label: '5' },
        ],
        pointers: [
          { id: 'slow', name: 'slow', index: 1, position: 'bottom', color: 'indigo' },
          { id: 'fast', name: 'fast', index: 3, position: 'top', color: 'amber' },
        ],
      },
    },
    {
      id: 10,
      phase: 'execution',
      title: 'Step 10: Complete Deduplication Result',
      explanation: 'Continuing the process through all elements yields: arr[0..3] = [1, 2, 3, 4]. The first 4 elements contain all unique values, completed in a single pass!',
      keyIdea: 'Single pass in-place rewrite leaves the array cleanly deduplicated.',
      visualization: {
        type: 'slow-fast',
        elements: [
          { id: 0, value: 1, state: 'success', annotation: 'Unique' },
          { id: 1, value: 2, state: 'success', annotation: 'Unique' },
          { id: 2, value: 3, state: 'success', annotation: 'Unique' },
          { id: 3, value: 4, state: 'success', annotation: 'Unique' },
          { id: 4, value: 3, state: 'muted' },
          { id: 5, value: 4, state: 'muted' },
        ],
        variables: [
          { name: 'slow', value: '3' },
          { name: 'Unique count (slow + 1)', value: '4 elements', highlight: true, color: 'emerald' },
        ],
        callout: { text: 'Complete! Unique prefix: [1, 2, 3, 4]. Total unique count = 4.', type: 'success' },
      },
    },
    {
      id: 11,
      phase: 'discovery',
      title: 'Step 11: The Speed Disparity Variant (Floyd\'s Tortoise & Hare)',
      explanation: 'Slow-Fast pointer also has a second powerful variant: speed disparity. If slow moves 1 step per turn and fast moves 2 steps, when fast reaches the end, slow is at the EXACT MIDPOINT! In circular sequences, fast will catch slow to detect cycles.',
      keyIdea: 'Speed disparity (1x vs 2x) detects midpoints and cycles.',
      visualization: {
        type: 'slow-fast',
        elements: [
          { id: 0, value: 'A', label: 'Start' },
          { id: 1, value: 'B' },
          { id: 2, value: 'C', state: 'active', annotation: 'Midpoint' },
          { id: 3, value: 'D' },
          { id: 4, value: 'E', state: 'active', annotation: 'End' },
        ],
        pointers: [
          { id: 'slow', name: 'slow (1x)', index: 2, position: 'bottom', color: 'indigo', label: 'Mid' },
          { id: 'fast', name: 'fast (2x)', index: 4, position: 'top', color: 'rose', label: 'End' },
        ],
        callout: { text: 'Fast at 2x speed reaches the end when slow at 1x reaches the exact midpoint.', type: 'formula' },
      },
    },
    {
      id: 12,
      phase: 'code',
      title: 'Step 12: Synchronized Code Implementation',
      explanation: 'Look at the elegance of the in-place deduplication code. Only 8 lines of code with zero extra memory allocations.',
      keyIdea: 'Concise, optimal, and interview-ready.',
      visualization: {
        type: 'slow-fast',
        elements: [
          { id: 0, value: 1, state: 'success' },
          { id: 1, value: 2, state: 'success' },
          { id: 2, value: 3, state: 'success' },
          { id: 3, value: 4, state: 'success' },
          { id: 4, value: 3, state: 'muted' },
          { id: 5, value: 4, state: 'muted' },
        ],
      },
      codeSnippet: {
        language: 'python',
        code: `def remove_duplicates(nums):
    if not nums: return 0
    slow = 0
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    return slow + 1`,
        activeLines: [3, 4, 5, 6, 7, 8],
      },
    },
    {
      id: 13,
      phase: 'complexity',
      title: 'Step 13: Complexity Analysis',
      explanation: 'The fast pointer inspects each element once: O(n) runtime. Overwriting is done in-place within the input array, consuming O(1) auxiliary memory.',
      keyIdea: 'O(n) time and O(1) space.',
      visualization: {
        type: 'slow-fast',
        elements: [
          { id: 0, value: 1, state: 'success' },
          { id: 1, value: 2, state: 'success' },
          { id: 2, value: 3, state: 'success' },
          { id: 3, value: 4, state: 'success' },
          { id: 4, value: 3, state: 'muted' },
          { id: 5, value: 4, state: 'muted' },
        ],
        complexityBar: {
          bruteLabel: 'Deletion Shifts O(n²)',
          bruteScore: 80,
          optimizedLabel: 'Slow-Fast In-Place O(n)',
          optimizedScore: 20,
        },
        callout: { text: 'Time: O(n) · Space: O(1) strictly in-place.', type: 'info' },
      },
    },
    {
      id: 14,
      phase: 'summary',
      title: 'Step 14: Mental Model & Memory Hook',
      explanation: 'Whenever you need in-place array curation, midpoint location, or cycle detection, recall this essential mental model.',
      keyIdea: 'Different speeds or roles produce different positions.',
      memoryHook: 'Different speeds → Different positions',
      visualization: {
        type: 'slow-fast',
        elements: [
          { id: 0, value: 1, state: 'success' },
          { id: 1, value: 2, state: 'success' },
          { id: 2, value: 3, state: 'success' },
          { id: 3, value: 4, state: 'success' },
          { id: 4, value: 3, state: 'muted' },
          { id: 5, value: 4, state: 'muted' },
        ],
        callout: { text: 'Pattern mastered: Different speeds → Different positions!', type: 'success' },
      },
    },
  ],
  challenge: {
    question: 'In in-place duplicate removal, what role does the slow pointer serve?',
    options: [
      { id: 'A', text: 'It scans ahead to preview future numbers', explanation: 'Scanning ahead is the job of the fast pointer.' },
      { id: 'B', text: 'It marks the boundary of unique elements placed so far', explanation: 'Correct! The slow pointer represents the index where the next unique value should be stored.' },
      { id: 'C', text: 'It deletes elements from RAM', explanation: 'Array sizes in memory are fixed; slow simply overwrites values in-place.' },
      { id: 'D', text: 'It counts how many times 0 appears', explanation: 'No.' },
    ],
    correctOptionId: 'B',
    hint: 'Think about reader vs writer roles in array algorithms.',
  },
  takeaways: [
    'Different pointer speeds or movement rules solve problems in-place without extra memory.',
    'Fast reads; slow writes and tracks boundary.',
    'Memory Hook: "Different speeds → Different positions".',
  ],
};
