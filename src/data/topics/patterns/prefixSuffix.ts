import { Lesson } from '../../../types/learning';

export const prefixSuffixLesson: Lesson = {
  id: 'prefix-suffix',
  topicId: 'arrays',
  patternNumber: '07',
  title: 'Prefix + Suffix',
  shortDescription: 'Combine information from both sides of an element.',
  category: 'pattern',
  difficulty: 'Medium',
  estimatedMinutes: 12,
  whenToUse: 'When the answer depends on both the left side and right side of each position.',
  commonProblemTypes: [
    'Product of array except self',
    'Trapping Rain Water',
    'Equilibrium index (where left sum == right sum)',
    'Left/right maximum comparisons',
    'Best split position / array partition',
  ],
  learningInsight: 'Many difficult-looking array problems become simpler when you precompute what exists on both sides.',
  recognitionChecklist: [
    'Does the answer for index i depend on elements strictly to the left AND strictly to the right?',
    'Can you precompute left context in one forward pass and right context in one backward pass?',
    'Can you combine left[i] and right[i] in O(1) to find the final result?',
    'If YES → Prefix + Suffix.',
  ],
  bruteForceVsOptimized: {
    bruteComplexity: 'O(n²)',
    optimizedComplexity: 'O(n)',
    observation: 'Scanning left and right for every element individually takes O(n) per element.',
    explanation: 'Two linear passes (prefix and suffix) allow every element to combine left and right answers in O(1).',
  },
  commonMistakes: [
    {
      mistake: 'Accidentally including arr[i] when the problem asks for strictly left and right elements.',
      fix: 'Use prefix[i - 1] and suffix[i + 1] to exclude the current index, or offset prefix products by 1.',
    },
    {
      mistake: 'Using division in "Product of Array Except Self" when forbidden or mishandling zeroes.',
      fix: 'Precomputing prefix products and suffix products avoids division entirely and handles zeroes seamlessly.',
    },
    {
      mistake: 'Allocating two separate arrays when one can be accumulated on-the-fly.',
      fix: 'First store prefix in the result array, then run a backward loop maintaining a running suffix variable.',
    },
  ],
  overview: 'Combine precomputed left-side information with right-side information to answer two-sided queries for every position in an array in O(n) total time.',
  complexity: {
    time: 'O(n)',
    space: 'O(n) with separate arrays, or O(1) extra space with a running variable',
    description: 'Two linear passes compute left and right contexts; combination takes O(1) per element.',
  },
  steps: [
    {
      id: 1,
      phase: 'problem',
      title: 'Step 1: The Problem — Product Except Self',
      explanation: 'Given array [3, 1, 2, 5, 4], compute an output array where output[i] is the product of all elements in arr except arr[i]. Constraint: You CANNOT use division!',
      keyIdea: 'We need the combined product of all numbers to the left and all numbers to the right of each index.',
      visualization: {
        type: 'array',
        elements: [
          { id: 0, value: 3, label: '0' },
          { id: 1, value: 1, label: '1' },
          { id: 2, value: 2, label: '2' },
          { id: 3, value: 5, label: '3' },
          { id: 4, value: 4, label: '4' },
        ],
        callout: { text: 'Array: [3, 1, 2, 5, 4]. For each index i, multiply everything EXCEPT arr[i].', type: 'info' },
      },
    },
    {
      id: 2,
      phase: 'brute-force',
      title: 'Step 2: Why Division Fails & Why Brute Force Is Slow',
      explanation: 'Dividing total product by arr[i] crashes if there are zeroes in the array. Brute force loops through all other elements for each index, resulting in n × (n - 1) multiplications: O(n²) time!',
      keyIdea: 'Division is fragile with zeroes; nested loops are quadratic.',
      visualization: {
        type: 'array',
        elements: [
          { id: 0, value: 3, state: 'comparing' },
          { id: 1, value: 1, state: 'comparing' },
          { id: 2, value: 2, state: 'active', annotation: 'Excluded' },
          { id: 3, value: 5, state: 'comparing' },
          { id: 4, value: 4, state: 'comparing' },
        ],
        complexityBar: {
          bruteLabel: 'Brute Force Multiplications O(n²)',
          bruteScore: 85,
          optimizedLabel: 'Prefix + Suffix O(n)',
          optimizedScore: 20,
        },
        callout: { text: 'Brute force does n multiplications per element → O(n²) total.', type: 'warning' },
      },
    },
    {
      id: 3,
      phase: 'discovery',
      title: 'Step 3: The Core Clue — Deconstruct into Left & Right',
      explanation: 'Look at index 2 (value 2). Elements to its left are [3, 1] (product = 3 × 1 = 3). Elements to its right are [5, 4] (product = 5 × 4 = 20). The answer for index 2 is simply: Left Product × Right Product = 3 × 20 = 60!',
      keyIdea: 'Every element\'s answer is: (Left Information) × (Right Information).',
      formula: 'answer[i] = leftProduct[i] * rightProduct[i]',
      decision: {
        what: 'Target index 2 (value 2).',
        why: 'Left elements [3, 1] have product 3; right elements [5, 4] have product 20.',
        result: 'Total product = 3 × 20 = 60.',
      },
      visualization: {
        type: 'prefix-suffix',
        elements: [
          { id: 0, value: 3, label: 'Left', state: 'highlight' },
          { id: 1, value: 1, label: 'Left', state: 'highlight' },
          { id: 2, value: 2, label: 'Excluded', state: 'active' },
          { id: 3, value: 5, label: 'Right', state: 'warning' },
          { id: 4, value: 4, label: 'Right', state: 'warning' },
        ],
        comparison: {
          expression: 'Left (3 × 1) × Right (5 × 4)',
          evaluation: '3 × 20 = 60',
          operator: '==',
          target: 'answer[2]',
          outcome: 'Answer for index 2 is 60!',
          status: 'success',
        },
        callout: { text: 'Decomposition: Left product (3) × Right product (20) = 60.', type: 'formula' },
      },
    },
    {
      id: 4,
      phase: 'setup',
      title: 'Step 4: Build Prefix Products (Left to Right)',
      explanation: 'We precompute prefix products: prefix[i] stores the product of all elements to the left of index i. For index 0, there is nothing to the left, so prefix[0] = 1. Prefix products: [1, 3, 3, 6, 30].',
      keyIdea: 'prefix[i] = prefix[i - 1] * arr[i - 1].',
      visualization: {
        type: 'prefix-suffix',
        elements: [
          { id: 0, value: 3, label: '0' },
          { id: 1, value: 1, label: '1' },
          { id: 2, value: 2, label: '2' },
          { id: 3, value: 5, label: '3' },
          { id: 4, value: 4, label: '4' },
        ],
        secondaryElements: [
          { id: 'p0', value: 1, label: 'P[0]=1', state: 'success' },
          { id: 'p1', value: 3, label: 'P[1]=3', state: 'success' },
          { id: 'p2', value: 3, label: 'P[2]=3', state: 'success' },
          { id: 'p3', value: 6, label: 'P[3]=6', state: 'success' },
          { id: 'p4', value: 30, label: 'P[4]=30', state: 'success' },
        ],
        secondaryTitle: 'Prefix Products (Left Context)',
        callout: { text: 'Prefix products built: [1, 3, 3, 6, 30].', type: 'info' },
      },
      codeSnippet: {
        language: 'python',
        code: `prefix = [1] * n
for i in range(1, n):
    prefix[i] = prefix[i - 1] * arr[i - 1]`,
        activeLines: [1, 2, 3],
      },
    },
    {
      id: 5,
      phase: 'setup',
      title: 'Step 5: Build Suffix Products (Right to Left)',
      explanation: 'We precompute suffix products: suffix[i] stores the product of all elements to the right of index i. For index 4, there is nothing to the right, so suffix[4] = 1. Suffix products: [40, 40, 20, 4, 1].',
      keyIdea: 'suffix[i] = suffix[i + 1] * arr[i + 1].',
      visualization: {
        type: 'prefix-suffix',
        elements: [
          { id: 0, value: 3, label: '0' },
          { id: 1, value: 1, label: '1' },
          { id: 2, value: 2, label: '2' },
          { id: 3, value: 5, label: '3' },
          { id: 4, value: 4, label: '4' },
        ],
        secondaryElements: [
          { id: 'p0', value: 1, label: 'P[0]=1' },
          { id: 'p1', value: 3, label: 'P[1]=3' },
          { id: 'p2', value: 3, label: 'P[2]=3' },
          { id: 'p3', value: 6, label: 'P[3]=6' },
          { id: 'p4', value: 30, label: 'P[4]=30' },
        ],
        secondaryTitle: 'Prefix Products (Left Context)',
        tertiaryElements: [
          { id: 's0', value: 40, label: 'S[0]=40', state: 'success' },
          { id: 's1', value: 40, label: 'S[1]=40', state: 'success' },
          { id: 's2', value: 20, label: 'S[2]=20', state: 'success' },
          { id: 's3', value: 4, label: 'S[3]=4', state: 'success' },
          { id: 's4', value: 1, label: 'S[4]=1', state: 'success' },
        ],
        tertiaryTitle: 'Suffix Products (Right Context)',
        callout: { text: 'Suffix products built: [40, 40, 20, 4, 1].', type: 'info' },
      },
      codeSnippet: {
        language: 'python',
        code: `suffix = [1] * n
for i in range(n - 2, -1, -1):
    suffix[i] = suffix[i + 1] * arr[i + 1]`,
        activeLines: [1, 2, 3],
      },
    },
    {
      id: 6,
      phase: 'calculation',
      title: 'Step 6: Combine Left & Right for Every Index',
      explanation: 'Now we combine prefix and suffix for every index: output[i] = prefix[i] * suffix[i]. Index 0: 1 × 40 = 40. Index 1: 3 × 40 = 120. Index 2: 3 × 20 = 60. Index 3: 6 × 4 = 24. Index 4: 30 × 1 = 30. Result: [40, 120, 60, 24, 30]!',
      keyIdea: 'Multiplication of precomputed sides gives the answer in O(1) per element.',
      visualization: {
        type: 'prefix-suffix',
        elements: [
          { id: 0, value: 40, label: 'out[0]=40', state: 'success' },
          { id: 1, value: 120, label: 'out[1]=120', state: 'success' },
          { id: 2, value: 60, label: 'out[2]=60', state: 'success' },
          { id: 3, value: 24, label: 'out[3]=24', state: 'success' },
          { id: 4, value: 30, label: 'out[4]=30', state: 'success' },
        ],
        secondaryElements: [
          { id: 'p0', value: 1, label: 'P[0]=1' },
          { id: 'p1', value: 3, label: 'P[1]=3' },
          { id: 'p2', value: 3, label: 'P[2]=3' },
          { id: 'p3', value: 6, label: 'P[3]=6' },
          { id: 'p4', value: 30, label: 'P[4]=30' },
        ],
        secondaryTitle: 'Prefix Products (P)',
        tertiaryElements: [
          { id: 's0', value: 40, label: 'S[0]=40' },
          { id: 's1', value: 40, label: 'S[1]=40' },
          { id: 's2', value: 20, label: 'S[2]=20' },
          { id: 's3', value: 4, label: 'S[3]=4' },
          { id: 's4', value: 1, label: 'S[4]=1' },
        ],
        tertiaryTitle: 'Suffix Products (S)',
        callout: { text: 'Complete result: output = [40, 120, 60, 24, 30] in O(n) time!', type: 'success' },
      },
    },
    {
      id: 7,
      phase: 'think',
      title: 'Step 7: Pause & Think Checkpoint',
      explanation: 'Let us test your understanding of two-sided information combining.',
      keyIdea: 'Verify how left and right boundary values combine.',
      checkpoint: {
        prompt: 'Consider index 1 (value 1 in [3, 1, 2, 5, 4]).',
        question: 'What is the product of elements to its left, product of elements to its right, and output[1]?',
        options: [
          {
            id: 'A',
            text: 'Left product = 3, Right product = 40 (2×5×4). Output[1] = 3 × 40 = 120.',
            isCorrect: true,
            explanation: 'Correct! Left of index 1 is [3]. Right of index 1 is [2, 5, 4] with product 40. 3 × 40 = 120.',
          },
          {
            id: 'B',
            text: 'Left product = 1, Right product = 20. Output[1] = 20.',
            isCorrect: false,
            explanation: 'Incorrect. Left of index 1 has element 3.',
          },
          {
            id: 'C',
            text: 'Left product = 3, Right product = 20. Output[1] = 60.',
            isCorrect: false,
            explanation: 'Incorrect. Right of index 1 includes elements 2, 5, and 4 (2 × 5 × 4 = 40).',
          },
        ],
      },
      visualization: {
        type: 'prefix-suffix',
        elements: [
          { id: 0, value: 3, label: 'Left', state: 'highlight' },
          { id: 1, value: 1, label: 'Excluded', state: 'active' },
          { id: 2, value: 2, label: 'Right', state: 'warning' },
          { id: 3, value: 5, label: 'Right', state: 'warning' },
          { id: 4, value: 4, label: 'Right', state: 'warning' },
        ],
      },
    },
    {
      id: 8,
      phase: 'discovery',
      title: 'Step 8: Space Optimization — O(1) Auxiliary Space',
      explanation: 'Can we optimize memory? YES! First, write the prefix products directly into the final output array. Then, loop backwards while maintaining a single running integer variable for suffix product. This achieves O(1) auxiliary space!',
      keyIdea: 'Running accumulator variable replaces the entire suffix array.',
      visualization: {
        type: 'prefix-suffix',
        elements: [
          { id: 0, value: 40, state: 'success' },
          { id: 1, value: 120, state: 'success' },
          { id: 2, value: 60, state: 'success' },
          { id: 3, value: 24, state: 'success' },
          { id: 4, value: 30, state: 'success' },
        ],
        variables: [{ name: 'Running suffix variable', value: 'r = 1 (updated in reverse)' }],
        callout: { text: 'Optimization: Single running integer r saves an entire array of memory!', type: 'highlight' },
      },
    },
    {
      id: 9,
      phase: 'code',
      title: 'Step 9: Synchronized Code Implementation',
      explanation: 'Here is the optimal Python solution with O(1) extra space. Notice the forward pass building prefix in res, followed by the backward pass multiplying the running suffix.',
      keyIdea: 'Optimal two-pass solution with O(1) auxiliary space.',
      visualization: {
        type: 'prefix-suffix',
        elements: [
          { id: 0, value: 40, state: 'success' },
          { id: 1, value: 120, state: 'success' },
          { id: 2, value: 60, state: 'success' },
          { id: 3, value: 24, state: 'success' },
          { id: 4, value: 30, state: 'success' },
        ],
      },
      codeSnippet: {
        language: 'python',
        code: `def product_except_self(nums):
    n = len(nums)
    res = [1] * n
    # Forward pass: prefix products
    for i in range(1, n):
        res[i] = res[i - 1] * nums[i - 1]
    # Backward pass: multiply running suffix
    suffix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= suffix
        suffix *= nums[i]
    return res`,
        activeLines: [4, 5, 6, 8, 9, 10, 11],
      },
    },
    {
      id: 10,
      phase: 'complexity',
      title: 'Step 10: Complexity Analysis',
      explanation: 'One forward pass takes n steps. One backward pass takes n steps. Total time = 2n ≈ O(n). Auxiliary space is O(1) because the output array is not counted as extra space.',
      keyIdea: 'O(n) time and O(1) auxiliary space.',
      visualization: {
        type: 'prefix-suffix',
        elements: [
          { id: 0, value: 40, state: 'success' },
          { id: 1, value: 120, state: 'success' },
          { id: 2, value: 60, state: 'success' },
          { id: 3, value: 24, state: 'success' },
          { id: 4, value: 30, state: 'success' },
        ],
        complexityBar: {
          bruteLabel: 'Brute Force Products O(n²)',
          bruteScore: 85,
          optimizedLabel: 'Prefix + Suffix O(n)',
          optimizedScore: 15,
        },
        callout: { text: 'Time: O(n) · Space: O(1) auxiliary memory.', type: 'info' },
      },
    },
    {
      id: 11,
      phase: 'summary',
      title: 'Step 11: Mental Model & Memory Hook',
      explanation: 'Whenever you see problems requiring information excluding the current element (like product except self, trapping rain water left/right peaks, or balance pivots), remember this essential mental model.',
      keyIdea: 'Combine left information with right information.',
      memoryHook: 'Left information + Right information',
      visualization: {
        type: 'prefix-suffix',
        elements: [
          { id: 0, value: 40, state: 'success' },
          { id: 1, value: 120, state: 'success' },
          { id: 2, value: 60, state: 'success' },
          { id: 3, value: 24, state: 'success' },
          { id: 4, value: 30, state: 'success' },
        ],
        callout: { text: 'Pattern mastered: Left information + Right information!', type: 'success' },
      },
    },
  ],
  challenge: {
    question: 'Why is Prefix + Suffix superior to division in Product of Array Except Self?',
    options: [
      { id: 'A', text: 'It avoids division-by-zero crashes when the array contains 0', explanation: 'Correct! If an array contains zeroes, total product becomes zero and division crashes or produces invalid results.' },
      { id: 'B', text: 'It runs in O(log n) time', explanation: 'Both approaches run in O(n) time.' },
      { id: 'C', text: 'It requires sorting the numbers', explanation: 'Prefix and Suffix work directly on the original unsorted array.' },
      { id: 'D', text: 'It only works on positive numbers', explanation: 'Prefix and Suffix work seamlessly with negative numbers and zeroes.' },
    ],
    correctOptionId: 'A',
    hint: 'Consider what happens when nums contains [0, 1, 2] if you try to divide.',
  },
  takeaways: [
    'Prefix + Suffix solves problems where an element depends on both sides without division.',
    'Common applications: Product of array except self, Trapping Rain Water, Equilibrium index.',
    'Memory Hook: "Left information + Right information".',
  ],
};
