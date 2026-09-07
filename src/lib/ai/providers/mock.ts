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

    // Detect repetitive / spam answers
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

    // Reward answers that mention algorithm keywords
    const keywords = ['hash', 'map', 'set', 'pointer', 'window', 'stack', 'queue', 'sort', 'binary', 'dp', 'dynamic', 'greedy', 'bfs', 'dfs', 'complexity', 'o(n', 'o(log', 'iterate', 'index', 'swap', 'prefix', 'two pointer', 'sliding', 'in-place', 'inplace']
    const foundKeywords = keywords.filter(k => combined.includes(k))
    const hasSubstance = foundKeywords.length >= 1 && uniqueWords.size >= 8

    const score = hasSubstance ? 80 : (uniqueWords.size >= 6 ? 55 : 30)
    return {
      questionId: 'overall',
      score,
      feedback: score >= 70
        ? 'Good understanding. You can proceed to the coding workspace.'
        : 'Your explanation needs more detail. Mention your data structure, algorithm steps, and time complexity to score 70%+.'
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
