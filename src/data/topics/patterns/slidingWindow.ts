import { Lesson } from '../../../types/learning';

export const slidingWindowLesson: Lesson = {
  id: 'sliding-window',
  topicId: 'arrays',
  patternNumber: '04',
  title: 'Sliding Window',
  shortDescription: 'Maintain a continuous subarray/window while expanding or shrinking it.',
  category: 'pattern',
  difficulty: 'Medium',
  estimatedMinutes: 12,
  whenToUse: 'Look for contiguous subarray or substring problems.',
  commonProblemTypes: [
    'Maximum sum subarray of size K',
    'Minimum-length subarray with target sum',
    'Longest subarray with condition',
    'Maximum distinct elements in window',
    'Subarray with target constraints',
  ],
  learningInsight: 'Instead of recalculating every subarray from scratch, maintain information about the current window.',
  recognitionChecklist: [
    'Is the problem asking about a contiguous subarray or substring?',
    'Do you need to find the longest, shortest, or maximum/minimum value of a range?',
    'Can you compute the next window state by subtracting the element that leaves and adding the element that enters?',
    'If YES → Sliding Window.',
  ],
  bruteForceVsOptimized: {
    bruteComplexity: 'O(n · k)',
    optimizedComplexity: 'O(n)',
    observation: 'Recalculating every k-element window from scratch repeats work on k - 1 overlapping items.',
    explanation: 'Sliding the window reuses overlapping sums in O(1) time per step.',
  },
  commonMistakes: [
    {
      mistake: 'Recalculating sum(arr[i:i+k]) inside the loop, destroying the O(n) benefit.',
      fix: 'Maintain a running window_sum variable: subtract leaving element and add entering element.',
    },
    {
      mistake: 'Off-by-one errors when setting initial window boundaries.',
      fix: 'Initialize sum using arr[0:k], then loop from index k to len(arr) - 1.',
    },
    {
      mistake: 'Updating the answer before adding the entering element.',
      fix: 'Always apply the entering element to the window state before comparing against the running max/min.',
    },
  ],
  overview: 'Maintain a continuous window over an array. As the window slides forward, efficiently update state by removing elements leaving the left and adding elements entering the right.',
  complexity: {
    time: 'O(n)',
    space: 'O(1)',
    description: 'Each element enters the window once and leaves once: at most 2n operations total.',
  },
  steps: [
    {
      id: 1,
      phase: 'problem',
      title: 'Step 1: The Problem & The Array',
      explanation: 'Given the array [2, 1, 5, 2, 3, 2], find the maximum sum of any contiguous subarray of size k = 3.',
      keyIdea: 'Contiguous means the elements must be consecutive with no gaps.',
      visualization: {
        type: 'array',
        elements: [
          { id: 0, value: 2, label: '0' },
          { id: 1, value: 1, label: '1' },
          { id: 2, value: 5, label: '2' },
          { id: 3, value: 2, label: '3' },
          { id: 4, value: 3, label: '4' },
          { id: 5, value: 2, label: '5' },
        ],
        variables: [{ name: 'Window size k', value: '3' }],
        callout: { text: 'Array: [2, 1, 5, 2, 3, 2]. Find max sum of 3 consecutive elements.', type: 'info' },
      },
    },
    {
      id: 2,
      phase: 'brute-force',
      title: 'Step 2: Why Brute Force Repeats Work',
      explanation: 'A brute force approach calculates 2+1+5=8. Then it calculates 1+5+2=8. Notice: elements 1 and 5 were added twice! For large k, recalculating overlapping items wastes O(n · k) time.',
      keyIdea: 'Overlapping elements are computed repeatedly in brute force.',
      visualization: {
        type: 'sliding-window',
        elements: [
          { id: 0, value: 2, label: '0', state: 'highlight' },
          { id: 1, value: 1, label: '1', state: 'active', annotation: 'Overlap!' },
          { id: 2, value: 5, label: '2', state: 'active', annotation: 'Overlap!' },
          { id: 3, value: 2, label: '3', state: 'highlight' },
          { id: 4, value: 3, label: '4' },
          { id: 5, value: 2, label: '5' },
        ],
        window: { startIndex: 0, endIndex: 2, label: 'Window 1' },
        complexityBar: {
          bruteLabel: 'Brute Force Overlaps O(n·k)',
          bruteScore: 80,
          optimizedLabel: 'Sliding Window O(n)',
          optimizedScore: 20,
        },
        callout: { text: 'Notice the overlap: elements 1 and 5 are shared between adjacent windows!', type: 'warning' },
      },
    },
    {
      id: 3,
      phase: 'discovery',
      title: 'Step 3: The Core Clue — What Actually Changes?',
      explanation: 'When we move from window [2, 1, 5] to window [1, 5, 2], only TWO things happen: element 2 on the left LEAVES, and element 2 on the right ENTERS. The middle elements [1, 5] do not change!',
      keyIdea: 'New window sum = Old window sum - Leaving element + Entering element.',
      formula: 'windowSum = windowSum - arr[i - k] + arr[i]',
      visualization: {
        type: 'sliding-window',
        elements: [
          { id: 0, value: 2, label: '0', state: 'warning', annotation: 'Leaves (-2)' },
          { id: 1, value: 1, label: '1', state: 'muted' },
          { id: 2, value: 5, label: '2', state: 'muted' },
          { id: 3, value: 2, label: '3', state: 'success', annotation: 'Enters (+2)' },
          { id: 4, value: 3, label: '4' },
          { id: 5, value: 2, label: '5' },
        ],
        callout: { text: 'Subtract the element leaving the left; add the element entering the right.', type: 'formula' },
      },
    },
    {
      id: 4,
      phase: 'setup',
      title: 'Step 4: Establish the Initial Window (k = 3)',
      explanation: 'We sum the first 3 elements (indices 0..2): 2 + 1 + 5 = 8. Our initial window sum is 8, and our current maximum is 8.',
      keyIdea: 'Pre-compute the initial window before entering the slide loop.',
      visualization: {
        type: 'sliding-window',
        elements: [
          { id: 0, value: 2, label: '0', state: 'active' },
          { id: 1, value: 1, label: '1', state: 'active' },
          { id: 2, value: 5, label: '2', state: 'active' },
          { id: 3, value: 2, label: '3' },
          { id: 4, value: 3, label: '4' },
          { id: 5, value: 2, label: '5' },
        ],
        window: { startIndex: 0, endIndex: 2, label: 'Initial: Sum = 8' },
        variables: [
          { name: 'windowSum', value: '8 (2 + 1 + 5)' },
          { name: 'maxSum', value: '8', highlight: true, color: 'emerald' },
        ],
        callout: { text: 'First window [0..2]: sum = 8. maxSum initialized to 8.', type: 'info' },
      },
      codeSnippet: {
        language: 'python',
        code: `def max_sub_array_of_size_k(k, arr):
    window_sum = sum(arr[:k]) # 2 + 1 + 5 = 8
    max_sum = window_sum`,
        activeLines: [2, 3],
      },
    },
    {
      id: 5,
      phase: 'action',
      title: 'Step 5: Slide Window to Indices 1..3',
      explanation: 'We slide right. Element arr[0] (2) leaves: 8 - 2 = 6. Element arr[3] (2) enters: 6 + 2 = 8. New window sum is 8. maxSum remains 8.',
      keyIdea: 'Window slides forward by 1 in constant O(1) time.',
      decision: {
        what: 'Window moves from [0..2] to [1..3].',
        why: 'Subtract arr[0] (2) and add arr[3] (2).',
        result: 'New sum = 8 - 2 + 2 = 8. Max is still 8.',
      },
      visualization: {
        type: 'sliding-window',
        elements: [
          { id: 0, value: 2, label: '0', state: 'muted' },
          { id: 1, value: 1, label: '1', state: 'active' },
          { id: 2, value: 5, label: '2', state: 'active' },
          { id: 3, value: 2, label: '3', state: 'active' },
          { id: 4, value: 3, label: '4' },
          { id: 5, value: 2, label: '5' },
        ],
        window: { startIndex: 1, endIndex: 3, label: 'Window 2: Sum = 8' },
        variables: [
          { name: 'windowSum', value: '8 (8 - 2 + 2)' },
          { name: 'maxSum', value: '8' },
        ],
        callout: { text: 'Slid to [1..3]: sum = 8. maxSum = 8.', type: 'info' },
      },
      codeSnippet: {
        language: 'python',
        code: `    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)`,
        activeLines: [1, 2, 3],
      },
    },
    {
      id: 6,
      phase: 'decision',
      title: 'Step 6: Slide to Indices 2..4 (New Maximum!)',
      explanation: 'Slide again. Element arr[1] (1) leaves: 8 - 1 = 7. Element arr[4] (3) enters: 7 + 3 = 10! Because 10 > 8, we update our maximum sum to 10!',
      keyIdea: 'Update running maximum whenever the new window exceeds it.',
      comparison: {
        expression: 'New window sum',
        evaluation: '10',
        operator: '>',
        target: 'Previous max (8)',
        outcome: 'New maximum found! Update maxSum = 10.',
        status: 'success',
      },
      decision: {
        what: 'Subarray [5, 2, 3] sum is 10.',
        why: '10 is greater than current max (8).',
        result: 'maxSum updated from 8 to 10.',
      },
      visualization: {
        type: 'sliding-window',
        elements: [
          { id: 0, value: 2, label: '0', state: 'muted' },
          { id: 1, value: 1, label: '1', state: 'muted' },
          { id: 2, value: 5, label: '2', state: 'success' },
          { id: 3, value: 2, label: '3', state: 'success' },
          { id: 4, value: 3, label: '4', state: 'success' },
          { id: 5, value: 2, label: '5' },
        ],
        window: { startIndex: 2, endIndex: 4, label: 'Max: Sum = 10' },
        variables: [
          { name: 'windowSum', value: '10 (8 - 1 + 3)', highlight: true, color: 'emerald' },
          { name: 'maxSum', value: '10', highlight: true, color: 'emerald' },
        ],
        callout: { text: 'New maximum! [5, 2, 3] gives sum = 10.', type: 'success' },
      },
    },
    {
      id: 7,
      phase: 'think',
      title: 'Step 7: Pause & Think Checkpoint',
      explanation: 'We are now ready to slide to the final window: indices 3..5. Predict the calculation before seeing it.',
      keyIdea: 'Active prediction solidifies the subtraction-addition arithmetic.',
      checkpoint: {
        prompt: 'Current window is [2..4] with sum 10. The next window covers indices [3..5].',
        question: 'Which element leaves, which element enters, and what is the new sum?',
        options: [
          {
            id: 'A',
            text: 'arr[2] (5) leaves, arr[5] (2) enters. New sum = 10 - 5 + 2 = 7.',
            isCorrect: true,
            explanation: 'Correct! Element 5 leaves on the left, element 2 enters on the right. 10 - 5 + 2 = 7.',
          },
          {
            id: 'B',
            text: 'arr[1] (1) leaves, arr[5] (2) enters. New sum = 10 - 1 + 2 = 11.',
            isCorrect: false,
            explanation: 'Incorrect. Element arr[2] (5) is the one leaving the left boundary of window [2..4].',
          },
          {
            id: 'C',
            text: 'All elements are added from scratch.',
            isCorrect: false,
            explanation: 'Incorrect. Sliding window avoids adding from scratch.',
          },
        ],
      },
      visualization: {
        type: 'sliding-window',
        elements: [
          { id: 0, value: 2, label: '0', state: 'muted' },
          { id: 1, value: 1, label: '1', state: 'muted' },
          { id: 2, value: 5, label: '2', state: 'warning', annotation: 'Will Leave' },
          { id: 3, value: 2, label: '3', state: 'active' },
          { id: 4, value: 3, label: '4', state: 'active' },
          { id: 5, value: 2, label: '5', state: 'highlight', annotation: 'Will Enter' },
        ],
        window: { startIndex: 2, endIndex: 4, label: 'Current: 10' },
      },
    },
    {
      id: 8,
      phase: 'action',
      title: 'Step 8: Slide to Final Window [3..5]',
      explanation: 'We slide to indices 3..5: 10 - 5 + 2 = 7. Because 7 < 10, our maximum sum remains 10. The array scan is now complete!',
      keyIdea: 'When window reaches the end of the array, the algorithm terminates.',
      visualization: {
        type: 'sliding-window',
        elements: [
          { id: 0, value: 2, label: '0', state: 'muted' },
          { id: 1, value: 1, label: '1', state: 'muted' },
          { id: 2, value: 5, label: '2', state: 'muted' },
          { id: 3, value: 2, label: '3', state: 'active' },
          { id: 4, value: 3, label: '4', state: 'active' },
          { id: 5, value: 2, label: '5', state: 'active' },
        ],
        window: { startIndex: 3, endIndex: 5, label: 'Window 4: Sum = 7' },
        variables: [
          { name: 'windowSum', value: '7 (10 - 5 + 2)' },
          { name: 'Final maxSum', value: '10 (at [5, 2, 3])', highlight: true, color: 'emerald' },
        ],
        callout: { text: 'Array complete. Global maximum sum is 10!', type: 'success' },
      },
    },
    {
      id: 9,
      phase: 'discovery',
      title: 'Step 9: Fixed vs. Variable Size Windows',
      explanation: 'Sliding windows come in two flavors: Fixed Size (window size k is constant, like finding max sum of size k) and Variable Size (right boundary expands to satisfy a condition, left boundary shrinks when invalid, like finding longest substring with unique characters).',
      keyIdea: 'Fixed slides smoothly; variable expands right and contracts left dynamically.',
      visualization: {
        type: 'sliding-window',
        elements: [
          { id: 0, value: 'A', state: 'active' },
          { id: 1, value: 'B', state: 'active' },
          { id: 2, value: 'C', state: 'active' },
          { id: 3, value: 'B', state: 'warning', annotation: 'Duplicate!' },
          { id: 4, value: 'E' },
        ],
        window: { startIndex: 0, endIndex: 3, label: 'Variable: Shrink left on duplicate!' },
        callout: { text: 'Variable window: expand right until duplicate, then shrink left until valid.', type: 'info' },
      },
    },
    {
      id: 10,
      phase: 'code',
      title: 'Step 10: Synchronized Code Implementation',
      explanation: 'Notice how cleanly the sliding window is implemented. A single pass loop from index k to the end, updating the running sum in O(1) time.',
      keyIdea: 'No inner loops: one addition and one subtraction per iteration.',
      visualization: {
        type: 'sliding-window',
        elements: [
          { id: 0, value: 2, state: 'muted' },
          { id: 1, value: 1, state: 'muted' },
          { id: 2, value: 5, state: 'success' },
          { id: 3, value: 2, state: 'success' },
          { id: 4, value: 3, state: 'success' },
          { id: 5, value: 2, state: 'muted' },
        ],
        window: { startIndex: 2, endIndex: 4, label: 'Optimal Window [5, 2, 3]' },
      },
      codeSnippet: {
        language: 'python',
        code: `def max_sub_array_of_size_k(k, arr):
    if len(arr) < k: return 0
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum`,
        activeLines: [3, 4, 5, 6, 7, 8],
      },
    },
    {
      id: 11,
      phase: 'complexity',
      title: 'Step 11: Complexity Analysis (Where Does O(n) Come From?)',
      explanation: 'In an array of length n, the window slides n - k times. Each slide performs exactly 1 subtraction and 1 addition: O(1) work. Total time = O(k) initialization + (n - k) × O(1) = O(n). Auxiliary space is O(1).',
      keyIdea: 'Linear time O(n) replaces quadratic brute force O(n · k).',
      visualization: {
        type: 'sliding-window',
        elements: [
          { id: 0, value: 2, state: 'muted' },
          { id: 1, value: 1, state: 'muted' },
          { id: 2, value: 5, state: 'success' },
          { id: 3, value: 2, state: 'success' },
          { id: 4, value: 3, state: 'success' },
          { id: 5, value: 2, state: 'muted' },
        ],
        complexityBar: {
          bruteLabel: 'Brute Force Recalculation O(n·k)',
          bruteScore: 80,
          optimizedLabel: 'Sliding Window O(n)',
          optimizedScore: 20,
        },
        callout: { text: 'Time: O(n) · Space: O(1) auxiliary memory.', type: 'info' },
      },
    },
    {
      id: 12,
      phase: 'summary',
      title: 'Step 12: Mental Model & Memory Hook',
      explanation: 'Whenever you see "contiguous subarray/substring", "window of size k", or "longest range satisfying a condition", recall this essential mental model.',
      keyIdea: 'Expand right, maintain state, and shrink left when required.',
      memoryHook: 'Expand → Maintain → Shrink',
      visualization: {
        type: 'sliding-window',
        elements: [
          { id: 0, value: 2, state: 'muted' },
          { id: 1, value: 1, state: 'muted' },
          { id: 2, value: 5, state: 'success' },
          { id: 3, value: 2, state: 'success' },
          { id: 4, value: 3, state: 'success' },
          { id: 5, value: 2, state: 'muted' },
        ],
        window: { startIndex: 2, endIndex: 4, label: 'Max Window [5, 2, 3] = 10' },
        callout: { text: 'Pattern mastered: Expand → Maintain → Shrink!', type: 'success' },
      },
    },
  ],
  challenge: {
    question: 'Why does the sliding window technique run in O(n) time instead of O(n · k)?',
    options: [
      { id: 'A', text: 'It uses multi-threading on the CPU', explanation: 'No, it is a single-threaded mathematical optimization.' },
      { id: 'B', text: 'It reuses the overlapping sum by subtracting leaving elements and adding entering elements in O(1)', explanation: 'Correct! By reusing previous window calculations, each slide takes strictly O(1) time.' },
      { id: 'C', text: 'It sorts the array in O(n log n) first', explanation: 'Sorting would destroy contiguous subarray order.' },
      { id: 'D', text: 'It only checks every second element', explanation: 'Every contiguous window is inspected.' },
    ],
    correctOptionId: 'B',
    hint: 'Think about how much work is done per slide: exactly one subtraction and one addition.',
  },
  takeaways: [
    'Maintains running calculations over contiguous subarrays in O(n) total time.',
    'Applicable to fixed-size (size k) and variable-size (dynamic conditions) problems.',
    'Memory Hook: "Expand → Maintain → Shrink".',
  ],
};
