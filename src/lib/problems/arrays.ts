import { ProblemDefinition } from '../problems-data'

export const ARRAY_PROBLEMS: Record<string, ProblemDefinition> = {
  'move-zeroes': {
    slug: 'move-zeroes',
    title: 'Move Zeroes',
    difficulty: 'easy',
    description: 'Given an integer array `nums`, move all `0`s to the end of it while maintaining the relative order of the non-zero elements.\n\nNote that you must do this **in-place** without making a copy of the array.',
    examples: [
      { input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]', explanation: '1, 3, 12 maintain their order and zeroes move to end.' },
      { input: 'nums = [0]', output: '[0]' }
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁴', '-2³¹ ≤ nums[i] ≤ 2³¹ - 1'],
    topics: ['Array', 'Two Pointers'],
    pattern: 'Two-Pointer',
    starter: {
      python: `def moveZeroes(nums: list[int]) -> None:\n    """\n    Do not return anything, modify nums in-place instead.\n    """\n    pass\n`,
      javascript: `var moveZeroes = function(nums) {\n    // Modify nums in-place\n};\n`,
      java: `class Solution {\n    public void moveZeroes(int[] nums) {\n        // Modify nums in-place\n    }\n}\n`
    }
  },
  'two-sum-ii---input-array-is-sorted': {
    slug: 'two-sum-ii---input-array-is-sorted',
    title: 'Two Sum II - Input Array Is Sorted',
    difficulty: 'medium',
    description: 'Given a **1-indexed** array of integers `numbers` that is already **sorted in non-decreasing order**, find two numbers such that they add up to a specific `target` number.\n\nReturn the indices of the two numbers, `index1` and `index2`, added by one as an integer array `[index1, index2]` of length 2.\n\nYour solution must use only constant extra space.',
    examples: [
      { input: 'numbers = [2,7,11,15], target = 9', output: '[1,2]', explanation: 'The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2. We return [1, 2].' },
      { input: 'numbers = [2,3,4], target = 6', output: '[1,3]' },
      { input: 'numbers = [-1,0], target = -1', output: '[1,2]' }
    ],
    constraints: ['2 ≤ numbers.length ≤ 3 * 10⁴', '-1000 ≤ numbers[i] ≤ 1000', 'numbers is sorted in non-decreasing order.'],
    topics: ['Array', 'Two Pointers', 'Binary Search'],
    pattern: 'Two-Pointer',
    starter: {
      python: `def twoSum(numbers: list[int], target: int) -> list[int]:\n    pass\n`,
      javascript: `var twoSum = function(numbers, target) {\n    \n};\n`,
      java: `class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        return new int[]{};\n    }\n}\n`
    }
  },
  '3sum': {
    slug: '3sum',
    title: '3Sum',
    difficulty: 'medium',
    description: 'Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.',
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]', explanation: 'Distinct triplets summing to 0.' },
      { input: 'nums = [0,1,1]', output: '[]' },
      { input: 'nums = [0,0,0]', output: '[[0,0,0]]' }
    ],
    constraints: ['3 ≤ nums.length ≤ 3000', '-10⁵ ≤ nums[i] ≤ 10⁵'],
    topics: ['Array', 'Two Pointers', 'Sorting'],
    pattern: 'Two-Pointer',
    starter: {
      python: `def threeSum(nums: list[int]) -> list[list[int]]:\n    pass\n`,
      javascript: `var threeSum = function(nums) {\n    \n};\n`,
      java: `class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        return new ArrayList<>();\n    }\n}\n`
    }
  },
  'sort-colors': {
    slug: 'sort-colors',
    title: 'Sort Colors',
    difficulty: 'medium',
    description: 'Given an array `nums` with `n` objects colored red, white, or blue, sort them **in-place** so that objects of the same color are adjacent, with the colors in the order red, white, and blue.\n\nWe will use the integers `0`, `1`, and `2` to represent the color red, white, and blue, respectively.',
    examples: [
      { input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]' },
      { input: 'nums = [2,0,1]', output: '[0,1,2]' }
    ],
    constraints: ['n == nums.length', '1 ≤ n ≤ 300', 'nums[i] is either 0, 1, or 2.'],
    topics: ['Array', 'Two Pointers', 'Sorting'],
    pattern: 'Two-Pointer',
    starter: {
      python: `def sortColors(nums: list[int]) -> None:\n    pass\n`,
      javascript: `var sortColors = function(nums) {\n    \n};\n`,
      java: `class Solution {\n    public void sortColors(int[] nums) {\n        \n    }\n}\n`
    }
  },
  'maximum-sum-subarray-of-size-k': {
    slug: 'maximum-sum-subarray-of-size-k',
    title: 'Maximum Sum Subarray of Size K',
    difficulty: 'easy',
    description: 'Given an array of integers `nums` and a positive integer `k`, find the maximum sum of any contiguous subarray of size `k`.',
    examples: [
      { input: 'nums = [2, 1, 5, 1, 3, 2], k = 3', output: '9', explanation: 'Subarray with maximum sum is [5, 1, 3] with sum 9.' },
      { input: 'nums = [2, 3, 4, 1, 5], k = 2', output: '7' }
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁵', '1 ≤ k ≤ nums.length'],
    topics: ['Array', 'Sliding Window'],
    pattern: 'Sliding Window',
    starter: {
      python: `def maxSubArrayOfSizeK(nums: list[int], k: int) -> int:\n    pass\n`,
      javascript: `var maxSubArrayOfSizeK = function(nums, k) {\n    \n};\n`,
      java: `class Solution {\n    public int maxSubArrayOfSizeK(int[] nums, k) {\n        return 0;\n    }\n}\n`
    }
  },
  'max-consecutive-ones': {
    slug: 'max-consecutive-ones',
    title: 'Max Consecutive Ones',
    difficulty: 'easy',
    description: 'Given a binary array `nums`, return the maximum number of consecutive `1`s in the array.',
    examples: [
      { input: 'nums = [1,1,0,1,1,1]', output: '3', explanation: 'The maximum number of consecutive 1s is 3.' },
      { input: 'nums = [1,0,1,1,0,1]', output: '2' }
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁵', 'nums[i] is either 0 or 1.'],
    topics: ['Array', 'Sliding Window'],
    pattern: 'Sliding Window',
    starter: {
      python: `def findMaxConsecutiveOnes(nums: list[int]) -> int:\n    pass\n`,
      javascript: `var findMaxConsecutiveOnes = function(nums) {\n    \n};\n`,
      java: `class Solution {\n    public int findMaxConsecutiveOnes(int[] nums) {\n        return 0;\n    }\n}\n`
    }
  },
  'find-pivot-index': {
    slug: 'find-pivot-index',
    title: 'Find Pivot Index',
    difficulty: 'easy',
    description: 'Given an array of integers `nums`, calculate the **pivot index** of this array.\n\nThe pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index\'s right.',
    examples: [
      { input: 'nums = [1,7,3,6,5,6]', output: '3', explanation: 'Left sum = 1 + 7 + 3 = 11, Right sum = 5 + 6 = 11.' },
      { input: 'nums = [1,2,3]', output: '-1' }
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁴', '-1000 ≤ nums[i] ≤ 1000'],
    topics: ['Array', 'Prefix Sum'],
    pattern: 'Prefix Sum',
    starter: {
      python: `def pivotIndex(nums: list[int]) -> int:\n    pass\n`,
      javascript: `var pivotIndex = function(nums) {\n    \n};\n`,
      java: `class Solution {\n    public int pivotIndex(int[] nums) {\n        return -1;\n    }\n}\n`
    }
  },
  'subarray-sum-equals-k': {
    slug: 'subarray-sum-equals-k',
    title: 'Subarray Sum Equals K',
    difficulty: 'medium',
    description: 'Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.',
    examples: [
      { input: 'nums = [1,1,1], k = 2', output: '2' },
      { input: 'nums = [1,2,3], k = 3', output: '2' }
    ],
    constraints: ['1 ≤ nums.length ≤ 2 * 10⁴', '-1000 ≤ nums[i] ≤ 1000', '-10⁷ ≤ k ≤ 10⁷'],
    topics: ['Array', 'Hash Table', 'Prefix Sum'],
    pattern: 'Prefix Sum',
    starter: {
      python: `def subarraySum(nums: list[int], k: int) -> int:\n    pass\n`,
      javascript: `var subarraySum = function(nums, k) {\n    \n};\n`,
      java: `class Solution {\n    public int subarraySum(int[] nums, int k) {\n        return 0;\n    }\n}\n`
    }
  },
  'maximum-subarray': {
    slug: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'medium',
    description: 'Given an integer array `nums`, find the subarray with the largest sum, and return *its sum*.',
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
      { input: 'nums = [1]', output: '1' }
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁵', '-10⁴ ≤ nums[i] ≤ 10⁴'],
    topics: ['Array', 'Divide and Conquer', 'Dynamic Programming'],
    pattern: 'Kadane’s Algorithm',
    starter: {
      python: `def maxSubArray(nums: list[int]) -> int:\n    pass\n`,
      javascript: `var maxSubArray = function(nums) {\n    \n};\n`,
      java: `class Solution {\n    public int maxSubArray(int[] nums) {\n        return 0;\n    }\n}\n`
    }
  }
}
