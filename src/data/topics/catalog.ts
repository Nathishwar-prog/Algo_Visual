import { Topic } from '../../types/learning';
import { arrayTopic } from './arrays';

export const allTopics: Topic[] = [
  arrayTopic,
  {
    id: 'strings',
    title: 'Strings',
    tagline: 'Character sequences, ASCII/Unicode encoding, and text patterns.',
    description: 'Master mutable vs immutable strings, two-pointer palindromes, and rolling hashes.',
    iconName: 'Type',
    concepts: [
      { id: 'string-immutability', title: 'Immutability & Encoding', shortDescription: 'Memory implications of string mutations across languages.', category: 'concept', difficulty: 'Beginner', estimatedMinutes: 6, visualPreviewType: 'ascii' },
      { id: 'string-reversal', title: 'Two-Pointer Reversal', shortDescription: 'In-place character swapping using dual pointers.', category: 'concept', difficulty: 'Easy', estimatedMinutes: 5, visualPreviewType: 'swap' },
    ],
    patterns: [
      { id: 'anagram-frequency', title: 'Frequency Counting', shortDescription: 'Count character frequencies with fixed 26-slot hash tables.', category: 'pattern', difficulty: 'Easy', estimatedMinutes: 7, visualPreviewType: 'freq' },
      { id: 'longest-substring', title: 'Dynamic Sliding Window', shortDescription: 'Longest substring without repeating characters in O(N).', category: 'pattern', difficulty: 'Medium', estimatedMinutes: 9, visualPreviewType: 'window' },
    ],
    stats: { totalLessons: 6, estimatedHours: 1.0 },
  },
  {
    id: 'hashing',
    title: 'Hashing',
    tagline: 'Instant O(1) key-value mapping and collision resolution.',
    description: 'Learn hash functions, buckets, separate chaining, and frequency tables.',
    iconName: 'Hash',
    concepts: [
      { id: 'hash-function', title: 'Hash Functions & Buckets', shortDescription: 'How keys are mapped to fixed-size array indices via modulo.', category: 'concept', difficulty: 'Beginner', estimatedMinutes: 6, visualPreviewType: 'buckets' },
      { id: 'collision-chaining', title: 'Collision Handling', shortDescription: 'Separate chaining vs open addressing linear probing.', category: 'concept', difficulty: 'Medium', estimatedMinutes: 8, visualPreviewType: 'chain' },
    ],
    patterns: [
      { id: 'two-sum-hash', title: 'Complement Lookup', shortDescription: 'Two Sum in O(N) using hash map complement tracking.', category: 'pattern', difficulty: 'Easy', estimatedMinutes: 6, visualPreviewType: 'complement' },
    ],
    stats: { totalLessons: 5, estimatedHours: 0.9 },
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    tagline: 'Dynamic node chains connected by memory pointers.',
    description: 'Explore node structures, head/tail pointers, cycles, and fast-slow runner algorithms.',
    iconName: 'Link',
    concepts: [
      { id: 'singly-linked-list', title: 'Nodes and Next Pointers', shortDescription: 'Decoupled memory nodes linked through pointer references.', category: 'concept', difficulty: 'Beginner', estimatedMinutes: 7, visualPreviewType: 'nodes' },
      { id: 'list-reversal', title: 'Iterative List Reversal', shortDescription: 'Reverse next pointers in a single pass with prev, curr, next.', category: 'concept', difficulty: 'Medium', estimatedMinutes: 8, visualPreviewType: 'reverse' },
    ],
    patterns: [
      { id: 'fast-slow-pointers', title: "Floyd's Cycle Detection", shortDescription: 'Tortoise and Hare fast/slow pointer cycle detection.', category: 'pattern', difficulty: 'Medium', estimatedMinutes: 9, visualPreviewType: 'cycle' },
    ],
    stats: { totalLessons: 6, estimatedHours: 1.1 },
  },
  {
    id: 'stack',
    title: 'Stack',
    tagline: 'Last-In, First-Out (LIFO) execution and backtracking.',
    description: 'Function call stacks, monotonic stacks, bracket validation, and undo mechanisms.',
    iconName: 'Layers',
    concepts: [
      { id: 'lifo-principles', title: 'Push, Pop, and Peek', shortDescription: 'The LIFO mechanism with O(1) top operations.', category: 'concept', difficulty: 'Beginner', estimatedMinutes: 5, visualPreviewType: 'stack' },
    ],
    patterns: [
      { id: 'valid-parentheses', title: 'Bracket Matching', shortDescription: 'Matching nested opening and closing parentheses.', category: 'pattern', difficulty: 'Easy', estimatedMinutes: 6, visualPreviewType: 'parens' },
      { id: 'monotonic-stack', title: 'Monotonic Stack', shortDescription: 'Finding next greater element in linear O(N) time.', category: 'pattern', difficulty: 'Hard', estimatedMinutes: 10, visualPreviewType: 'mono' },
    ],
    stats: { totalLessons: 5, estimatedHours: 0.8 },
  },
  {
    id: 'queue',
    title: 'Queue',
    tagline: 'First-In, First-Out (FIFO) buffer management and task scheduling.',
    description: 'Breadth-first search ordering, circular ring buffers, and double-ended deques.',
    iconName: 'ListOrdered',
    concepts: [
      { id: 'fifo-buffer', title: 'Enqueue and Dequeue', shortDescription: 'FIFO operations with head and tail pointers.', category: 'concept', difficulty: 'Beginner', estimatedMinutes: 5, visualPreviewType: 'queue' },
      { id: 'circular-queue', title: 'Circular Ring Buffer', shortDescription: 'Modulo wrap-around preventing memory leakage.', category: 'concept', difficulty: 'Medium', estimatedMinutes: 7, visualPreviewType: 'ring' },
    ],
    patterns: [
      { id: 'bfs-level-order', title: 'Level-Order Traversal', shortDescription: 'Processing tree or graph nodes level-by-level.', category: 'pattern', difficulty: 'Medium', estimatedMinutes: 8, visualPreviewType: 'bfs' },
    ],
    stats: { totalLessons: 4, estimatedHours: 0.7 },
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    tagline: 'Divide and conquer logarithmic O(log N) search.',
    description: 'Halve the search space every comparison to locate elements among millions in milliseconds.',
    iconName: 'Search',
    concepts: [
      { id: 'search-space-halving', title: 'The Midpoint Calculation', shortDescription: 'Low, Mid, and High pointer boundary updates.', category: 'concept', difficulty: 'Beginner', estimatedMinutes: 6, visualPreviewType: 'bsearch' },
    ],
    patterns: [
      { id: 'lower-upper-bound', title: 'Lower & Upper Bound', shortDescription: 'Locating insertion points and duplicate boundaries.', category: 'pattern', difficulty: 'Medium', estimatedMinutes: 8, visualPreviewType: 'bounds' },
      { id: 'search-on-answer', title: 'Search Space Reduction', shortDescription: 'Binary searching on monotonic mathematical answer ranges.', category: 'pattern', difficulty: 'Hard', estimatedMinutes: 10, visualPreviewType: 'ans' },
    ],
    stats: { totalLessons: 5, estimatedHours: 0.9 },
  },
  {
    id: 'sorting',
    title: 'Sorting',
    tagline: 'Order preservation through comparisons and divide-and-conquer.',
    description: 'Understand stability, pivot partitioning in QuickSort, and merging in MergeSort.',
    iconName: 'ArrowUpDown',
    concepts: [
      { id: 'comparison-trees', title: 'Sorting Invariants & Stability', shortDescription: 'Why comparison-based sorts cannot exceed O(N log N).', category: 'concept', difficulty: 'Beginner', estimatedMinutes: 7, visualPreviewType: 'sort' },
    ],
    patterns: [
      { id: 'merge-sort-tree', title: 'Merge Sort Divide & Conquer', shortDescription: 'Splitting down to single elements and merging sorted halves.', category: 'pattern', difficulty: 'Medium', estimatedMinutes: 9, visualPreviewType: 'merge' },
      { id: 'quicksort-partition', title: 'Lomuto / Hoare Partitioning', shortDescription: 'In-place pivot positioning and subarray partitioning.', category: 'pattern', difficulty: 'Hard', estimatedMinutes: 10, visualPreviewType: 'quick' },
    ],
    stats: { totalLessons: 6, estimatedHours: 1.2 },
  },
  {
    id: 'trees',
    title: 'Trees',
    tagline: 'Hierarchical node branching and recursive invariants.',
    description: 'Binary search trees, balanced AVL rotations, preorder/inorder traversals, and heaps.',
    iconName: 'GitBranch',
    concepts: [
      { id: 'binary-tree-anatomy', title: 'Roots, Leaves & Depths', shortDescription: 'Hierarchical parent-child references and recursive structures.', category: 'concept', difficulty: 'Beginner', estimatedMinutes: 6, visualPreviewType: 'tree' },
    ],
    patterns: [
      { id: 'dfs-traversals', title: 'In-Order, Pre-Order & Post-Order', shortDescription: 'Recursive depth-first explorations with visual call stacks.', category: 'pattern', difficulty: 'Medium', estimatedMinutes: 8, visualPreviewType: 'dfs' },
      { id: 'bst-search', title: 'BST Property & Validation', shortDescription: 'Left < Root < Right search invariants in O(log N).', category: 'pattern', difficulty: 'Medium', estimatedMinutes: 8, visualPreviewType: 'bst' },
    ],
    stats: { totalLessons: 7, estimatedHours: 1.3 },
  },
  {
    id: 'graphs',
    title: 'Graphs',
    tagline: 'Nodes, edges, and relationship networks.',
    description: 'Adjacency matrices vs lists, BFS shortest paths, topological sort, and Dijkstra.',
    iconName: 'Share2',
    concepts: [
      { id: 'graph-representations', title: 'Adjacency List vs Matrix', shortDescription: 'Tradeoffs between space complexity and neighbor queries.', category: 'concept', difficulty: 'Beginner', estimatedMinutes: 7, visualPreviewType: 'graph' },
    ],
    patterns: [
      { id: 'bfs-shortest-path', title: 'Unweighted Shortest Path (BFS)', shortDescription: 'Wavefront expansion guaranteed to find minimum hops.', category: 'pattern', difficulty: 'Medium', estimatedMinutes: 9, visualPreviewType: 'wave' },
      { id: 'cycle-detection-graph', title: 'Cycle Detection (DFS Colors)', shortDescription: 'White-Gray-Black node coloring for cycle identification.', category: 'pattern', difficulty: 'Hard', estimatedMinutes: 10, visualPreviewType: 'colors' },
    ],
    stats: { totalLessons: 7, estimatedHours: 1.4 },
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    tagline: 'Overlapping subproblems and optimal substructure.',
    description: 'Transform exponential recursion into polynomial runtime using memoization and bottom-up tabulation.',
    iconName: 'Boxes',
    concepts: [
      { id: 'memoization-vs-tabulation', title: 'Overlapping Subproblems', shortDescription: 'Visualizing the Fibonacci recursion tree and avoiding recomputation.', category: 'concept', difficulty: 'Beginner', estimatedMinutes: 8, visualPreviewType: 'fib' },
    ],
    patterns: [
      { id: 'knapsack-01', title: '0/1 Knapsack Grid', shortDescription: 'Include vs exclude decisions filling a 2D capacity table.', category: 'pattern', difficulty: 'Hard', estimatedMinutes: 12, visualPreviewType: 'knapsack' },
      { id: 'longest-common-subseq', title: 'LCS 2D Table', shortDescription: 'Character matching diagonal jumps vs max neighbors.', category: 'pattern', difficulty: 'Hard', estimatedMinutes: 11, visualPreviewType: 'lcs' },
    ],
    stats: { totalLessons: 8, estimatedHours: 1.6 },
  },
];
