import type { Problem, UnderstandingQuestion, UnderstandingScore, AIMessage } from '@/types'
import type {
  AIProvider,
  CodeReviewResult,
  ApproachEvaluation,
  PatternEvaluation,
  EdgeCaseEvaluation,
  ComplexityEvaluation
} from '../types'
import { MockAIProvider } from './mock'

export class GeminiProvider implements AIProvider {
  private apiKey: string
  private modelName = 'gemini-1.5-flash'
  private mockFallback = new MockAIProvider()

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || 'AQ.Ab8RN6IqHCaNnoCEwL-BUApwrcKBeUvocuVpey_hE5usF01uQA'
  }

  private async askGeminiJSON<T>(prompt: string, systemInstruction: string = 'You are an expert AI LeetCode mentor. Return ONLY raw valid JSON without markdown wrapping.'): Promise<T> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent?key=${this.apiKey}`

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json'
        }
      })
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`Gemini API HTTP ${res.status}: ${errText}`)
    }

    const data = await res.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}'
    const cleaned = text.trim().replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '').trim()
    return JSON.parse(cleaned) as T
  }

  async generateUnderstandingQuestions(problem: Problem, previousAnswers?: string[]): Promise<UnderstandingQuestion[]> {
    try {
      const prompt = `Generate 3 understanding questions to check if a student comprehends how to solve this problem:
Title: ${problem.title}
Description: ${problem.description}
Difficulty: ${problem.difficulty}
${previousAnswers ? `Previous Answers: ${JSON.stringify(previousAnswers)}` : ''}

Output JSON as array of objects with fields: id (string), text (string), type (string).`
      return await this.askGeminiJSON<UnderstandingQuestion[]>(prompt)
    } catch (err: any) {
      console.warn('[GeminiProvider] generateUnderstandingQuestions fallback:', err.message)
      return this.mockFallback.generateUnderstandingQuestions(problem, previousAnswers)
    }
  }

  async evaluateUnderstanding(problem: Problem, questions: UnderstandingQuestion[], answers: string[]): Promise<UnderstandingScore> {
    try {
      const prompt = `You are a strict coding interview evaluator. Evaluate the student's solution idea for this problem.

Problem: ${problem.title}
Description: ${problem.description}

Student's Answer: ${JSON.stringify(answers)}

STRICT EVALUATION RULES (you MUST follow these):
1. If the answer is REPETITIVE (same word/phrase repeated multiple times like "prefix prefix prefix" or "sum sum sum sum"), give score 5-15 and explain why.
2. If the answer is IRRELEVANT to the problem (random words, keyboard mashing, unrelated text), give score 5-15.
3. If the answer is VAGUE with no algorithm details (just "use a loop" or "iterate array"), give score 30-50.
4. If the answer mentions a WRONG approach that won't solve the problem, give score 20-45.
5. Only give score >= 70 if the answer clearly explains: the algorithm/data structure used, approximate time complexity, and how it solves the problem.
6. Give score >= 85 if the answer also covers edge cases.

Output ONLY a JSON object (no markdown, no extra text):
{
  "questionId": "overall",
  "score": <number 0-100>,
  "feedback": "<specific, actionable feedback>"
}`
      return await this.askGeminiJSON<UnderstandingScore>(prompt)
    } catch (err: any) {
      console.warn('[GeminiProvider] evaluateUnderstanding fallback:', err.message)
      return this.mockFallback.evaluateUnderstanding(problem, questions, answers)
    }
  }


  async evaluateApproach(problem: Problem, approach: string): Promise<ApproachEvaluation> {
    try {
      const prompt = `Evaluate this student's solution idea/approach for "${problem.title}":
Approach Idea: ${approach}

Output JSON object:
{
  "isCorrect": boolean,
  "feedback": string,
  "followUpQuestion": string
}`
      return await this.askGeminiJSON<ApproachEvaluation>(prompt)
    } catch (err: any) {
      console.warn('[GeminiProvider] evaluateApproach fallback:', err.message)
      return this.mockFallback.evaluateApproach(problem, approach)
    }
  }

  async getHint(problem: Problem, hintLevel: number, studentContext: string): Promise<string> {
    try {
      const prompt = `Provide hint level ${hintLevel} (1=subtle nudge, 5=direct algorithm hint) for problem "${problem.title}". Context: ${studentContext}.
Output JSON: { "hint": "..." }`
      const res = await this.askGeminiJSON<{ hint: string }>(prompt)
      return res.hint
    } catch (err: any) {
      return this.mockFallback.getHint(problem, hintLevel, studentContext)
    }
  }

  async reviewCode(problem: Problem, code: string, language: string): Promise<CodeReviewResult> {
    try {
      const prompt = `Review ${language} solution for "${problem.title}":
Code:
${code}

Output JSON:
{
  "correctness": number,
  "timeComplexity": { "score": number, "analysis": string, "expected": string, "actual": string },
  "spaceComplexity": { "score": number, "analysis": string, "expected": string, "actual": string },
  "readability": number,
  "edgeCases": { "score": number, "missed": [] },
  "overallFeedback": string,
  "improvements": []
}`
      return await this.askGeminiJSON<CodeReviewResult>(prompt)
    } catch (err: any) {
      return this.mockFallback.reviewCode(problem, code, language)
    }
  }

  async chat(messages: AIMessage[], systemPrompt: string): Promise<string> {
    try {
      const lastMessage = messages[messages.length - 1]?.content || ''
      const prompt = `System: ${systemPrompt}\nUser: ${lastMessage}`
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent?key=${this.apiKey}`

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Let's think step by step!"
    } catch (err: any) {
      return this.mockFallback.chat(messages, systemPrompt)
    }
  }

  async evaluatePatternRecognition(problem: Problem, selectedPattern: string): Promise<PatternEvaluation> {
    try {
      const prompt = `Evaluate if pattern "${selectedPattern}" matches problem "${problem.title}". Output JSON: { "isCorrect": boolean, "correctPattern": string, "explanation": string }`
      return await this.askGeminiJSON<PatternEvaluation>(prompt)
    } catch (err: any) {
      return this.mockFallback.evaluatePatternRecognition(problem, selectedPattern)
    }
  }

  async evaluateEdgeCases(problem: Problem, edgeCases: string[]): Promise<EdgeCaseEvaluation> {
    try {
      const prompt = `Evaluate edge cases ${JSON.stringify(edgeCases)} for "${problem.title}". Output JSON: { "score": number, "identified": [], "missed": [], "feedback": string }`
      return await this.askGeminiJSON<EdgeCaseEvaluation>(prompt)
    } catch (err: any) {
      return this.mockFallback.evaluateEdgeCases(problem, edgeCases)
    }
  }

  async evaluateComplexity(problem: Problem, timeComplexity: string, spaceComplexity: string): Promise<ComplexityEvaluation> {
    try {
      const prompt = `Evaluate time complexity ${timeComplexity} and space complexity ${spaceComplexity} for "${problem.title}". Output JSON: { "timeCorrect": boolean, "spaceCorrect": boolean, "timeAnalysis": string, "spaceAnalysis": string, "canBeImproved": boolean }`
      return await this.askGeminiJSON<ComplexityEvaluation>(prompt)
    } catch (err: any) {
      return this.mockFallback.evaluateComplexity(problem, timeComplexity, spaceComplexity)
    }
  }
}
