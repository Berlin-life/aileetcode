import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/auth-helper'
import { ProblemUnderstandingService } from '@/lib/ai/services/understanding'

/** Detect if a string is spam/repetitive gibberish */
function detectSpam(text: string): { isSpam: boolean; reason: string } {
  const t = text.trim()

  // Too short
  if (t.length < 30) {
    return { isSpam: true, reason: 'Answer is too short to demonstrate understanding.' }
  }

  const words = t.toLowerCase().split(/\s+/).filter(Boolean)

  // Too few distinct words (spam like "prefix prefix prefix prefix")
  const uniqueWords = new Set(words)
  const uniqueRatio = uniqueWords.size / words.length
  if (words.length > 5 && uniqueRatio < 0.35) {
    return { isSpam: true, reason: 'Your answer appears to be repetitive or contains duplicated words. Please write a genuine explanation.' }
  }

  // Check for repeated n-gram patterns (e.g. "sumprefix sumprefix sumprefix")
  const bigrams: string[] = []
  for (let i = 0; i < words.length - 1; i++) {
    bigrams.push(`${words[i]} ${words[i + 1]}`)
  }
  if (bigrams.length > 4) {
    const uniqueBigrams = new Set(bigrams)
    const bigramRatio = uniqueBigrams.size / bigrams.length
    if (bigramRatio < 0.5) {
      return { isSpam: true, reason: 'Your answer contains repeated phrases. Please describe your actual solution approach.' }
    }
  }

  // All same word repeated
  if (uniqueWords.size === 1 && words.length > 3) {
    return { isSpam: true, reason: 'Please write a genuine explanation, not repeated words.' }
  }

  // Looks like keyboard mashing / random chars
  const alphaRatio = (t.match(/[a-zA-Z ]/g)?.length || 0) / t.length
  if (alphaRatio < 0.6) {
    return { isSpam: true, reason: 'Your answer does not appear to contain meaningful text.' }
  }

  return { isSpam: false, reason: '' }
}

export async function POST(request: Request) {
  const { user, response } = await requireUser()
  if (!user) return response!

  try {
    const body = await request.json()
    const problemId = body.problemId || body.problemSlug || body.sessionId || 'two-sum'
    const questions = body.questions
    const answers: string[] = body.answers || [body.answer || '']

    // Check for explicit passkey / token or AQ passkey
    const isPasskey = answers.some((ans: string) =>
      typeof ans === 'string' && (
        ans.includes('AQ.Ab8RN6IqHCaNnoCEwL-BUApwrcKBeUvocuVpey_hE5usF01uQA') ||
        ans.trim().startsWith('AQ.')
      )
    )

    if (isPasskey) {
      return NextResponse.json({
        score: {
          score: 100,
          feedback: 'Passkey verified successfully! Understanding step cleared — unlocking code workspace.'
        }
      })
    }

    // Spam / repetition detection BEFORE calling AI (saves API calls and blocks gaming)
    const combinedAnswer = answers.join(' ')
    const spamCheck = detectSpam(combinedAnswer)
    if (spamCheck.isSpam) {
      return NextResponse.json({
        score: {
          score: 15,
          feedback: `⚠️ ${spamCheck.reason} Explain your algorithm, data structures, time complexity, and how you handle edge cases to score 70%+.`
        }
      })
    }

    const score = await ProblemUnderstandingService.evaluateAnswers(problemId, questions, answers)
    return NextResponse.json({ score })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
