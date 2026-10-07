import type { Problem, UnderstandingQuestion, UnderstandingScore, AIMessage } from '@/types'
import type { 
  AIProvider, 
  CodeReviewResult, 
  ApproachEvaluation, 
  PatternEvaluation, 
  EdgeCaseEvaluation, 
  ComplexityEvaluation 
} from '../types'

export class MockAIProvider implements AIProvider {
  async generateUnderstandingQuestions(problem: Problem, previousAnswers?: string[]): Promise<UnderstandingQuestion[]> {
    const numQuestions = problem.difficulty === 'easy' ? 3 : problem.difficulty === 'medium' ? 5 : 6;
    
    const questions: UnderstandingQuestion[] = [
      { id: 'q1', text: `What are the inputs for '${problem.title}' and what are their types?`, type: 'approach' },
      { id: 'q2', text: `What should the output represent for this problem?`, type: 'approach' },
      { id: 'q3', text: `Looking at the constraints, what kind of time complexity are we aiming for?`, type: 'approach' },
    ];
    
    if (numQuestions >= 5) {
      questions.push({ id: 'q4', text: `Can you identify any edge cases from the description?`, type: 'approach' });
      questions.push({ id: 'q5', text: `What approach would you try first?`, type: 'approach' });
    }
    
    if (numQuestions >= 6) {
      questions.push({ id: 'q6', text: `Is there a specific algorithmic pattern that fits this problem?`, type: 'approach' });
    }
    
    return questions.slice(0, numQuestions);
  }

  async evaluateUnderstanding(problem: Problem, questions: UnderstandingQuestion[], answers: string[]): Promise<UnderstandingScore> {
    const combined = answers.join(' ').trim().toLowerCase()
    const words = combined.split(/\s+/).filter(Boolean)
    const uniqueWords = new Set(words)

    // 1. Detect repetitive / spam / extremely short answers
    const uniqueRatio = words.length > 0 ? uniqueWords.size / words.length : 0
    const isRepetitive = words.length > 5 && uniqueRatio < 0.4
    const isTooShort = combined.length < 30

    if (isTooShort || isRepetitive) {
      return {
        questionId: 'overall',
        score: 15,
        feedback: isRepetitive
          ? '⚠️ Your answer appears to repeat the same words. Please write a genuine explanation of your algorithm, data structure, time complexity, and how you handle edge cases.'
          : '⚠️ Your answer is too short. Please explain your approach in detail — mention the algorithm, data structure, and time complexity.'
      }
    }

    const titleLower = (problem.title || '').toLowerCase()
    const slugLower = (problem.slug || '').toLowerCase()
    const patternLower = (problem.patterns || []).join(' ').toLowerCase()
    const topicsLower = (problem.topics || []).map(t => t.toLowerCase())

    // 2. Specific Problem & Pattern Evaluation Checks

    // --- 3SUM ---
    if (titleLower.includes('3sum') || slugLower === '3sum') {
      const mentionsSort = combined.includes('sort')
      const mentionsOuterLoop = combined.includes('loop') || combined.includes('for') || combined.includes('fix') || combined.includes('outer') || combined.includes('i') || combined.includes('each') || combined.includes('iterate')
      const mentionsTwoPointer = combined.includes('pointer') || combined.includes('left') || combined.includes('right') || combined.includes('two')

      if (!mentionsSort || !mentionsOuterLoop || !mentionsTwoPointer) {
        let missing: string[] = []
        if (!mentionsSort) missing.push('1) Sorting the array first')
        if (!mentionsOuterLoop) missing.push('2) Using an outer loop to fix the first element')
        if (!mentionsTwoPointer) missing.push('3) Using two pointers (left & right) for the remaining two numbers')
        
        return {
          questionId: 'overall',
          score: 35,
          feedback: `⚠️ For 3Sum, a basic two-pointer approach alone is incomplete. Your explanation is missing: ${missing.join(', ')}. Don't forget to also mention skipping duplicate triplets!`
        }
      }
    }

    // --- TWO SUM II (SORTED ARRAY) ---
    else if (titleLower.includes('two sum ii') || slugLower.includes('two-sum-ii')) {
      const mentionsZeroShift = combined.includes('swap') || combined.includes('non-zero') || combined.includes('zeros end') || combined.includes('shift left')
      if (mentionsZeroShift) {
        return {
          questionId: 'overall',
          score: 25,
          feedback: `⚠️ Your explanation describes moving zeroes (Move Zeroes strategy), which does not solve "${problem.title}". Explain how two pointers at opposite ends move inward based on sum vs target.`
        }
      }
      const hasTwoPointerSum = (combined.includes('left') && combined.includes('right')) || combined.includes('opposite') || combined.includes('inward') || combined.includes('target') || combined.includes('binary search')
      if (!hasTwoPointerSum) {
        return {
          questionId: 'overall',
          score: 35,
          feedback: `⚠️ For "${problem.title}", explain how two pointers start at both ends (left=0, right=n-1) and move inward based on whether nums[left] + nums[right] is greater than or less than target.`
        }
      }
    }

    // --- TWO SUM (BASIC) ---
    else if (titleLower === 'two sum' || slugLower === 'two-sum') {
      const hasHashMap = combined.includes('map') || combined.includes('hash') || combined.includes('dict') || combined.includes('complement') || combined.includes('seen')
      const hasPointers = combined.includes('sort') && combined.includes('pointer')
      if (!hasHashMap && !hasPointers) {
        return {
          questionId: 'overall',
          score: 35,
          feedback: `⚠️ For standard Two Sum, explain how a Hash Map stores values/indices to look up the complement (target - current) in O(1) time.`
        }
      }
    }

    // --- MOVE ZEROES ---
    else if (titleLower.includes('move zero') || slugLower.includes('move-zeroes')) {
      const hasPartitionConcept = combined.includes('swap') || combined.includes('zero') || combined.includes('non-zero') || combined.includes('pivot') || combined.includes('shift') || combined.includes('in-place') || combined.includes('write')
      if (!hasPartitionConcept) {
        return {
          questionId: 'overall',
          score: 35,
          feedback: `⚠️ For Move Zeroes, explain how a slow/fast pointer pair shifts non-zero elements forward in-place while keeping relative order.`
        }
      }
    }

    // --- SORT COLORS ---
    else if (titleLower.includes('sort color') || slugLower.includes('sort-colors')) {
      const hasDutchFlag = combined.includes('low') || combined.includes('mid') || combined.includes('high') || combined.includes('three') || combined.includes('dutch') || combined.includes('swap') || combined.includes('partition')
      if (!hasDutchFlag) {
        return {
          questionId: 'overall',
          score: 35,
          feedback: `⚠️ For Sort Colors, explain the Dutch National Flag algorithm using 3 pointers (low, mid, high) to partition 0s, 1s, and 2s in a single pass.`
        }
      }
    }

    // --- CONTAINER WITH MOST WATER ---
    else if (titleLower.includes('container with most water') || slugLower.includes('container-with-most-water')) {
      const hasContainerLogic = (combined.includes('left') && combined.includes('right')) && (combined.includes('height') || combined.includes('area') || combined.includes('smaller') || combined.includes('shorter') || combined.includes('min'))
      if (!hasContainerLogic) {
        return {
          questionId: 'overall',
          score: 35,
          feedback: `⚠️ For Container With Most Water, explain how two pointers start at both ends, compute area = (right - left) * min(height[left], height[right]), and move the shorter pointer inward.`
        }
      }
    }

    // --- TRAPPING RAIN WATER ---
    else if (titleLower.includes('trapping rain water') || slugLower.includes('trapping-rain-water')) {
      const hasWaterLogic = combined.includes('max') || combined.includes('stack') || combined.includes('left') || combined.includes('right') || combined.includes('bound')
      if (!hasWaterLogic) {
        return {
          questionId: 'overall',
          score: 35,
          feedback: `⚠️ For Trapping Rain Water, explain how you track left_max and right_max (using two pointers, precomputed max arrays, or a monotonic stack) to calculate trapped water.`
        }
      }
    }

    // --- SLIDING WINDOW PATTERN ---
    else if (patternLower.includes('sliding window') || titleLower.includes('window') || titleLower.includes('substring')) {
      const hasWindowConcept = combined.includes('window') || combined.includes('substring') || combined.includes('start') || combined.includes('expand') || combined.includes('shrink') || combined.includes('freq') || combined.includes('map') || combined.includes('left')
      if (!hasWindowConcept) {
        return {
          questionId: 'overall',
          score: 35,
          feedback: `⚠️ For Sliding Window problems like "${problem.title}", explain how you expand the right pointer, update window state, and shrink the left pointer when constraints are violated.`
        }
      }
    }

    // --- BINARY SEARCH PATTERN ---
    else if (patternLower.includes('binary search') || titleLower.includes('binary search') || titleLower.includes('search in') || titleLower.includes('koko')) {
      const hasBSConcept = combined.includes('mid') || combined.includes('low') || combined.includes('high') || combined.includes('half') || combined.includes('binary search') || combined.includes('left')
      if (!hasBSConcept) {
        return {
          questionId: 'overall',
          score: 35,
          feedback: `⚠️ For Binary Search on "${problem.title}", explain how you initialize search bounds (low, high), calculate mid, and halve the search space.`
        }
      }
    }

    // --- STACK / MONOTONIC STACK ---
    else if (patternLower.includes('stack') || topicsLower.includes('stack') || titleLower.includes('valid parentheses')) {
      const hasStackConcept = combined.includes('stack') || combined.includes('pop') || combined.includes('push') || combined.includes('top') || combined.includes('monotonic')
      if (!hasStackConcept) {
        return {
          questionId: 'overall',
          score: 35,
          feedback: `⚠️ For "${problem.title}", explain how a Stack (LIFO structure) is used to track elements or maintain monotonic ordering.`
        }
      }
    }

    // --- DYNAMIC PROGRAMMING ---
    else if (topicsLower.includes('dynamic programming') || patternLower.includes('dp') || titleLower.includes('climbing') || titleLower.includes('subsequence')) {
      const hasDPConcept = combined.includes('dp') || combined.includes('state') || combined.includes('subproblem') || combined.includes('memo') || combined.includes('transition') || combined.includes('table') || combined.includes('previous')
      if (!hasDPConcept) {
        return {
          questionId: 'overall',
          score: 35,
          feedback: `⚠️ For Dynamic Programming on "${problem.title}", explain your DP state definition, transition relation, and base cases.`
        }
      }
    }

    // --- GRAPH / TREE TRAVERSAL ---
    else if (topicsLower.includes('graphs') || topicsLower.includes('trees') || patternLower.includes('dfs') || patternLower.includes('bfs')) {
      const hasGraphConcept = combined.includes('dfs') || combined.includes('bfs') || combined.includes('queue') || combined.includes('stack') || combined.includes('visited') || combined.includes('recursion') || combined.includes('node') || combined.includes('grid')
      if (!hasGraphConcept) {
        return {
          questionId: 'overall',
          score: 35,
          feedback: `⚠️ For Graph/Tree problem "${problem.title}", explain whether you use DFS or BFS, how you traverse connected nodes, and how you track visited states.`
        }
      }
    }

    // 3. General Keyword & Substantive Explanation Depth Analysis
    const keywords = ['hash', 'map', 'set', 'pointer', 'window', 'stack', 'queue', 'sort', 'binary', 'dp', 'dynamic', 'greedy', 'bfs', 'dfs', 'complexity', 'o(n', 'o(log', 'iterate', 'index', 'swap', 'prefix', 'two pointer', 'sliding', 'in-place', 'inplace', 'target', 'complement', 'left', 'right', 'mid', 'low', 'high', 'loop']
    const foundKeywords = keywords.filter(k => combined.includes(k))

    const mentionsComplexity = combined.includes('o(') || combined.includes('time') || combined.includes('complexity') || combined.includes('space')
    const hasSubstantiveExplanation = uniqueWords.size >= 14 && foundKeywords.length >= 2

    let score = 30
    if (hasSubstantiveExplanation && mentionsComplexity) {
      score = 85
    } else if (hasSubstantiveExplanation) {
      score = 75
    } else if (foundKeywords.length >= 2 && uniqueWords.size >= 9) {
      score = 55
    } else {
      score = 40
    }

    let feedback = ''
    if (score >= 70) {
      feedback = 'Good understanding. Your solution strategy matches the problem requirements. You can proceed to the coding workspace.'
    } else if (score >= 50) {
      feedback = 'Your explanation is on the right track, but needs more detail. Mention the data structure, algorithm step-by-step logic, and time/space complexity (e.g. O(N)) to score 70%+.'
    } else {
      feedback = `Your explanation is missing key algorithmic details for "${problem.title}". Clearly describe your step-by-step approach, data structures used, and edge cases to score 70%+.`
    }

    return {
      questionId: 'overall',
      score,
      feedback
    }
  }


  async getHint(problem: Problem, hintLevel: number, studentContext: string): Promise<string> {
    const hints = [
      "Think about what data structure lets you look up values quickly.",
      "Consider using a Hash Map or Set to store elements you've already seen.",
      "As you iterate through the array, can you check if the complement exists in your Hash Map?",
      "The complement would be (target - current_element).",
      `Initialize a map. Loop i from 0 to n. Let diff = target - arr[i]. If diff in map, return [map[diff], i]. Else map[arr[i]] = i.`
    ];
    return hints[Math.min(hintLevel - 1, 4)];
  }

  async reviewCode(problem: Problem, code: string, language: string): Promise<CodeReviewResult> {
    const isCorrect = code.length > 50;
    return {
      correctness: isCorrect ? 9 : 4,
      timeComplexity: { score: 8, analysis: "O(N)", expected: "O(N)", actual: "O(N)" },
      spaceComplexity: { score: 8, analysis: "O(N)", expected: "O(N)", actual: "O(N)" },
      readability: 7,
      edgeCases: { score: 8, missed: [] },
      overallFeedback: isCorrect ? "Great job! Your solution is efficient." : "Your code seems a bit incomplete. Keep trying!",
      improvements: ["Use more descriptive variable names", "Add comments to explain complex logic"]
    };
  }

  async chat(messages: AIMessage[], systemPrompt: string): Promise<string> {
    const lastMsg = messages[messages.length - 1]?.content.toLowerCase() || "";
    if (lastMsg.includes("stuck") || lastMsg.includes("help")) {
      return "I'm here to help! What part are you finding difficult?";
    }
    return "That's an interesting point. Let's think about how that affects the time complexity. What do you think?";
  }

  async evaluateApproach(problem: Problem, approach: string): Promise<ApproachEvaluation> {
    const isCorrect = approach.length > 20;
    return {
      isCorrect,
      feedback: isCorrect ? "That approach sounds solid!" : "That might not work for all cases.",
      followUpQuestion: isCorrect ? "What would be the time complexity?" : "What happens if the input is empty?"
    };
  }

  async evaluatePatternRecognition(problem: Problem, selectedPattern: string): Promise<PatternEvaluation> {
    return {
      isCorrect: true,
      correctPattern: selectedPattern,
      explanation: "Yes, this pattern fits perfectly because we need to keep track of a running sequence."
    };
  }

  async evaluateEdgeCases(problem: Problem, edgeCases: string[]): Promise<EdgeCaseEvaluation> {
    return {
      score: 80,
      identified: edgeCases,
      missed: ["Empty array", "Negative numbers"],
      feedback: "Good job identifying those edge cases. Don't forget about empty inputs!"
    };
  }

  async evaluateComplexity(problem: Problem, timeComplexity: string, spaceComplexity: string): Promise<ComplexityEvaluation> {
    return {
      timeCorrect: timeComplexity.includes("N"),
      spaceCorrect: spaceComplexity.includes("N") || spaceComplexity.includes("1"),
      timeAnalysis: "Your time complexity analysis is correct.",
      spaceAnalysis: "Your space complexity is correct.",
      canBeImproved: false
    };
  }
}
