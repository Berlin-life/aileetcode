import { Problem } from "@/types";

export const SEED_PROBLEMS: Partial<Problem>[] = [
  {
    id: 1,
    title: "Pair Sum",
    slug: "pair-sum",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    difficulty: "easy",
    topics: ["arrays", "hashing"],
    patterns: ["two_pointers"],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(n)",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    hints: [
      "Could you solve it using brute force? What would the time complexity be?",
      "Is there a way to look up if the complement (target - current_number) exists in the array?",
      "What data structure provides O(1) lookup time?",
      "Try using a Hash Map to store the elements and their indices as you iterate through the array.",
      "As you iterate through the array, check if `target - nums[i]` is already in the hash map. If it is, you found your pair!"
    ],
    solution: {
      java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[] {};\n    }\n}",
      python: "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        numMap = {}\n        for i, num in enumerate(nums):\n            complement = target - num\n            if complement in numMap:\n                return [numMap[complement], i]\n            numMap[num] = i\n        return []",
      javascript: "var twoSum = function(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n};",
      cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> numMap;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (numMap.count(complement)) {\n                return {numMap[complement], i};\n            }\n            numMap[nums[i]] = i;\n        }\n        return {};\n    }\n};"
    },
    testCases: [
      { input: "[2,7,11,15]\n9", expectedOutput: "[0,1]", isHidden: false },
      { input: "[3,2,4]\n6", expectedOutput: "[1,2]", isHidden: false },
      { input: "[3,3]\n6", expectedOutput: "[0,1]", isHidden: true }
    ]
  },
  {
    id: 2,
    title: "Find Duplicate Elements",
    slug: "find-duplicate-elements",
    description: "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
    difficulty: "easy",
    topics: ["arrays", "hashing"],
    patterns: ["hashing"],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(n)",
    examples: [
      { input: "nums = [1,2,3,1]", output: "true", explanation: "1 appears twice." },
      { input: "nums = [1,2,3,4]", output: "false", explanation: "All elements are distinct." }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    hints: [
      "How can you keep track of elements you've already seen?",
      "Consider using a data structure that prevents duplicate entries.",
      "A Hash Set is perfect for this. Add elements as you iterate.",
      "If you try to add an element to the set and it's already there, you've found a duplicate.",
      "Alternatively, compare the length of the original array with the length of a set created from the array."
    ],
    solution: {
      java: "class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        Set<Integer> set = new HashSet<>();\n        for (int num : nums) {\n            if (!set.add(num)) return true;\n        }\n        return false;\n    }\n}",
      python: "class Solution:\n    def containsDuplicate(self, nums: List[int]) -> bool:\n        return len(set(nums)) != len(nums)",
      javascript: "var containsDuplicate = function(nums) {\n    return new Set(nums).size !== nums.length;\n};",
      cpp: "class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        unordered_set<int> seen(nums.begin(), nums.end());\n        return seen.size() != nums.size();\n    }\n};"
    },
    testCases: [
      { input: "[1,2,3,1]", expectedOutput: "true", isHidden: false },
      { input: "[1,2,3,4]", expectedOutput: "false", isHidden: false },
      { input: "[1,1,1,3,3,4,3,2,4,2]", expectedOutput: "true", isHidden: true }
    ]
  },
  {
    id: 3,
    title: "Valid Anagram",
    slug: "valid-anagram",
    description: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.",
    difficulty: "easy",
    topics: ["strings", "hashing"],
    patterns: ["hashing"],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      { input: "s = \"anagram\", t = \"nagaram\"", output: "true", explanation: "Both strings contain the same frequency of each letter." },
      { input: "s = \"rat\", t = \"car\"", output: "false" }
    ],
    constraints: [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters."
    ],
    hints: [
      "Check if the lengths of s and t are equal first. If not, return false immediately.",
      "You can count character frequencies using an array of size 26 or a hash map.",
      "Increment frequency for chars in s, decrement for chars in t.",
      "If all counts end up at 0, they are anagrams!"
    ],
    solution: {
      java: "class Solution {\n    public boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] count = new int[26];\n        for (int i = 0; i < s.length(); i++) {\n            count[s.charAt(i) - 'a']++;\n            count[t.charAt(i) - 'a']--;\n        }\n        for (int c : count) if (c != 0) return false;\n        return true;\n    }\n}",
      python: "class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        return Counter(s) == Counter(t)",
      javascript: "var isAnagram = function(s, t) {\n    if (s.length !== t.length) return false;\n    const count = new Array(26).fill(0);\n    for (let i = 0; i < s.length; i++) {\n        count[s.charCodeAt(i) - 97]++;\n        count[t.charCodeAt(i) - 97]--;\n    }\n    return count.every(c => c === 0);\n};",
      cpp: "class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        if (s.length() != t.length()) return false;\n        vector<int> count(26, 0);\n        for (int i = 0; i < s.length(); i++) {\n            count[s[i] - 'a']++;\n            count[t[i] - 'a']--;\n        }\n        for (int c : count) if (c != 0) return false;\n        return true;\n    }\n};"
    },
    testCases: [
      { input: "\"anagram\"\n\"nagaram\"", expectedOutput: "true", isHidden: false },
      { input: "\"rat\"\n\"car\"", expectedOutput: "false", isHidden: false }
    ]
  },
  {
    id: 4,
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    description: "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.",
    difficulty: "easy",
    topics: ["strings", "stack"],
    patterns: ["stack"],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(n)",
    examples: [
      { input: "s = \"()[]{}\"", output: "true" },
      { input: "s = \"(]\"", output: "false" }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    hints: [
      "Use a Stack data structure.",
      "Push opening brackets onto the stack.",
      "When encountering a closing bracket, pop from the stack and check if it matches.",
      "If the stack is empty when popping, or the brackets don't match, return false.",
      "At the end, check if the stack is completely empty."
    ],
    solution: {
      java: "class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}",
      python: "class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        mapping = {')': '(', '}': '{', ']': '['}\n        for char in s:\n            if char in mapping:\n                top = stack.pop() if stack else '#'\n                if mapping[char] != top:\n                    return False\n            else:\n                stack.append(char)\n        return not stack",
      javascript: "var isValid = function(s) {\n    const stack = [];\n    const map = { ')': '(', '}': '{', ']': '[' };\n    for (let char of s) {\n        if (map[char]) {\n            if (stack.pop() !== map[char]) return false;\n        } else {\n            stack.push(char);\n        }\n    }\n    return stack.length === 0;\n};",
      cpp: "class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == '(' || c == '{' || c == '[') st.push(c);\n            else {\n                if (st.empty()) return false;\n                char top = st.top(); st.pop();\n                if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) return false;\n            }\n        }\n        return st.empty();\n    }\n};"
    },
    testCases: [
      { input: "\"()\"", expectedOutput: "true", isHidden: false },
      { input: "\"()[]{}\"", expectedOutput: "true", isHidden: false },
      { input: "\"(]\"", expectedOutput: "false", isHidden: false }
    ]
  },
  {
    id: 5,
    title: "Binary Search",
    slug: "binary-search",
    description: "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.",
    difficulty: "easy",
    topics: ["binary_search"],
    patterns: ["modified_binary_search"],
    expectedTimeComplexity: "O(log n)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "9 exists in nums and its index is 4" }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All integers in nums are unique.",
      "nums is sorted in ascending order."
    ],
    hints: [
      "Maintain a left pointer at 0 and a right pointer at len(nums) - 1.",
      "Calculate middle index mid = left + (right - left) / 2.",
      "If nums[mid] == target, return mid.",
      "If nums[mid] < target, search the right half: left = mid + 1.",
      "If nums[mid] > target, search the left half: right = mid - 1."
    ],
    solution: {
      java: "class Solution {\n    public int search(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n}",
      python: "class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        left, right = 0, len(nums) - 1\n        while left <= right:\n            mid = (left + right) // 2\n            if nums[mid] == target:\n                return mid\n            elif nums[mid] < target:\n                left = mid + 1\n            else:\n                right = mid - 1\n        return -1",
      javascript: "var search = function(nums, target) {\n    let left = 0, right = nums.length - 1;\n    while (left <= right) {\n        let mid = Math.floor((left + right) / 2);\n        if (nums[mid] === target) return mid;\n        if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n};",
      cpp: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int left = 0, right = nums.size() - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n};"
    },
    testCases: [
      { input: "[-1,0,3,5,9,12]\n9", expectedOutput: "4", isHidden: false },
      { input: "[-1,0,3,5,9,12]\n2", expectedOutput: "-1", isHidden: false }
    ]
  },
  {
    id: 6,
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    description: "Given an integer array `nums`, find the subarray with the largest sum, and return *its sum*.",
    difficulty: "medium",
    topics: ["arrays", "dynamic_programming"],
    patterns: ["sliding_window"],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    hints: [
      "Use Kadane's Algorithm.",
      "Maintain a current_sum and a max_sum.",
      "For each element, decide whether to add it to current_sum or start a new subarray from current element.",
      "current_sum = max(nums[i], current_sum + nums[i])",
      "Update max_sum = max(max_sum, current_sum)."
    ],
    solution: {
      java: "class Solution {\n    public int maxSubArray(int[] nums) {\n        int maxSum = nums[0], currentSum = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            currentSum = Math.max(nums[i], currentSum + nums[i]);\n            maxSum = Math.max(maxSum, currentSum);\n        }\n        return maxSum;\n    }\n}",
      python: "class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        max_sum = current_sum = nums[0]\n        for num in nums[1:]:\n            current_sum = max(num, current_sum + num)\n            max_sum = max(max_sum, current_sum)\n        return max_sum",
      javascript: "var maxSubArray = function(nums) {\n    let maxSum = nums[0], currentSum = nums[0];\n    for (let i = 1; i < nums.length; i++) {\n        currentSum = Math.max(nums[i], currentSum + nums[i]);\n        maxSum = Math.max(maxSum, currentSum);\n    }\n    return maxSum;\n};",
      cpp: "class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        int maxSum = nums[0], currentSum = nums[0];\n        for (size_t i = 1; i < nums.size(); i++) {\n            currentSum = max(nums[i], currentSum + nums[i]);\n            maxSum = max(maxSum, currentSum);\n        }\n        return maxSum;\n    }\n};"
    },
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6", isHidden: false },
      { input: "[1]", expectedOutput: "1", isHidden: false }
    ]
  }
];
