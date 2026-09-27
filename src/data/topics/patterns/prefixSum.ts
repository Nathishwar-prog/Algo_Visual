import { Lesson } from '../../../types/learning';

export const prefixSumLesson: Lesson = {
  id: 'prefix-sum',
  topicId: 'arrays',
  patternNumber: '05',
  title: 'Prefix Sum',
  shortDescription: 'Precompute cumulative sums to answer range-sum queries efficiently.',
  category: 'pattern',
  difficulty: 'Easy',
  estimatedMinutes: 10,
  whenToUse: 'When multiple queries ask for sums of continuous ranges.',
  commonProblemTypes: [
    'Range sum queries in O(1)',
    'Subarray sum equals K',
    'Find pivot / equilibrium index',
    '2D matrix subgrid sums',
    'Running product / cumulative metrics',
  ],
  learningInsight: 'Do expensive work once, then answer repeated queries quickly.',
  recognitionChecklist: [
    'Are there repeated queries asking for sums across intervals [L..R]?',
    'Does the array remain static between queries?',
    'Can precomputing cumulative sums reduce repetitive loops?',
    'If YES → Prefix Sum.',
  ],
  bruteForceVsOptimized: {
    bruteComplexity: 'O(q · n) for q queries',
    optimizedComplexity: 'O(n) build, O(1) per query',
    observation: 'Scanning from L to R for every query repeats additions on the same elements.',
    explanation: 'One upfront pass precalculates cumulative sums; each range query is resolved by a single subtraction in O(1).',
  },
  commonMistakes: [
    {
      mistake: 'Subtracting prefix[L] instead of prefix[L - 1], accidentally removing arr[L].',
      fix: 'Always subtract prefix[L - 1] to keep arr[L] in the sum, or use a 1-indexed prefix array.',
    },
    {
      mistake: 'IndexOutOfBounds error when L = 0 (trying to access prefix[-1]).',
      fix: 'Add a check: if L == 0, return prefix[R], else return prefix[R] - prefix[L - 1].',
    },
    {
      mistake: 'Using prefix sums when array elements are updated frequently.',
      fix: 'Prefix sums are best for static arrays. For dynamic updates, use a Fenwick tree or Segment tree.',
    },
  ],
  overview: 'Precompute cumulative running totals from left to right. Once built, the sum of any contiguous subarray [L..R] can be computed in O(1) time using a single subtraction.',
  complexity: {
    time: 'O(n) preprocessing, O(1) per query',
    space: 'O(n) auxiliary prefix array',
    description: 'Precomputing takes a single linear pass. Any range query executes in constant time.',
  },
  steps: [
    {
      id: 1,
      phase: 'problem',
      title: 'Step 1: The Problem & The Array',
      explanation: 'Given the array [2, 4, 1, 3, 5], we need to answer thousands of queries asking for the sum of numbers between index L and index R.',
      keyIdea: 'Repeated queries require an approach faster than looping every time.',
      visualization: {
        type: 'array',
        elements: [
          { id: 0, value: 2, label: '0' },
          { id: 1, value: 4, label: '1' },
          { id: 2, value: 1, label: '2' },
          { id: 3, value: 3, label: '3' },
          { id: 4, value: 5, label: '4' },
        ],
        callout: { text: 'Array: [2, 4, 1, 3, 5]. Goal: Answer range sum queries (L, R) efficiently.', type: 'info' },
      },
    },
    {
      id: 2,
      phase: 'brute-force',
      title: 'Step 2: Why Brute Force Fails for Multiple Queries',
      explanation: 'A naive approach loops from index L to R for every query. If we have 100,000 queries on an array of 10,000 elements, that is up to 1,000,000,000 additions: O(Q · n) total time!',
      keyIdea: 'Brute force does the same additions over and over again.',
      visualization: {
        type: 'array',
        elements: [
          { id: 0, value: 2, label: '0' },
          { id: 1, value: 4, label: '1', state: 'active', annotation: 'L = 1' },
          { id: 2, value: 1, label: '2', state: 'active' },
          { id: 3, value: 3, label: '3', state: 'active', annotation: 'R = 3' },
          { id: 4, value: 5, label: '4' },
        ],
        complexityBar: {
          bruteLabel: 'Brute Force per query O(n)',
          bruteScore: 80,
          optimizedLabel: 'Prefix Sum per query O(1)',
          optimizedScore: 10,
        },
        callout: { text: 'Looping from L to R takes O(n) per query. With many queries, it times out.', type: 'warning' },
      },
    },
    {
      id: 3,
      phase: 'discovery',
      title: 'Step 3: The Core Clue — Precomputation',
      explanation: 'What if we do the summation work ONCE upfront? If we know the sum from index 0 to every position i, can we use that information to find ANY range sum instantly?',
      keyIdea: 'Do expensive work once, then answer queries in O(1).',
      visualization: {
        type: 'array',
        elements: [
          { id: 0, value: 2, label: '0', state: 'highlight' },
          { id: 1, value: 4, label: '1', state: 'highlight' },
          { id: 2, value: 1, label: '2', state: 'highlight' },
          { id: 3, value: 3, label: '3', state: 'highlight' },
          { id: 4, value: 5, label: '4', state: 'highlight' },
        ],
        callout: { text: 'Insight: Precompute cumulative sums from left to right.', type: 'info' },
      },
    },
    {
      id: 4,
      phase: 'setup',
      title: 'Step 4: Defining the Prefix Array',
      explanation: 'We create an auxiliary array P called the Prefix Array. By definition, P[i] stores the sum of all elements from index 0 up to index i.',
      keyIdea: 'P[i] = arr[0] + arr[1] + ... + arr[i].',
      formula: 'P[i] = P[i - 1] + arr[i]',
      visualization: {
        type: 'prefix-sum',
        elements: [
          { id: 0, value: 2, label: '0' },
          { id: 1, value: 4, label: '1' },
          { id: 2, value: 1, label: '2' },
          { id: 3, value: 3, label: '3' },
          { id: 4, value: 5, label: '4' },
        ],
        secondaryElements: [
          { id: 'p0', value: '?', label: 'P[0]' },
          { id: 'p1', value: '?', label: 'P[1]' },
          { id: 'p2', value: '?', label: 'P[2]' },
          { id: 'p3', value: '?', label: 'P[3]' },
          { id: 'p4', value: '?', label: 'P[4]' },
        ],
        secondaryTitle: 'Prefix Array P (To Be Computed)',
        callout: { text: 'Empty prefix array P waiting for cumulative totals.', type: 'info' },
      },
    },
    {
      id: 5,
      phase: 'execution',
      title: 'Step 5: Step-by-Step Cumulative Accumulation',
      explanation: 'We calculate: P[0] = arr[0] = 2. Then P[1] = 2 + 4 = 6. Then P[2] = 6 + 1 = 7. Then P[3] = 7 + 3 = 10. Finally P[4] = 10 + 5 = 15. The prefix array is [2, 6, 7, 10, 15].',
      keyIdea: 'Each prefix slot adds the current element to the previous cumulative sum.',
      visualization: {
        type: 'prefix-sum',
        elements: [
          { id: 0, value: 2, label: '0', state: 'highlight' },
          { id: 1, value: 4, label: '1', state: 'highlight' },
          { id: 2, value: 1, label: '2', state: 'highlight' },
          { id: 3, value: 3, label: '3', state: 'highlight' },
          { id: 4, value: 5, label: '4', state: 'highlight' },
        ],
        secondaryElements: [
          { id: 'p0', value: 2, label: 'P[0]=2', state: 'success' },
          { id: 'p1', value: 6, label: 'P[1]=6', state: 'success' },
          { id: 'p2', value: 7, label: 'P[2]=7', state: 'success' },
          { id: 'p3', value: 10, label: 'P[3]=10', state: 'success' },
          { id: 'p4', value: 15, label: 'P[4]=15', state: 'success' },
        ],
        secondaryTitle: 'Complete Prefix Array P',
        callout: { text: 'Prefix array built in a single O(n) pass: [2, 6, 7, 10, 15].', type: 'success' },
      },
      codeSnippet: {
        language: 'python',
        code: `prefix = [0] * len(arr)
prefix[0] = arr[0]
for i in range(1, len(arr)):
    prefix[i] = prefix[i - 1] + arr[i]`,
        activeLines: [1, 2, 3, 4],
      },
    },
    {
      id: 6,
      phase: 'calculation',
      title: 'Step 6: Answering Range Query [1..3] in O(1)',
      explanation: 'Query: Find sum from index 1 to 3 (values 4 + 1 + 3 = 8). Look at P[3] = 10 (sum of 0..3). P[0] = 2 (sum of 0..0). By subtracting: P[3] - P[0] = 10 - 2 = 8! Exactly one subtraction in O(1) time.',
      keyIdea: 'Subtracting P[L - 1] removes the unneeded prefix, leaving sum(L..R).',
      formula: 'sum(L..R) = P[R] - P[L - 1]',
      comparison: {
        expression: 'P[3] - P[0] (10 - 2)',
        evaluation: '8',
        operator: '==',
        target: '4 + 1 + 3 (8)',
        outcome: 'Exact range sum computed in 1 operation!',
        status: 'success',
      },
      decision: {
        what: 'Query range [1..3].',
        why: 'P[3] covers 0..3. P[0] covers 0..0.',
        result: 'P[3] - P[0] = 10 - 2 = 8 in O(1) time.',
      },
      visualization: {
        type: 'prefix-sum',
        elements: [
          { id: 0, value: 2, label: '0', state: 'muted', annotation: 'Excluded' },
          { id: 1, value: 4, label: '1', state: 'success', annotation: 'Target' },
          { id: 2, value: 1, label: '2', state: 'success', annotation: 'Target' },
          { id: 3, value: 3, label: '3', state: 'success', annotation: 'Target' },
          { id: 4, value: 5, label: '4', state: 'muted' },
        ],
        secondaryElements: [
          { id: 'p0', value: 2, label: 'P[0]=2', state: 'warning', annotation: 'Subtract me' },
          { id: 'p1', value: 6, label: 'P[1]=6' },
          { id: 'p2', value: 7, label: 'P[2]=7' },
          { id: 'p3', value: 10, label: 'P[3]=10', state: 'success', annotation: 'Includes 0..3' },
          { id: 'p4', value: 15, label: 'P[4]=15' },
        ],
        secondaryTitle: 'Prefix Array P',
        variables: [
          { name: 'P[R] (P[3])', value: '10' },
          { name: 'P[L-1] (P[0])', value: '2' },
          { name: 'Range Sum', value: '10 - 2 = 8', highlight: true, color: 'emerald' },
        ],
        callout: { text: 'Formula: P[3] - P[0] = 10 - 2 = 8. Instant O(1) calculation!', type: 'formula' },
      },
    },
    {
      id: 7,
      phase: 'think',
      title: 'Step 7: Pause & Think Checkpoint',
      explanation: 'Let us test your understanding with another query: sum of elements from index 2 to 4 (L = 2, R = 4).',
      keyIdea: 'Identify the exact indices for P[R] and P[L - 1].',
      checkpoint: {
        prompt: 'Given array [2, 4, 1, 3, 5] and prefix array P = [2, 6, 7, 10, 15]. Query: L = 2, R = 4.',
        question: 'What is the formula and value for sum(2..4)?',
        options: [
          {
            id: 'A',
            text: 'P[4] - P[1] = 15 - 6 = 9',
            isCorrect: true,
            explanation: 'Correct! P[4] = 15 (sum 0..4). P[L-1] = P[1] = 6 (sum 0..1). 15 - 6 = 9 (1 + 3 + 5 = 9).',
          },
          {
            id: 'B',
            text: 'P[4] - P[2] = 15 - 7 = 8',
            isCorrect: false,
            explanation: 'Incorrect! Subtracting P[2] would mistakenly subtract arr[2] as well.',
          },
          {
            id: 'C',
            text: 'P[4] - P[0] = 15 - 2 = 13',
            isCorrect: false,
            explanation: 'Incorrect! P[0] only subtracts index 0.',
          },
        ],
      },
      visualization: {
        type: 'prefix-sum',
        elements: [
          { id: 0, value: 2, label: '0' },
          { id: 1, value: 4, label: '1' },
          { id: 2, value: 1, label: '2', state: 'active', annotation: 'L = 2' },
          { id: 3, value: 3, label: '3', state: 'active' },
          { id: 4, value: 5, label: '4', state: 'active', annotation: 'R = 4' },
        ],
        secondaryElements: [
          { id: 'p0', value: 2, label: 'P[0]=2' },
          { id: 'p1', value: 6, label: 'P[1]=6' },
          { id: 'p2', value: 7, label: 'P[2]=7' },
          { id: 'p3', value: 10, label: 'P[3]=10' },
          { id: 'p4', value: 15, label: 'P[4]=15' },
        ],
        secondaryTitle: 'Prefix Array P = [2, 6, 7, 10, 15]',
      },
    },
    {
      id: 8,
      phase: 'discovery',
      title: 'Step 8: Handling the Special Case (L = 0)',
      explanation: 'What if a query starts at index 0 (L = 0)? There are no elements before index 0 to subtract! So simply: sum(0..R) = P[R].',
      keyIdea: 'When L == 0, the sum is directly P[R].',
      formula: 'sum(0..R) = P[R]',
      visualization: {
        type: 'prefix-sum',
        elements: [
          { id: 0, value: 2, label: '0', state: 'success', annotation: 'L = 0' },
          { id: 1, value: 4, label: '1', state: 'success' },
          { id: 2, value: 1, label: '2', state: 'success', annotation: 'R = 2' },
          { id: 3, value: 3, label: '3', state: 'muted' },
          { id: 4, value: 5, label: '4', state: 'muted' },
        ],
        secondaryElements: [
          { id: 'p0', value: 2, label: 'P[0]' },
          { id: 'p1', value: 6, label: 'P[1]' },
          { id: 'p2', value: 7, label: 'P[2]=7', state: 'success', annotation: 'Direct result' },
          { id: 'p3', value: 10, label: 'P[3]' },
          { id: 'p4', value: 15, label: 'P[4]' },
        ],
        secondaryTitle: 'Prefix Array P',
        callout: { text: 'For L = 0, sum(0..2) = P[2] = 7 directly with no subtraction.', type: 'info' },
      },
    },
    {
      id: 9,
      phase: 'code',
      title: 'Step 9: Synchronized Code Implementation',
      explanation: 'Here is the complete PrefixSum class implementation. Notice how fast and simple queryRange is: a single if-else condition in O(1) time.',
      keyIdea: 'Precompute in __init__, answer queries in queryRange in O(1).',
      visualization: {
        type: 'prefix-sum',
        elements: [
          { id: 0, value: 2, state: 'muted' },
          { id: 1, value: 4, state: 'success' },
          { id: 2, value: 1, state: 'success' },
          { id: 3, value: 3, state: 'success' },
          { id: 4, value: 5, state: 'muted' },
        ],
        secondaryElements: [
          { id: 'p0', value: 2, label: 'P[0]' },
          { id: 'p1', value: 6, label: 'P[1]' },
          { id: 'p2', value: 7, label: 'P[2]' },
          { id: 'p3', value: 10, label: 'P[3]', state: 'success' },
          { id: 'p4', value: 15, label: 'P[4]' },
        ],
        secondaryTitle: 'Prefix Array P',
      },
      codeSnippet: {
        language: 'python',
        code: `class PrefixSum:
    def __init__(self, arr):
        self.prefix = [0] * len(arr)
        self.prefix[0] = arr[0]
        for i in range(1, len(arr)):
            self.prefix[i] = self.prefix[i - 1] + arr[i]

    def query_range(self, L, R):
        if L == 0:
            return self.prefix[R]
        return self.prefix[R] - self.prefix[L - 1]`,
        activeLines: [9, 10, 11, 12],
      },
    },
    {
      id: 10,
      phase: 'complexity',
      title: 'Step 10: Complexity Analysis',
      explanation: 'Preprocessing takes O(n) time and O(n) space to build the prefix array. Each subsequent range query takes strictly O(1) time. For Q queries, total time is O(n + Q) instead of O(Q · n).',
      keyIdea: 'Trade O(n) auxiliary space for lightning-fast O(1) query speeds.',
      visualization: {
        type: 'prefix-sum',
        elements: [
          { id: 0, value: 2, state: 'muted' },
          { id: 1, value: 4, state: 'muted' },
          { id: 2, value: 1, state: 'muted' },
          { id: 3, value: 3, state: 'muted' },
          { id: 4, value: 5, state: 'muted' },
        ],
        secondaryElements: [
          { id: 'p0', value: 2, label: 'P[0]' },
          { id: 'p1', value: 6, label: 'P[1]' },
          { id: 'p2', value: 7, label: 'P[2]' },
          { id: 'p3', value: 10, label: 'P[3]' },
          { id: 'p4', value: 15, label: 'P[4]' },
        ],
        complexityBar: {
          bruteLabel: 'Brute Force Q queries O(Q·n)',
          bruteScore: 85,
          optimizedLabel: 'Prefix Sum Q queries O(n + Q)',
          optimizedScore: 15,
        },
        callout: { text: 'Preprocessing: O(n) · Each query: O(1) time.', type: 'info' },
      },
    },
    {
      id: 11,
      phase: 'summary',
      title: 'Step 11: Mental Model & Memory Hook',
      explanation: 'Whenever you see repeated range sums or cumulative subarray problems, remember this essential mental model.',
      keyIdea: 'Build once upfront, then query instantly.',
      memoryHook: 'Build once → Query quickly',
      visualization: {
        type: 'prefix-sum',
        elements: [
          { id: 0, value: 2, state: 'success' },
          { id: 1, value: 4, state: 'success' },
          { id: 2, value: 1, state: 'success' },
          { id: 3, value: 3, state: 'success' },
          { id: 4, value: 5, state: 'success' },
        ],
        secondaryElements: [
          { id: 'p0', value: 2, label: 'P[0]' },
          { id: 'p1', value: 6, label: 'P[1]' },
          { id: 'p2', value: 7, label: 'P[2]' },
          { id: 'p3', value: 10, label: 'P[3]' },
          { id: 'p4', value: 15, label: 'P[4]' },
        ],
        secondaryTitle: 'Prefix Array Ready',
        callout: { text: 'Pattern mastered: Build once → Query quickly!', type: 'success' },
      },
    },
  ],
  challenge: {
    question: 'Given prefix array P, how do you find the sum of elements from index L to R (when L > 0)?',
    options: [
      { id: 'A', text: 'P[R] - P[L]', explanation: 'Subtracting P[L] erroneously removes arr[L].' },
      { id: 'B', text: 'P[R] - P[L - 1]', explanation: 'Correct! P[R] has sum(0..R). Subtracting P[L-1] leaves exactly sum(L..R).' },
      { id: 'C', text: 'P[R] + P[L]', explanation: 'Adding would double count overlapping items.' },
      { id: 'D', text: 'P[R - L]', explanation: 'Index arithmetic does not equal cumulative summation.' },
    ],
    correctOptionId: 'B',
    hint: 'Which elements prior to index L need to be subtracted?',
  },
  takeaways: [
    'Precomputing prefix sums takes O(n) time and O(n) space.',
    'Range sum queries run in O(1) instant time.',
    'Memory Hook: "Build once → Query quickly".',
  ],
};
