import { ProblemDefinition } from '../problems-data'

export const DP_PROBLEMS: Record<string, ProblemDefinition> = {
  'climbing-stairs': {
    slug: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'easy',
    description: 'You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?',
    examples: [
      { input: 'n = 2', output: '2', explanation: '1. 1 step + 1 step\n2. 2 steps' },
      { input: 'n = 3', output: '3', explanation: '1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step' }
    ],
    constraints: ['1 ≤ n ≤ 45'],
    topics: ['Math', 'Dynamic Programming', 'Memoization'],
    pattern: '1D DP',
    starter: {
      python: `def climbStairs(n: int) -> int:\n    if n <= 2:\n        return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b\n`,
      javascript: `var climbStairs = function(n) {\n    if (n <= 2) return n;\n    let a = 1, b = 2;\n    for (let i = 3; i <= n; i++) {\n        let temp = a + b;\n        a = b;\n        b = temp;\n    }\n    return b;\n};\n`,
      java: `class Solution {\n    public int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int temp = a + b;\n            a = b;\n            b = temp;\n        }\n        return b;\n    }\n}\n`
    }
  },
  'house-robber': {
    slug: 'house-robber',
    title: 'House Robber',
    difficulty: 'medium',
    description: 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.\n\nGiven an integer array `nums` representing the amount of money of each house, return *the maximum amount of money you can rob tonight without alerting the police*.',
    examples: [
      { input: 'nums = [1,2,3,1]', output: '4', explanation: 'Rob house 1 (money = 1) and then rob house 3 (money = 3). Total = 1 + 3 = 4.' },
      { input: 'nums = [2,7,9,3,1]', output: '12', explanation: 'Rob house 1 (money = 2), house 3 (money = 9) and house 5 (money = 1). Total = 2 + 9 + 1 = 12.' }
    ],
    constraints: ['1 ≤ nums.length ≤ 100', '0 ≤ nums[i] ≤ 400'],
    topics: ['Array', 'Dynamic Programming'],
    pattern: '1D DP',
    starter: {
      python: `def rob(nums: list[int]) -> int:\n    prev1, prev2 = 0, 0\n    for num in nums:\n        prev1, prev2 = max(prev2 + num, prev1), prev1\n    return prev1\n`,
      javascript: `var rob = function(nums) {\n    let prev1 = 0, prev2 = 0;\n    for (const num of nums) {\n        const temp = Math.max(prev2 + num, prev1);\n        prev2 = prev1;\n        prev1 = temp;\n    }\n    return prev1;\n};\n`,
      java: `class Solution {\n    public int rob(int[] nums) {\n        int prev1 = 0, prev2 = 0;\n        for (int num : nums) {\n            int temp = Math.max(prev2 + num, prev1);\n            prev2 = prev1;\n            prev1 = temp;\n        }\n        return prev1;\n    }\n}\n`
    }
  }
}
