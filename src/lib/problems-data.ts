export interface ProblemDefinition {
  slug: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  description: string
  examples: { input: string; output: string; explanation?: string }[]
  constraints: string[]
  topics: string[]
  pattern?: string
  starter: Record<string, string>
}

// Helper to format slug from title: "Koko Eating Bananas" -> "koko-eating-bananas"
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export const RISING_BRAIN_TOPICS = [
  {
    name: 'Arrays',
    description: 'Contiguous element collections, pointers, sliding windows, prefix sums & Kadane algorithms.',
    patterns: [
      {
        name: 'Two-Pointer',
        description: 'Pointers moving towards/away from each other.',
        problems: [
          { title: 'Move Zeroes', difficulty: 'easy' },
          { title: 'Two Sum II - Input Array Is Sorted', difficulty: 'medium' },
          { title: '3Sum', difficulty: 'medium' },
          { title: 'Sort Colors', difficulty: 'medium' },
          { title: 'Container With Most Water', difficulty: 'medium' },
          { title: 'Trapping Rain Water', difficulty: 'hard' },
        ]
      },
      {
        name: 'Sliding Window',
        description: 'Fixed or dynamically resized contiguous window.',
        problems: [
          { title: 'Maximum Sum Subarray of Size K', difficulty: 'easy' },
          { title: 'Max Consecutive Ones', difficulty: 'easy' },
          { title: 'Max Consecutive Ones III', difficulty: 'medium' },
          { title: 'Subarray Product Less Than K', difficulty: 'medium' },
          { title: 'Fruit Into Baskets', difficulty: 'medium' },
          { title: 'Minimum Size Subarray Sum', difficulty: 'medium' },
          { title: 'Sliding Window Maximum', difficulty: 'hard' },
          { title: 'Subarrays with K Distinct Integers', difficulty: 'hard' },
        ]
      },
      {
        name: 'Prefix Sum',
        description: 'Cumulative sum precomputation for O(1) range queries.',
        problems: [
          { title: 'Find Pivot Index', difficulty: 'easy' },
          { title: 'Subarray Sum Equals K', difficulty: 'medium' },
          { title: 'Matrix Block Sum', difficulty: 'medium' },
          { title: 'Product of Array Except Self', difficulty: 'medium' },
          { title: 'Continuous Subarray Sum', difficulty: 'medium' },
          { title: 'Subarray Sums Divisible by K', difficulty: 'medium' },
        ]
      },
      {
        name: 'Kadane’s Algorithm',
        description: 'Local vs global max optimization for contiguous subarrays.',
        problems: [
          { title: 'Maximum Subarray', difficulty: 'medium' },
          { title: 'Maximum Product Subarray', difficulty: 'medium' },
          { title: 'Maximum Sum Circular Subarray', difficulty: 'medium' },
          { title: 'Maximum Absolute Sum of Any Subarray', difficulty: 'medium' },
          { title: 'Largest Sum Contiguous Subarray', difficulty: 'medium' },
        ]
      }
    ]
  },
  {
    name: 'Strings',
    description: 'Character sequences, palindromes, sliding window strings, and pattern matching.',
    patterns: [
      {
        name: 'Two-Pointer (Palindrome)',
        description: 'Compare characters from both ends moving inward.',
        problems: [
          { title: 'Reverse String', difficulty: 'easy' },
          { title: 'Valid Palindrome', difficulty: 'easy' },
          { title: 'Valid Palindrome II', difficulty: 'easy' },
          { title: 'Longest Palindromic Substring', difficulty: 'medium' },
          { title: 'Palindromic Substrings', difficulty: 'medium' },
        ]
      },
      {
        name: 'Sliding Window (String)',
        description: 'Dynamic character frequency tracking inside a moving window.',
        problems: [
          { title: 'Find All Anagrams in a String', difficulty: 'medium' },
          { title: 'Longest Substring Without Repeating Characters', difficulty: 'medium' },
          { title: 'Longest Substring with K Unique Characters', difficulty: 'medium' },
          { title: 'Permutation in String', difficulty: 'medium' },
          { title: 'Minimum Window Substring', difficulty: 'hard' },
          { title: 'Substring with Concatenation of All Words', difficulty: 'hard' },
        ]
      }
    ]
  },
  {
    name: 'Binary Search',
    description: 'Logarithmic search space reduction for sorted ranges and monotonic decision functions.',
    patterns: [
      {
        name: 'Classic Binary Search',
        description: 'Divide and conquer on sorted arrays.',
        problems: [
          { title: 'Binary Search', difficulty: 'easy' },
          { title: 'Sqrt(x)', difficulty: 'easy' },
          { title: 'Search Insert Position', difficulty: 'easy' },
          { title: 'Search in Rotated Sorted Array', difficulty: 'medium' },
          { title: 'Find Minimum in Rotated Sorted Array', difficulty: 'medium' },
          { title: 'Find Peak Element', difficulty: 'medium' },
        ]
      },
      {
        name: 'Lower/Upper Bound',
        description: 'Finding boundary indices matching search conditions.',
        problems: [
          { title: 'Find Kth Rotation', difficulty: 'easy' },
          { title: 'Count Occurrences in Sorted Array', difficulty: 'easy' },
          { title: 'Ceiling in Sorted Array', difficulty: 'easy' },
          { title: 'Floor in Sorted Array', difficulty: 'easy' },
          { title: 'Find First and Last Position of Element in Sorted Array', difficulty: 'medium' },
        ]
      },
      {
        name: 'Binary Search on Answers',
        description: 'Binary search over discrete feasible solution ranges.',
        problems: [
          { title: 'Koko Eating Bananas', difficulty: 'medium' },
          { title: 'Capacity To Ship Packages Within D Days', difficulty: 'medium' },
          { title: 'Minimum Speed to Arrive on Time', difficulty: 'medium' },
          { title: 'Aggressive Cows', difficulty: 'medium' },
          { title: 'Minimum Number of Days to Make m Bouquets', difficulty: 'medium' },
          { title: 'Magnetic Force Between Two Balls', difficulty: 'medium' },
          { title: 'Allocate Minimum Pages', difficulty: 'hard' },
          { title: 'Split Array Largest Sum', difficulty: 'hard' },
        ]
      },
      {
        name: 'Search in 2D Matrix',
        description: 'Apply binary search on row/column sorted matrices.',
        problems: [
          { title: 'Search a 2D Matrix', difficulty: 'medium' },
          { title: 'Search a 2D Matrix II', difficulty: 'medium' },
          { title: 'Kth Smallest Element in Sorted Matrix', difficulty: 'medium' },
          { title: 'Matrix Median', difficulty: 'hard' },
        ]
      }
    ]
  },
  {
    name: 'Stack',
    description: 'LIFO structures for monotonic ordering, expression parsing, and parenthesis scoring.',
    patterns: [
      {
        name: 'Monotonic Stack',
        description: 'Maintain sorted order to query next/prev greater/smaller elements.',
        problems: [
          { title: 'Next Greater Element I', difficulty: 'easy' },
          { title: 'Next Greater Element II', difficulty: 'medium' },
          { title: 'Daily Temperatures', difficulty: 'medium' },
          { title: 'Online Stock Span', difficulty: 'medium' },
          { title: 'Asteroid Collision', difficulty: 'medium' },
          { title: 'Largest Rectangle in Histogram', difficulty: 'hard' },
          { title: 'Maximal Rectangle', difficulty: 'hard' },
        ]
      },
      {
        name: 'Expression Evaluation',
        description: 'Stacks for infix, postfix, and mathematical string decoding.',
        problems: [
          { title: 'Basic Calculator', difficulty: 'hard' },
          { title: 'Basic Calculator II', difficulty: 'medium' },
          { title: 'Evaluate Reverse Polish Notation', difficulty: 'medium' },
          { title: 'Decode String', difficulty: 'medium' },
        ]
      },
      {
        name: 'Simulation / Undo',
        description: 'Simulate adjacent cancellation and undo histories.',
        problems: [
          { title: 'Backspace String Compare', difficulty: 'easy' },
          { title: 'Remove All Adjacent Duplicates In String', difficulty: 'easy' },
          { title: 'Make The String Great', difficulty: 'easy' },
          { title: 'Minimum String Length After Removing Substrings', difficulty: 'easy' },
        ]
      },
      {
        name: 'Parenthesis & Scoring',
        description: 'Validate and calculate score for nested parenthesis expressions.',
        problems: [
          { title: 'Valid Parentheses', difficulty: 'easy' },
          { title: 'Minimum Add to Make Parentheses Valid', difficulty: 'medium' },
          { title: 'Score of Parentheses', difficulty: 'medium' },
          { title: 'Longest Valid Parentheses', difficulty: 'hard' },
        ]
      }
    ]
  },
  {
    name: 'Recursion & Backtracking',
    description: 'Subproblem reduction, recursive search trees, divide and conquer, and combinations.',
    patterns: [
      {
        name: 'Linear Recursion',
        description: 'Single path recursive subproblem solving.',
        problems: [
          { title: 'Factorial', difficulty: 'easy' },
          { title: 'Fibonacci Number', difficulty: 'easy' },
          { title: 'Sum of Digits', difficulty: 'easy' },
        ]
      },
      {
        name: 'Non-Linear Recursion / Backtracking',
        description: 'Multi-branch decision tree exploration with prune & backtrack.',
        problems: [
          { title: 'Subsets', difficulty: 'medium' },
          { title: 'Permutations', difficulty: 'medium' },
          { title: 'N-Queens', difficulty: 'hard' },
          { title: 'Sudoku Solver', difficulty: 'hard' },
        ]
      },
      {
        name: 'Divide & Conquer',
        description: 'Partition problem space, solve independently, and merge.',
        problems: [
          { title: 'Merge Sort', difficulty: 'medium' },
          { title: 'Quick Sort', difficulty: 'medium' },
          { title: 'Maximum Subarray (Divide and Conquer)', difficulty: 'medium' },
        ]
      },
      {
        name: 'Subsequences',
        description: 'Include/Exclude choices for combination generation.',
        problems: [
          { title: 'Generate Subsequences', difficulty: 'medium' },
          { title: 'Power Set', difficulty: 'medium' },
          { title: 'Combination Sum', difficulty: 'medium' },
        ]
      }
    ]
  },
  {
    name: 'Graphs',
    description: 'Nodes & Edges, BFS/DFS traversal, topological ordering, DSU, and shortest paths.',
    patterns: [
      {
        name: 'DFS / BFS',
        description: 'Grid & adjacency graph traversal.',
        problems: [
          { title: 'Number of Islands', difficulty: 'medium' },
          { title: 'Rotting Oranges', difficulty: 'medium' },
          { title: 'Word Ladder', difficulty: 'hard' },
          { title: 'Clone Graph', difficulty: 'medium' },
        ]
      },
      {
        name: 'Topological Sort',
        description: 'DAG dependency ordering using Kahn\'s Algorithm or DFS.',
        problems: [
          { title: 'Course Schedule', difficulty: 'medium' },
          { title: 'Alien Dictionary', difficulty: 'hard' },
        ]
      },
      {
        name: 'Union-Find (DSU)',
        description: 'Disjoint Set Union for connected components and MST.',
        problems: [
          { title: 'Number of Connected Components in an Undirected Graph', difficulty: 'medium' },
          { title: 'Kruskal’s Minimum Spanning Tree', difficulty: 'medium' },
        ]
      },
      {
        name: 'Shortest Path',
        description: 'Dijkstra, Bellman-Ford, and Floyd-Warshall path finding.',
        problems: [
          { title: 'Dijkstra Shortest Path', difficulty: 'medium' },
          { title: 'Bellman-Ford Algorithm', difficulty: 'medium' },
          { title: 'Floyd-Warshall Algorithm', difficulty: 'medium' },
        ]
      }
    ]
  },
  {
    name: 'Dynamic Programming',
    description: 'Memoization, tabulation, state transitions, grid DP, knapsacks, and stock trading.',
    patterns: [
      {
        name: '1D DP',
        description: 'Linear state DP transitions.',
        problems: [
          { title: 'Climbing Stairs', difficulty: 'easy' },
          { title: 'House Robber', difficulty: 'medium' },
          { title: 'Coin Change', difficulty: 'medium' },
        ]
      },
      {
        name: '2D / Grid DP',
        description: 'Matrix cell state transitions.',
        problems: [
          { title: 'Unique Paths', difficulty: 'medium' },
          { title: 'Minimum Path Sum', difficulty: 'medium' },
          { title: 'Maximal Square', difficulty: 'medium' },
        ]
      },
      {
        name: 'String DP',
        description: 'Subsequence alignment and string edit distances.',
        problems: [
          { title: 'Longest Common Subsequence', difficulty: 'medium' },
          { title: 'Edit Distance', difficulty: 'medium' },
          { title: 'Regular Expression Matching', difficulty: 'hard' },
        ]
      },
      {
        name: 'Knapsack Variants',
        description: '0/1 Knapsack, subset sums, and target partitioning.',
        problems: [
          { title: '0/1 Knapsack Problem', difficulty: 'medium' },
          { title: 'Subset Sum Problem', difficulty: 'medium' },
          { title: 'Partition Equal Subset Sum', difficulty: 'medium' },
        ]
      },
      {
        name: 'Stock DP',
        description: 'State machine DP for stock trading transactions.',
        problems: [
          { title: 'Best Time to Buy and Sell Stock', difficulty: 'easy' },
          { title: 'Best Time to Buy and Sell Stock II', difficulty: 'medium' },
          { title: 'Best Time to Buy and Sell Stock III', difficulty: 'hard' },
          { title: 'Best Time to Buy and Sell Stock IV', difficulty: 'hard' },
        ]
      }
    ]
  }
]

import { ARRAY_PROBLEMS } from './problems/arrays'

export const ALL_PROBLEMS: Record<string, ProblemDefinition> = {
  ...ARRAY_PROBLEMS,
  'valid-parentheses': {
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'easy',
    description: 'Given a string `s` containing just the characters `\'(\'`, `\')\'`, `\'{\'`, `\'}\'`, `\'[\'` and `\']\'`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    constraints: ['1 ≤ s.length ≤ 10⁴'],
    topics: ['Stack', 'String'],
    pattern: 'Parenthesis & Scoring',
    starter: {
      python: `def isValid(s: str) -> bool:\n    # Your solution here\n    pass\n`,
      javascript: `var isValid = function(s) {\n    // Your solution here\n};\n`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        return false;\n    }\n}\n`
    }
  },
  'koko-eating-bananas': {
    slug: 'koko-eating-bananas',
    title: 'Koko Eating Bananas',
    difficulty: 'medium',
    description: 'Koko loves to eat bananas. There are `n` piles of bananas, the `i`-th pile has `piles[i]` bananas. Return the minimum integer `k` such that she can eat all the bananas within `h` hours.',
    examples: [
      { input: 'piles = [3,6,7,11], h = 8', output: '4' },
      { input: 'piles = [30,11,23,4,20], h = 5', output: '30' }
    ],
    constraints: ['1 ≤ piles.length ≤ 10⁴', 'piles.length ≤ h ≤ 10⁹'],
    topics: ['Binary Search'],
    pattern: 'Binary Search on Answers',
    starter: {
      python: `def minEatingSpeed(piles: list[int], h: int) -> int:\n    # Your solution here\n    pass\n`,
      javascript: `var minEatingSpeed = function(piles, h) {\n    // Your solution here\n};\n`,
      java: `class Solution {\n    public int minEatingSpeed(int[] piles, int h) {\n        return 0;\n    }\n}\n`
    }
  }
}

/**
 * Returns the problem definition for a given slug.
 * Dynamically generates structured problem definition for any title from RISING_BRAIN_TOPICS.
 */
export function getProblemBySlug(slug: string): ProblemDefinition {
  if (ALL_PROBLEMS[slug]) {
    return ALL_PROBLEMS[slug]
  }

  // Search RISING_BRAIN_TOPICS for matching problem title by slug
  for (const topic of RISING_BRAIN_TOPICS) {
    for (const pattern of topic.patterns) {
      for (const p of pattern.problems) {
        if (slugify(p.title) === slug) {
          const fnName = slug.replace(/[^a-zA-Z0-9]/g, '_')
          return {
            slug,
            title: p.title,
            difficulty: p.difficulty as 'easy' | 'medium' | 'hard',
            description: `Given the input parameters for **${p.title}**, design an optimal algorithm using the **${pattern.name}** pattern in **${topic.name}**.\n\n### Problem Statement\nImplement a function that processes the input sequence and returns the expected result satisfying the time complexity bounds of O(N) or O(N log N) using constant or linear auxiliary space.`,
            examples: [
              { input: 'Sample Input: arr = [1, 2, 3, 4, 5]', output: 'Sample Output: [Expected Result]', explanation: `Standard test case verifying the ${pattern.name} logic for ${p.title}.` },
              { input: 'Edge Case Input: arr = []', output: 'Edge Case Output: []', explanation: 'Handling empty or boundary input conditions.' }
            ],
            constraints: ['1 ≤ N ≤ 10⁵', 'Element values: -10⁹ ≤ value ≤ 10⁹', `Recommended Pattern: ${pattern.name}`],
            topics: [topic.name],
            pattern: pattern.name,
            starter: {
              python: `def ${fnName}(*args):\n    # Implement solution using ${pattern.name} pattern\n    pass\n`,
              javascript: `var ${fnName} = function(...args) {\n    // Implement solution using ${pattern.name} pattern\n};\n`,
              java: `class Solution {\n    public Object ${fnName}() {\n        // Implement solution using ${pattern.name} pattern\n        return null;\n    }\n}\n`
            }
          }
        }
      }
    }
  }

  // Format title fallback from slug: "search-in-rotated-sorted-array" -> "Search In Rotated Sorted Array"
  const formattedTitle = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    slug,
    title: formattedTitle,
    difficulty: 'medium',
    description: `Given the constraints for **${formattedTitle}**, implement an optimal solution algorithm.`,
    examples: [
      { input: 'Sample Input 1', output: 'Sample Output 1', explanation: 'Standard example case.' }
    ],
    constraints: ['1 ≤ input.length ≤ 10⁵'],
    topics: ['Algorithms'],
    starter: {
      python: `# Solution for ${formattedTitle}\ndef solve(*args):\n    # Your solution here\n    pass\n`,
      javascript: `// Solution for ${formattedTitle}\nfunction solve(...args) {\n    // Your solution here\n};\n`,
      java: `// Solution for ${formattedTitle}\nclass Solution {\n    public void solve() {\n        // Your solution here\n    }\n}\n`
    }
  }
}

export interface PatternQuiz {
  patternName: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export const PATTERN_QUIZZES: Record<string, PatternQuiz> = {
  'Two-Pointer': {
    patternName: 'Two-Pointer',
    question: 'When using Two Pointers on a sorted array to find a target sum, if current_sum > target, what is the correct pointer adjustment?',
    options: [
      'Move the left pointer right (left++)',
      'Move the right pointer left (right--)',
      'Reset both pointers to origin',
      'Increment target value'
    ],
    correctIndex: 1,
    explanation: 'Decrementing the right pointer decreases the total sum because the array is sorted in ascending order.'
  },
  'Sliding Window': {
    patternName: 'Sliding Window',
    question: 'In a variable-size sliding window, when a constraint is violated, how is the window shrink step performed?',
    options: [
      'Increment the right boundary pointer',
      'Increment the left boundary pointer and update window state',
      'Clear the array element',
      'Restart window from index 0'
    ],
    correctIndex: 1,
    explanation: 'Incrementing the left pointer shrinks the window from the left until the constraint becomes valid again.'
  },
  'Prefix Sum': {
    patternName: 'Prefix Sum',
    question: 'Given a 0-indexed prefix sum array P, what formula calculates the sum of subarray from index L to R inclusive?',
    options: [
      'P[R] + P[L]',
      'P[R] - P[L - 1] (or P[R] if L == 0)',
      'P[R] * P[L]',
      'P[R - L]'
    ],
    correctIndex: 1,
    explanation: 'P[R] stores the sum from 0 to R. Subtracting P[L-1] removes the sum of elements before index L.'
  },
  'Kadane’s Algorithm': {
    patternName: 'Kadane’s Algorithm',
    question: 'What state update rule defines Kadane’s algorithm for current max subarray ending at index i?',
    options: [
      'current_max = max(nums[i], current_max + nums[i])',
      'current_max = current_max * nums[i]',
      'current_max = nums[i] - nums[i-1]',
      'current_max = total_sum / 2'
    ],
    correctIndex: 0,
    explanation: 'Either extend the previous subarray sum (current_max + nums[i]) or start a new subarray at nums[i].'
  },
  'Monotonic Stack': {
    patternName: 'Monotonic Stack',
    question: 'To efficiently find the Next Greater Element for each position in O(N), what type of stack should be maintained?',
    options: [
      'Monotonic Decreasing Stack',
      'Monotonic Increasing Stack',
      'Double Ended Priority Queue',
      'Randomized Stack'
    ],
    correctIndex: 0,
    explanation: 'A monotonic decreasing stack keeps elements in decreasing order; when a larger element arrives, it pops smaller elements and sets their next greater value.'
  },
  'Binary Search on Answers': {
    patternName: 'Binary Search on Answers',
    question: 'What essential property must a predicate check function satisfy to apply Binary Search on an answer range?',
    options: [
      'Monotonicity (the condition evaluates to true/false in contiguous ranges)',
      'Non-linear periodicity',
      'Random distribution',
      'Negative slope'
    ],
    correctIndex: 0,
    explanation: 'Monotonicity guarantees that if a value X is feasible, all values Y > X (or Y < X) are also feasible.'
  }
}

export interface SheetNextResult {
  nextProblem: { slug: string; title: string; difficulty: string } | null
  isLastInPattern: boolean
  patternName: string
  quiz?: PatternQuiz
}

export function getNextProblemInSheetOrder(currentSlug: string): SheetNextResult {
  let allProbs: { slug: string; title: string; difficulty: string; patternName: string }[] = []
  
  for (const topic of RISING_BRAIN_TOPICS) {
    for (const pattern of topic.patterns) {
      for (const p of pattern.problems) {
        allProbs.push({
          slug: slugify(p.title),
          title: p.title,
          difficulty: p.difficulty,
          patternName: pattern.name
        })
      }
    }
  }

  const index = allProbs.findIndex(p => p.slug === currentSlug)
  if (index === -1 || index === allProbs.length - 1) {
    return {
      nextProblem: null,
      isLastInPattern: true,
      patternName: allProbs[index]?.patternName || 'DSA Pattern',
      quiz: PATTERN_QUIZZES[allProbs[index]?.patternName] || PATTERN_QUIZZES['Two-Pointer']
    }
  }

  const currentProb = allProbs[index]
  const nextProb = allProbs[index + 1]
  const isLastInPattern = currentProb.patternName !== nextProb.patternName

  return {
    nextProblem: nextProb,
    isLastInPattern,
    patternName: currentProb.patternName,
    quiz: isLastInPattern ? (PATTERN_QUIZZES[currentProb.patternName] || PATTERN_QUIZZES['Two-Pointer']) : undefined
  }
}

