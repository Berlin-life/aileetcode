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
    const avgScore = answers.some(a => a.length > 10) ? 80 : 40;
    return {
      questionId: 'overall',
      score: avgScore,
      feedback: avgScore > 60 ? "Good understanding. You can proceed." : "You might want to reread the problem description."
    };
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
