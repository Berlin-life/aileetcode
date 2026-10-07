import { ProblemDefinition } from '../problems-data'

export const STACK_PROBLEMS: Record<string, ProblemDefinition> = {
  'daily-temperatures': {
    slug: 'daily-temperatures',
    title: 'Daily Temperatures',
    difficulty: 'medium',
    description: 'Given an array of integers `temperatures` represents the daily temperatures, return *an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`-th day to get a warmer temperature*. If there is no future day for which this is possible, keep `answer[i] == 0` instead.',
    examples: [
      { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' },
      { input: 'temperatures = [30,40,50,60]', output: '[1,1,1,0]' },
      { input: 'temperatures = [30,60,90]', output: '[1,1,0]' }
    ],
    constraints: ['1 ≤ temperatures.length ≤ 10⁵', '30 ≤ temperatures[i] ≤ 100'],
    topics: ['Array', 'Stack', 'Monotonic Stack'],
    pattern: 'Monotonic Stack',
    starter: {
      python: `def dailyTemperatures(temperatures: list[int]) -> list[int]:\n    n = len(temperatures)\n    ans = [0] * n\n    stack = []  # store indices\n    for i, t in enumerate(temperatures):\n        while stack and temperatures[stack[-1]] < t:\n            prev_idx = stack.pop()\n            ans[prev_idx] = i - prev_idx\n        stack.append(i)\n    return ans\n`,
      javascript: `var dailyTemperatures = function(temperatures) {\n    const n = temperatures.length;\n    const ans = new Array(n).fill(0);\n    const stack = [];\n    for (let i = 0; i < n; i++) {\n        while (stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {\n            const prevIdx = stack.pop();\n            ans[prevIdx] = i - prevIdx;\n        }\n        stack.push(i);\n    }\n    return ans;\n};\n`,
      java: `class Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        int n = temperatures.length;\n        int[] ans = new int[n];\n        Stack<Integer> stack = new Stack<>();\n        for (int i = 0; i < n; i++) {\n            while (!stack.isEmpty() && temperatures[stack.peek()] < temperatures[i]) {\n                int prevIdx = stack.pop();\n                ans[prevIdx] = i - prevIdx;\n            }\n            stack.push(i);\n        }\n        return ans;\n    }\n}\n`
    }
  },
  'evaluate-reverse-polish-notation': {
    slug: 'evaluate-reverse-polish-notation',
    title: 'Evaluate Reverse Polish Notation',
    difficulty: 'medium',
    description: 'You are given an array of strings `tokens` that represents an arithmetic expression in a **Reverse Polish Notation**.\n\nEvaluate the expression. Return *an integer that represents the value of the expression*.\n\nNote that:\n- Valid operators are `\'+\'`, `\'-\'`, `\'*\'`, and `\'/\'`.\n- Division between two integers truncates toward zero.',
    examples: [
      { input: 'tokens = ["2","1","+","3","*"]', output: '9', explanation: '((2 + 1) * 3) = 9' },
      { input: 'tokens = ["4","13","5","/","+"]', output: '6', explanation: '(4 + (13 / 5)) = 6' }
    ],
    constraints: ['1 ≤ tokens.length ≤ 10⁴', 'tokens[i] is either an operator or an integer in range [-200, 200].'],
    topics: ['Array', 'Math', 'Stack'],
    pattern: 'Expression Evaluation',
    starter: {
      python: `def evalRPN(tokens: list[str]) -> int:\n    stack = []\n    for token in tokens:\n        if token in "+-*/":\n            b, a = stack.pop(), stack.pop()\n            if token == '+': stack.append(a + b)\n            elif token == '-': stack.append(a - b)\n            elif token == '*': stack.append(a * b)\n            else: stack.append(int(a / b))\n        else:\n            stack.append(int(token))\n    return stack[0]\n`,
      javascript: `var evalRPN = function(tokens) {\n    const stack = [];\n    for (const token of tokens) {\n        if (['+', '-', '*', '/'].includes(token)) {\n            const b = stack.pop();\n            const a = stack.pop();\n            if (token === '+') stack.push(a + b);\n            else if (token === '-') stack.push(a - b);\n            else if (token === '*') stack.push(a * b);\n            else stack.push(Math.trunc(a / b));\n        } else {\n            stack.push(Number(token));\n        }\n    }\n    return stack[0];\n};\n`,
      java: `class Solution {\n    public int evalRPN(String[] tokens) {\n        Stack<Integer> stack = new Stack<>();\n        for (String t : tokens) {\n            if (t.equals("+")) stack.push(stack.pop() + stack.pop());\n            else if (t.equals("-")) { int b = stack.pop(), a = stack.pop(); stack.push(a - b); }\n            else if (t.equals("*")) stack.push(stack.pop() * stack.pop());\n            else if (t.equals("/")) { int b = stack.pop(), a = stack.pop(); stack.push(a / b); }\n            else stack.push(Integer.parseInt(t));\n        }\n        return stack.pop();\n    }\n}\n`
    }
  }
}
