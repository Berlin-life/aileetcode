'use client'

import * as React from 'react'
import { useProblemStore } from '@/stores/problem-store'
import { Button } from '@/components/ui/button'
import { Loader2, Send, HelpCircle, Layout, Code } from 'lucide-react'
import type { AIMessage } from '@/types'

export function MentorChat() {
  const { problem, code, language } = useProblemStore()
  const [messages, setMessages] = React.useState<AIMessage[]>([
    {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      role: 'assistant',
      content: "Hello! I am your Socratic DSA Mentor. I won't give you the solution directly, but I will guide you with questions to help you solve it yourself. What are you thinking so far?"
    }
  ])
  const [input, setInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const chatEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (text: string) => {
    if (!text.trim() || !problem || loading) return
    const userMsg: AIMessage = { id: Date.now().toString(), timestamp: new Date().toISOString(), role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/understanding/generate', { // Mocking tutor chat API endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          problemId: problem.id,
          chatHistory: [...messages, userMsg],
          code,
          language
        })
      })
      
      // Let's mock a response if the endpoint doesn't support chat natively yet.
      // In the mock AI provider, we return a nice Socratic question.
      const tutorResponse = await fetchTutorResponse(text)
      
      setMessages((prev) => [...prev, { id: Date.now().toString(), timestamp: new Date().toISOString(), role: 'assistant', content: tutorResponse }])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchTutorResponse = async (userText: string): Promise<string> => {
    const text = userText.toLowerCase()
    if (text.includes("hint") || text.includes("stuck")) {
      return "Let's think. What is the brute force approach? If you search every combination, how long will it take?"
    }
    if (text.includes("map") || text.includes("hashmap")) {
      return "Excellent idea! Using a Hash Map lets you search in O(1) time. How will you compute the keys and values to store?"
    }
    if (text.includes("complexity") || text.includes("time complexity")) {
      return "Let's trace your loops. If you have a single loop running up to N, and inside it you make a hash map lookup which is O(1), what is the total complexity?"
    }
    return "That's a useful perspective. How does that help you avoid doing repeated lookups or calculations?"
  }

  return (
    <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-lg overflow-hidden">
      <div className="flex h-11 items-center px-4 bg-slate-900 border-b border-slate-800 flex-none justify-between">
        <span className="text-xs font-bold text-slate-300">AI Mentor (Socratic)</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-teal-600 text-slate-950 font-medium rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-slate-800 rounded-lg rounded-tl-none p-3 text-sm flex items-center space-x-2 text-slate-400">
              <Loader2 className="h-4 w-4 animate-spin text-teal-500" />
              <span>Mentor is thinking...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* QuickPrompts */}
      <div className="px-4 py-2 border-t border-slate-850 bg-slate-900/50 flex flex-wrap gap-1.5 flex-none">
        <button
          onClick={() => handleSend("Can you give me a conceptual hint?")}
          className="text-[10px] font-semibold bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 px-2 py-1 rounded border border-slate-800 flex items-center gap-1"
        >
          <HelpCircle className="h-3 w-3 text-teal-500" />
          Get Hint
        </button>
        <button
          onClick={() => handleSend("Is my current approach optimal?")}
          className="text-[10px] font-semibold bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 px-2 py-1 rounded border border-slate-800 flex items-center gap-1"
        >
          <Layout className="h-3 w-3 text-amber-500" />
          Check Approach
        </button>
        <button
          onClick={() => handleSend("What is the time complexity of my code?")}
          className="text-[10px] font-semibold bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 px-2 py-1 rounded border border-slate-800 flex items-center gap-1"
        >
          <Code className="h-3 w-3 text-sky-500" />
          Check Complexity
        </button>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-slate-800 bg-slate-900 flex-none flex gap-2">
        <input
          type="text"
          className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent"
          placeholder="Ask your mentor a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend(input)
          }}
          disabled={loading}
        />
        <Button
          onClick={() => handleSend(input)}
          disabled={loading || !input.trim()}
          size="sm"
          className="bg-teal-600 hover:bg-teal-500 text-slate-950 border-none font-bold px-3"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
