import Anthropic from '@anthropic-ai/sdk';
import type { Problem, UnderstandingQuestion, UnderstandingScore, AIMessage } from '@/types';
import type { 
  AIProvider, 
  CodeReviewResult, 
  ApproachEvaluation, 
  PatternEvaluation, 
  EdgeCaseEvaluation, 
  ComplexityEvaluation 
} from '../types';
import { MockAIProvider } from './mock';

export class AnthropicProvider implements AIProvider {
  private client: Anthropic;
  private modelName = 'claude-3-5-sonnet-20241022';
  private mockFallback = new MockAIProvider();

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  private async askClaudeJSON<T>(prompt: string, systemPrompt: string = 'You are a helpful coding assistant. Always respond ONLY with a raw valid JSON object.'): Promise<T> {
    const response = await this.client.messages.create({
      model: this.modelName,
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    });
    
    const text = response.content.filter(block => block.type === 'text').map(block => block.text).join('');
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    const jsonString = jsonMatch ? jsonMatch[1] : text;
    const cleanedString = jsonString.trim().replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
    
    return JSON.parse(cleanedString) as T;
  }

  async generateUnderstandingQuestions(problem: Problem, previousAnswers?: string[]): Promise<UnderstandingQuestion[]> {
    try {
      const prompt = `Generate 3-5 understanding questions for the following problem:
Title: ${problem.title}
Description: ${problem.description}
Difficulty: ${problem.difficulty}
${previousAnswers ? `Previous Answers: ${JSON.stringify(previousAnswers)}` : ''}

Output JSON as an array of objects with keys: id (string), text (string), type (string).`;
      return await this.askClaudeJSON<UnderstandingQuestion[]>(prompt);
    } catch (err: any) {
      console.warn('[AnthropicProvider] API error, falling back to mock provider:', err.message);
      return this.mockFallback.generateUnderstandingQuestions(problem, previousAnswers);
    }
  }

  async evaluateUnderstanding(problem: Problem, questions: UnderstandingQuestion[], answers: string[]): Promise<UnderstandingScore> {
    try {
      const prompt = `Evaluate the user's understanding of the problem based on their answers.
Problem: ${problem.title}
Questions: ${JSON.stringify(questions)}
Answers: ${JSON.stringify(answers)}

Output JSON object with keys: questionId (string, use 'overall'), score (number 0-100), feedback (string).`;
      return await this.askClaudeJSON<UnderstandingScore>(prompt);
    } catch (err: any) {
      console.warn('[AnthropicProvider] API error, falling back to mock provider:', err.message);
      return this.mockFallback.evaluateUnderstanding(problem, questions, answers);
    }
  }

  async getHint(problem: Problem, hintLevel: number, studentContext: string): Promise<string> {
    try {
      const prompt = `Provide a hint for the problem "${problem.title}".
Hint Level: ${hintLevel} (1=subtle, 5=direct)
Student Context: ${studentContext}

Output JSON object with a single key 'hint' (string).`;
      const res = await this.askClaudeJSON<{hint: string}>(prompt);
      return res.hint;
    } catch (err: any) {
      console.warn('[AnthropicProvider] API error, falling back to mock provider:', err.message);
      return this.mockFallback.getHint(problem, hintLevel, studentContext);
    }
  }

  async reviewCode(problem: Problem, code: string, language: string): Promise<CodeReviewResult> {
    try {
      const prompt = `Review the following ${language} code for the problem "${problem.title}".
Code:
${code}

Output JSON object matching this TypeScript interface:
{
  correctness: number, // 1-10
  timeComplexity: { score: number, analysis: string, expected: string, actual: string },
  spaceComplexity: { score: number, analysis: string, expected: string, actual: string },
  readability: number, // 1-10
  edgeCases: { score: number, missed: string[] },
  overallFeedback: string,
  improvements: string[]
}`;
      return await this.askClaudeJSON<CodeReviewResult>(prompt);
    } catch (err: any) {
      console.warn('[AnthropicProvider] API error, falling back to mock provider:', err.message);
      return this.mockFallback.reviewCode(problem, code, language);
    }
  }

  async chat(messages: AIMessage[], systemPrompt: string): Promise<string> {
    try {
      const anthropicMessages = messages.map(m => ({
        role: m.role === 'user' ? 'user' as const : 'assistant' as const,
        content: m.content
      }));

      const response = await this.client.messages.create({
        model: this.modelName,
        max_tokens: 1024,
        system: systemPrompt,
        messages: anthropicMessages,
      });
      
      return response.content.filter(block => block.type === 'text').map(block => block.text).join('');
    } catch (err: any) {
      console.warn('[AnthropicProvider] API error, falling back to mock provider:', err.message);
      return this.mockFallback.chat(messages, systemPrompt);
    }
  }

  async evaluateApproach(problem: Problem, approach: string): Promise<ApproachEvaluation> {
    try {
      const prompt = `Evaluate the proposed approach for the problem "${problem.title}".
Approach: ${approach}

Output JSON object with keys: isCorrect (boolean), feedback (string), followUpQuestion (string, optional).`;
      return await this.askClaudeJSON<ApproachEvaluation>(prompt);
    } catch (err: any) {
      console.warn('[AnthropicProvider] API error, falling back to mock provider:', err.message);
      return this.mockFallback.evaluateApproach(problem, approach);
    }
  }

  async evaluatePatternRecognition(problem: Problem, selectedPattern: string): Promise<PatternEvaluation> {
    try {
      const prompt = `Evaluate if the pattern "${selectedPattern}" is appropriate for the problem "${problem.title}".

Output JSON object with keys: isCorrect (boolean), correctPattern (string), explanation (string).`;
      return await this.askClaudeJSON<PatternEvaluation>(prompt);
    } catch (err: any) {
      console.warn('[AnthropicProvider] API error, falling back to mock provider:', err.message);
      return this.mockFallback.evaluatePatternRecognition(problem, selectedPattern);
    }
  }

  async evaluateEdgeCases(problem: Problem, edgeCases: string[]): Promise<EdgeCaseEvaluation> {
    try {
      const prompt = `Evaluate the identified edge cases for the problem "${problem.title}".
Identified Edge Cases: ${JSON.stringify(edgeCases)}

Output JSON object with keys: score (number 0-100), identified (string[]), missed (string[]), feedback (string).`;
      return await this.askClaudeJSON<EdgeCaseEvaluation>(prompt);
    } catch (err: any) {
      console.warn('[AnthropicProvider] API error, falling back to mock provider:', err.message);
      return this.mockFallback.evaluateEdgeCases(problem, edgeCases);
    }
  }

  async evaluateComplexity(problem: Problem, timeComplexity: string, spaceComplexity: string): Promise<ComplexityEvaluation> {
    try {
      const prompt = `Evaluate the complexity analysis for the problem "${problem.title}".
Proposed Time Complexity: ${timeComplexity}
Proposed Space Complexity: ${spaceComplexity}

Output JSON object with keys: timeCorrect (boolean), spaceCorrect (boolean), timeAnalysis (string), spaceAnalysis (string), canBeImproved (boolean), improvementHint (string, optional).`;
      return await this.askClaudeJSON<ComplexityEvaluation>(prompt);
    } catch (err: any) {
      console.warn('[AnthropicProvider] API error, falling back to mock provider:', err.message);
      return this.mockFallback.evaluateComplexity(problem, timeComplexity, spaceComplexity);
    }
  }
}
