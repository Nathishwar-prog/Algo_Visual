import { Lesson } from '../../../types/learning';

export const twoPointersLesson: Lesson = {
  id: 'two-pointers',
  topicId: 'arrays',
  patternNumber: '02',
  title: 'Two Pointers',
  shortDescription: 'Solve array problems using two strategically moving pointers.',
  category: 'pattern',
  difficulty: 'Medium',
  estimatedMinutes: 10,
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
  recognitionChecklist: [
    'Is the input array sorted (or can it be sorted without breaking required indices)?',
    'Are you looking for a pair of numbers or comparing elements at opposite ends?',
    'Can moving one pointer decisively eliminate impossible candidates?',
    'If YES → Two Pointers.',
  ],
  bruteForceVsOptimized: {
    bruteComplexity: 'O(n²)',
    optimizedComplexity: 'O(n)',
    observation: 'Brute force checks all n(n-1)/2 pairs blindly.',
    explanation: 'Since the array is sorted, each comparison eliminates an entire row or column of impossible pairs.',
  },
  commonMistakes: [
    {
      mistake: 'Applying Two Pointers to an unsorted array without sorting first.',
      fix: 'Two pointer convergence relies on monotonic order. Ensure array is sorted.',
    },
    {
      mistake: 'Moving the wrong pointer (e.g. incrementing left when sum > target).',
      fix: 'When sum > target, decrement right to decrease the sum. When sum < target, increment left.',
    },
    {
      mistake: 'Loop boundary bug: using left <= right when pair elements must be distinct.',
      fix: 'Use while left < right so an element is not paired with itself.',
    },
  ],
  overview: 'The Two Pointers technique coordinates two index pointers to traverse toward each other or in lockstep, avoiding brute-force O(n²) nested loops.',
  complexity: {
    time: 'O(n)',
    space: 'O(1)',
    description: 'Pointers meet in at most n steps with zero extra memory.',
  },
  steps: [
    {
      id: 1,
      phase: 'problem',
      title: 'Step 1: The Problem & The Array',
      explanation: 'We are given an array of numbers: [1, 2, 4, 6, 8, 10]. We are asked to find two numbers that sum up to exactly 12.',
      keyIdea: 'Start by understanding the input structure before jumping to any code.',
      visualization: {
        type: 'array',
        elements: [
          { id: 0, value: 1, label: '0' },
          { id: 1, value: 2, label: '1' },
          { id: 2, value: 4, label: '2' },
          { id: 3, value: 6, label: '3' },
          { id: 4, value: 8, label: '4' },
          { id: 5, value: 10, label: '5' },
        ],
        callout: { text: 'Sorted array: [1, 2, 4, 6, 8, 10]. Goal: Find pair with sum = 12.', type: 'info' },
      },
    },
    {
      id: 2,
      phase: 'observe',
      title: 'Step 2: Key Observation — The Array Is Sorted',
      explanation: 'Look closely at the numbers. They are in strictly ascending order: 1 < 2 < 4 < 6 < 8 < 10. The smallest element is at the very beginning; the largest is at the very end.',
      keyIdea: 'Sorted order is the critical superpower that makes O(n) possible.',
      visualization: {
        type: 'array',
        elements: [
          { id: 0, value: 1, label: 'Smallest', state: 'highlight' },
          { id: 1, value: 2, label: '1' },
          { id: 2, value: 4, label: '2' },
          { id: 3, value: 6, label: '3' },
          { id: 4, value: 8, label: '4' },
          { id: 5, value: 10, label: 'Largest', state: 'highlight' },
        ],
        variables: [{ name: 'Target Sum', value: '12' }],
        callout: { text: 'Values increase monotonically from left to right.', type: 'info' },
      },
    },
    {
      id: 3,
      phase: 'brute-force',
      title: 'Step 3: What Does Brute Force Do?',
      explanation: 'A naive approach pairs element 1 with 2 (sum 3), then 1 with 4 (sum 5), then 1 with 6 (sum 7)... checking all n(n-1)/2 = 15 pairs! On large arrays of 100,000 items, that is 5 billion comparisons.',
      keyIdea: 'Brute force ignores sorted order and wastes quadratic time.',
      visualization: {
        type: 'array',
        elements: [
          { id: 0, value: 1, label: '0', state: 'active' },
          { id: 1, value: 2, label: '1', state: 'comparing' },
          { id: 2, value: 4, label: '2', state: 'comparing' },
          { id: 3, value: 6, label: '3', state: 'comparing' },
          { id: 4, value: 8, label: '4', state: 'comparing' },
          { id: 5, value: 10, label: '5', state: 'comparing' },
        ],
        complexityBar: {
          bruteLabel: 'Brute Force Pair Checks O(n²)',
          bruteScore: 85,
          optimizedLabel: 'Two Pointers O(n)',
          optimizedScore: 20,
        },
        callout: { text: 'Checking all pairs takes O(n²). Can we eliminate candidates intelligently?', type: 'warning' },
      },
    },
    {
      id: 4,
      phase: 'discovery',
      title: 'Step 4: The Core Clue — Boundary Inspection',
      explanation: 'What if we inspect the extreme boundaries? The absolute smallest number is arr[0], and the absolute largest number is arr[n-1].',
      keyIdea: 'Opposite-end boundaries constrain the entire range of possible sums.',
      visualization: {
        type: 'array',
        elements: [
          { id: 0, value: 1, label: '0', state: 'highlight', annotation: 'Min' },
          { id: 1, value: 2, label: '1' },
          { id: 2, value: 4, label: '2' },
          { id: 3, value: 3, label: '3' },
          { id: 4, value: 8, label: '4' },
          { id: 5, value: 10, label: '5', state: 'highlight', annotation: 'Max' },
        ],
        callout: { text: 'Min value: arr[0] = 1. Max value: arr[5] = 10.', type: 'info' },
      },
    },
    {
      id: 5,
      phase: 'setup',
      title: 'Step 5: Introduce the Left Pointer',
      explanation: 'Let us place our first pointer, "left", at index 0 (pointing to 1).',
      keyIdea: 'Only introduce one concept at a time.',
      visualization: {
        type: 'two-pointers',
        elements: [
          { id: 0, value: 1, label: '0', state: 'active' },
          { id: 1, value: 2, label: '1' },
          { id: 2, value: 4, label: '2' },
          { id: 3, value: 6, label: '3' },
          { id: 4, value: 8, label: '4' },
          { id: 5, value: 10, label: '5' },
        ],
        pointers: [{ id: 'left', name: 'left', index: 0, position: 'bottom', color: 'indigo', label: '1' }],
        variables: [{ name: 'left', value: '0 (arr[0]=1)' }],
        callout: { text: 'Left pointer initialized at index 0.', type: 'info' },
      },
      codeSnippet: {
        language: 'python',
        code: `def two_sum(arr, target):
    left = 0`,
        activeLines: [2],
      },
    },
    {
      id: 6,
      phase: 'setup',
      title: 'Step 6: Introduce the Right Pointer',
      explanation: 'Now introduce our second pointer, "right", at index 5 (pointing to 10). We now have our two boundary endpoints.',
      keyIdea: 'Left starts at min; right starts at max.',
      visualization: {
        type: 'two-pointers',
        elements: [
          { id: 0, value: 1, label: '0', state: 'active' },
          { id: 1, value: 2, label: '1' },
          { id: 2, value: 4, label: '2' },
          { id: 3, value: 6, label: '3' },
          { id: 4, value: 8, label: '4' },
          { id: 5, value: 10, label: '5', state: 'active' },
        ],
        pointers: [
          { id: 'left', name: 'left', index: 0, position: 'bottom', color: 'indigo', label: '1' },
          { id: 'right', name: 'right', index: 5, position: 'bottom', color: 'rose', label: '10' },
        ],
        variables: [
          { name: 'left', value: '0 (val 1)' },
          { name: 'right', value: '5 (val 10)' },
          { name: 'Target', value: '12' },
        ],
        callout: { text: 'Pointers placed at both ends: left=0, right=5.', type: 'info' },
      },
      codeSnippet: {
        language: 'python',
        code: `def two_sum(arr, target):
    left = 0
    right = len(arr) - 1`,
        activeLines: [3],
      },
    },
    {
      id: 7,
      phase: 'calculation',
      title: 'Step 7: Calculate the Current Sum',
      explanation: 'Let us add the values at our two pointers: arr[left] + arr[right] = 1 + 10 = 11. Now compare 11 with target 12.',
      keyIdea: 'Compare current sum directly with target to decide which pointer to adjust.',
      visualization: {
        type: 'two-pointers',
        elements: [
          { id: 0, value: 1, label: '0', state: 'active' },
          { id: 1, value: 2, label: '1' },
          { id: 2, value: 4, label: '2' },
          { id: 3, value: 6, label: '3' },
          { id: 4, value: 8, label: '4' },
          { id: 5, value: 10, label: '5', state: 'active' },
        ],
        pointers: [
          { id: 'left', name: 'left', index: 0, position: 'bottom', color: 'indigo', label: '1' },
          { id: 'right', name: 'right', index: 5, position: 'bottom', color: 'rose', label: '10' },
        ],
        comparison: {
          expression: 'arr[0] + arr[5] (1 + 10)',
          evaluation: '11',
          operator: '<',
          target: 12,
          outcome: 'Sum (11) is smaller than Target (12)',
          status: 'smaller',
        },
        variables: [
          { name: 'currentSum', value: '11 (1 + 10)', color: 'amber', highlight: true },
          { name: 'target', value: '12' },
        ],
        callout: { text: '1 + 10 = 11. Is 11 equal to 12? No, 11 < 12.', type: 'warning' },
      },
      codeSnippet: {
        language: 'python',
        code: `while left < right:
    current = arr[left] + arr[right] # 1 + 10 = 11
    if current == target:
        return [left, right]`,
        activeLines: [2, 3],
      },
    },
    {
      id: 8,
      phase: 'decision',
      title: 'Step 8: Why Move Left? (Reasoning Before Action)',
      explanation: 'Because our current sum (11) is too small, we need a LARGER sum. Decrementing right would pair with smaller numbers (8, 6, 4), making the sum even smaller! Therefore, the ONLY way to increase the sum is to increment the LEFT pointer.',
      keyIdea: 'Never move a pointer without first understanding WHY.',
      decision: {
        what: 'Current sum (11) < target (12).',
        why: 'Array is sorted. Moving right leftward decreases sum; moving left rightward increases sum.',
        result: 'Move left pointer rightward (left += 1).',
      },
      visualization: {
        type: 'two-pointers',
        elements: [
          { id: 0, value: 1, label: '0', state: 'active' },
          { id: 1, value: 2, label: '1', state: 'highlight' },
          { id: 2, value: 4, label: '2' },
          { id: 3, value: 6, label: '3' },
          { id: 4, value: 8, label: '4' },
          { id: 5, value: 10, label: '5', state: 'active' },
        ],
        pointers: [
          { id: 'left', name: 'left →', index: 0, position: 'bottom', color: 'indigo', label: 'Move me!' },
          { id: 'right', name: 'right', index: 5, position: 'bottom', color: 'rose', label: '10' },
        ],
        callout: { text: 'Crucial reasoning: Incrementing left is the only way to increase the sum!', type: 'formula' },
      },
      codeSnippet: {
        language: 'python',
        code: `    elif current < target:
        left += 1 # Advance left pointer to seek larger sum`,
        activeLines: [1, 2],
      },
    },
    {
      id: 9,
      phase: 'action',
      title: 'Step 9: Animate Left Pointer to Index 1',
      explanation: 'We advance left from index 0 to index 1 (arr[1] = 2). The right pointer stays firmly at index 5 (arr[5] = 10).',
      keyIdea: 'Only the relevant pointer moves; the other remains stationary.',
      visualization: {
        type: 'two-pointers',
        elements: [
          { id: 0, value: 1, label: '0', state: 'muted' },
          { id: 1, value: 2, label: '1', state: 'active', annotation: 'New left' },
          { id: 2, value: 4, label: '2' },
          { id: 3, value: 6, label: '3' },
          { id: 4, value: 8, label: '4' },
          { id: 5, value: 10, label: '5', state: 'active' },
        ],
        pointers: [
          { id: 'left', name: 'left', index: 1, position: 'bottom', color: 'indigo', label: '2' },
          { id: 'right', name: 'right', index: 5, position: 'bottom', color: 'rose', label: '10' },
        ],
        variables: [
          { name: 'left', value: '1 (arr[1]=2)' },
          { name: 'right', value: '5 (arr[5]=10)' },
        ],
        callout: { text: 'Left pointer moved to index 1 (value 2).', type: 'info' },
      },
    },
    {
      id: 10,
      phase: 'think',
      title: 'Step 10: Pause & Think Checkpoint',
      explanation: 'Now left is at value 2 and right is at value 10. Pause and test your prediction.',
      keyIdea: 'Active thinking reinforces the algorithm decision tree.',
      checkpoint: {
        prompt: 'Current pointers: arr[left] = 2, arr[right] = 10. Target = 12.',
        question: 'What is the sum of arr[left] + arr[right], and what action should occur?',
        options: [
          {
            id: 'A',
            text: 'Sum is 12 == target. We found the solution!',
            isCorrect: true,
            explanation: 'Correct! 2 + 10 = 12, which matches our target exactly. Return [1, 5] immediately.',
          },
          {
            id: 'B',
            text: 'Sum is 12, but we must continue checking until pointers cross.',
            isCorrect: false,
            explanation: 'Incorrect. Once target sum is found, we return the answer immediately.',
          },
          {
            id: 'C',
            text: 'Sum is too small, move left again.',
            isCorrect: false,
            explanation: 'Incorrect. 2 + 10 = 12, which is exactly equal to target 12.',
          },
        ],
      },
      visualization: {
        type: 'two-pointers',
        elements: [
          { id: 0, value: 1, label: '0', state: 'muted' },
          { id: 1, value: 2, label: '1', state: 'active' },
          { id: 2, value: 4, label: '2' },
          { id: 3, value: 6, label: '3' },
          { id: 4, value: 8, label: '4' },
          { id: 5, value: 10, label: '5', state: 'active' },
        ],
        pointers: [
          { id: 'left', name: 'left', index: 1, position: 'bottom', color: 'indigo', label: '2' },
          { id: 'right', name: 'right', index: 5, position: 'bottom', color: 'rose', label: '10' },
        ],
      },
    },
    {
      id: 11,
      phase: 'calculation',
      title: 'Step 11: Target Match Found!',
      explanation: 'arr[1] + arr[5] = 2 + 10 = 12! The sum equals our target exactly. We found the solution in just 2 comparisons instead of 15 brute-force checks!',
      keyIdea: 'Optimal pair found in O(n) linear steps.',
      comparison: {
        expression: 'arr[1] + arr[5] (2 + 10)',
        evaluation: '12',
        operator: '==',
        target: 12,
        outcome: 'Target Match! 12 == 12',
        status: 'success',
      },
      decision: {
        what: 'arr[1] (2) + arr[5] (10) = 12.',
        why: 'Sum matches target 12.',
        result: 'Return solution indices [1, 5].',
      },
      visualization: {
        type: 'two-pointers',
        elements: [
          { id: 0, value: 1, label: '0', state: 'muted' },
          { id: 1, value: 2, label: '1', state: 'success', annotation: 'Match' },
          { id: 2, value: 4, label: '2', state: 'muted' },
          { id: 3, value: 6, label: '3', state: 'muted' },
          { id: 4, value: 8, label: '4', state: 'muted' },
          { id: 5, value: 10, label: '5', state: 'success', annotation: 'Match' },
        ],
        pointers: [
          { id: 'left', name: 'left', index: 1, position: 'bottom', color: 'emerald', label: '2' },
          { id: 'right', name: 'right', index: 5, position: 'bottom', color: 'emerald', label: '10' },
        ],
        variables: [
          { name: 'arr[left]', value: '2' },
          { name: 'arr[right]', value: '10' },
          { name: 'Result', value: '[1, 5] (Match!)', highlight: true, color: 'emerald' },
        ],
        callout: { text: 'Match confirmed: arr[1] + arr[5] = 2 + 10 = 12!', type: 'success' },
      },
      codeSnippet: {
        language: 'python',
        code: `    if current == target:
        return [left, right] # Returns [1, 5]`,
        activeLines: [1, 2],
      },
    },
    {
      id: 12,
      phase: 'code',
      title: 'Step 12: Complete Synchronized Implementation',
      explanation: 'Here is the complete Two Pointers function. Notice how few lines of code it takes, and how directly it reflects our pointer decisions.',
      keyIdea: 'Code reflects the mathematical elimination of impossible pairs.',
      visualization: {
        type: 'two-pointers',
        elements: [
          { id: 0, value: 1, state: 'muted' },
          { id: 1, value: 2, state: 'success' },
          { id: 2, value: 4, state: 'muted' },
          { id: 3, value: 6, state: 'muted' },
          { id: 4, value: 8, state: 'muted' },
          { id: 5, value: 10, state: 'success' },
        ],
        variables: [{ name: 'Complexity', value: 'Time: O(n), Space: O(1)' }],
      },
      codeSnippet: {
        language: 'python',
        code: `def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            return [left, right]
        elif s < target:
            left += 1
        else:
            right -= 1
    return []`,
        activeLines: [2, 3, 4, 5, 6, 7, 8],
      },
    },
    {
      id: 13,
      phase: 'complexity',
      title: 'Step 13: Complexity Analysis (Where Does O(n) Come From?)',
      explanation: 'In the worst case, left moves right and right moves left. Each step moves at least one pointer closer to the other. They can move at most n total steps before meeting. Thus, time complexity is strictly O(n) with O(1) auxiliary memory.',
      keyIdea: 'Pointers only move toward each other, never backward.',
      visualization: {
        type: 'two-pointers',
        elements: [
          { id: 0, value: 1, state: 'muted' },
          { id: 1, value: 2, state: 'success' },
          { id: 2, value: 4, state: 'muted' },
          { id: 3, value: 6, state: 'muted' },
          { id: 4, value: 8, state: 'muted' },
          { id: 5, value: 10, state: 'success' },
        ],
        complexityBar: {
          bruteLabel: 'Brute Force Pairs O(n²)',
          bruteScore: 85,
          optimizedLabel: 'Two Pointers O(n)',
          optimizedScore: 20,
        },
        callout: { text: 'At most n total pointer steps → Guaranteed O(n) runtime.', type: 'info' },
      },
    },
    {
      id: 14,
      phase: 'summary',
      title: 'Step 14: Mental Model & Memory Hook',
      explanation: 'Whenever you have a sorted array and need to find pairs or scan from both ends, recall this essential mental model.',
      keyIdea: 'Two positions, compare values, and move intelligently.',
      memoryHook: 'Two positions → Compare → Move intelligently',
      visualization: {
        type: 'two-pointers',
        elements: [
          { id: 0, value: 1, state: 'muted' },
          { id: 1, value: 2, state: 'success' },
          { id: 2, value: 4, state: 'muted' },
          { id: 3, value: 6, state: 'muted' },
          { id: 4, value: 8, state: 'muted' },
          { id: 5, value: 10, state: 'success' },
        ],
        callout: { text: 'Pattern mastered: Two positions → Compare → Move intelligently!', type: 'success' },
      },
    },
  ],
  challenge: {
    question: 'In a sorted array, if arr[left] + arr[right] is greater than target, which move is correct?',
    options: [
      { id: 'A', text: 'Increment left (left += 1)', explanation: 'Incrementing left on a sorted array moves to a larger value, increasing the sum further!' },
      { id: 'B', text: 'Decrement right (right -= 1)', explanation: 'Correct! Decrementing right moves to a smaller value, reducing the sum toward the target.' },
      { id: 'C', text: 'Reset left to 0', explanation: 'Resetting would cause infinite loops and redundant work.' },
      { id: 'D', text: 'Stop and return None', explanation: 'You cannot stop until pointers cross.' },
    ],
    correctOptionId: 'B',
    hint: 'To decrease the sum, move inward from the larger end.',
  },
  takeaways: [
    'Two Pointers converts O(n²) pair comparisons into clean O(n) linear scans.',
    'Requires sorted order or symmetric structure (like palindromes).',
    'Memory Hook: "Two positions → Compare → Move intelligently".',
  ],
};
