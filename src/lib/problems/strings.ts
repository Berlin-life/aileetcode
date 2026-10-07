import { ProblemDefinition } from '../problems-data'

export const STRING_PROBLEMS: Record<string, ProblemDefinition> = {
  'valid-palindrome': {
    slug: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'easy',
    description: 'A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.',
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' },
      { input: 's = " "', output: 'true', explanation: 's is an empty string "" after removing non-alphanumeric characters. An empty string reads the same forward and backward.' }
    ],
    constraints: ['1 ≤ s.length ≤ 2 * 10⁵', 's consists only of printable ASCII characters.'],
    topics: ['Two Pointers', 'String'],
    pattern: 'Two-Pointer (Palindrome)',
    starter: {
      python: `def isPalindrome(s: str) -> bool:\n    left, right = 0, len(s) - 1\n    while left < right:\n        while left < right and not s[left].isalnum():\n            left += 1\n        while left < right and not s[right].isalnum():\n            right -= 1\n        if s[left].lower() != s[right].lower():\n            return False\n        left += 1\n        right -= 1\n    return True\n`,
      javascript: `var isPalindrome = function(s) {\n    let left = 0, right = s.length - 1;\n    while (left < right) {\n        while (left < right && !/[a-zA-Z0-9]/.test(s[left])) left++;\n        while (left < right && !/[a-zA-Z0-9]/.test(s[right])) right--;\n        if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;\n        left++;\n        right--;\n    }\n    return true;\n};\n`,
      java: `class Solution {\n    public boolean isPalindrome(String s) {\n        int left = 0, right = s.length() - 1;\n        while (left < right) {\n            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;\n            left++;\n            right--;\n        }\n        return true;\n    }\n}\n`
    }
  },
  'longest-substring-without-repeating-characters': {
    slug: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'medium',
    description: 'Given a string `s`, find the length of the **longest substring** without repeating characters.',
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with the length of 3.' }
    ],
    constraints: ['0 ≤ s.length ≤ 5 * 10⁴', 's consists of English letters, digits, symbols and spaces.'],
    topics: ['Hash Table', 'String', 'Sliding Window'],
    pattern: 'Sliding Window (String)',
    starter: {
      python: `def lengthOfLongestSubstring(s: str) -> int:\n    char_set = set()\n    left = 0\n    max_len = 0\n    for right in range(len(s)):\n        while s[right] in char_set:\n            char_set.remove(s[left])\n            left += 1\n        char_set.add(s[right])\n        max_len = max(max_len, right - left + 1)\n    return max_len\n`,
      javascript: `var lengthOfLongestSubstring = function(s) {\n    const seen = new Set();\n    let left = 0, maxLen = 0;\n    for (let right = 0; right < s.length; right++) {\n        while (seen.has(s[right])) {\n            seen.delete(s[left]);\n            left++;\n        }\n        seen.add(s[right]);\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n};\n`,
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        Set<Character> seen = new HashSet<>();\n        int left = 0, maxLen = 0;\n        for (int right = 0; right < s.length(); right++) {\n            while (seen.contains(s.charAt(right))) {\n                seen.remove(s.charAt(left));\n                left++;\n            }\n            seen.add(s.charAt(right));\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n}\n`
    }
  },
  'find-all-anagrams-in-a-string': {
    slug: 'find-all-anagrams-in-a-string',
    title: 'Find All Anagrams in a String',
    difficulty: 'medium',
    description: 'Given two strings `s` and `p`, return *an array of all the start indices of `p`\'s anagrams in `s`*. You may return the answer in **any order**.',
    examples: [
      { input: 's = "cbaebabacd", p = "abc"', output: '[0,6]', explanation: 'The substring with start index = 0 is "cba", which is an anagram of "abc". The substring with start index = 6 is "bac", which is an anagram of "abc".' },
      { input: 's = "abab", p = "ab"', output: '[0,1,2]' }
    ],
    constraints: ['1 ≤ s.length, p.length ≤ 3 * 10⁴', 's and p consist of lowercase English letters.'],
    topics: ['Hash Table', 'String', 'Sliding Window'],
    pattern: 'Sliding Window (String)',
    starter: {
      python: `def findAnagrams(s: str, p: str) -> list[int]:\n    # Implement sliding window algorithm\n    pass\n`,
      javascript: `var findAnagrams = function(s, p) {\n    // Implement sliding window algorithm\n};\n`,
      java: `class Solution {\n    public List<Integer> findAnagrams(String s, String p) {\n        return new ArrayList<>();\n    }\n}\n`
    }
  }
}
