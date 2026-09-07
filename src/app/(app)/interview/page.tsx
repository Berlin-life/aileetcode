'use client'

import * as React from 'react'
import Link from 'next/link'
import { 
  Mic, MicOff, Play, Pause, RotateCcw, 
  Send, Bot, User, Sparkles, CheckCircle2, Clock, Video
} from 'lucide-react'

export default function InterviewPage() {
  const [inProgress, setInProgress] = React.useState(false)
  const [isMicActive, setIsMicActive] = React.useState(false)
  const [messages, setMessages] = React.useState([
    { role: 'interviewer', content: "Hello! Welcome to your technical mock round. I'll be your AI interviewer today. Let's start with a problem: 'Given an array of numbers, find two numbers that sum to a target'. How would you approach this?" }
  ])
  const [input, setInput] = React.useState('')
  const [timer, setTimer] = React.useState(2700) // 45 mins

  React.useEffect(() => {
    let interval: any = null
    if (inProgress && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000)
    }
    return () => clearInterval(interval)
  }, [inProgress, timer])

  const mins = Math.floor(timer / 60)
  const secs = timer % 60
  const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])

    // Simulate AI interviewer response
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          role: 'interviewer', 
          content: "That sounds like a solid O(N) hash map approach! What would be the space complexity of that solution, and how would you handle duplicate values in the array?" 
        }
      ])
    }, 1200)
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Mock Interview Simulator</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Simulate live 45-minute technical interview rounds with real-time AI feedback.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border font-mono font-semibold text-amber-400 text-sm">
            <Clock className="h-4 w-4" />
            {formattedTime}
          </div>
          {!inProgress ? (
            <button
              onClick={() => setInProgress(true)}
              className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-colors text-sm"
            >
              <Play className="h-4 w-4 fill-current" /> Start Interview Round
            </button>
          ) : (
            <button
              onClick={() => setInProgress(false)}
              className="px-4 py-2 bg-destructive/10 text-destructive border border-destructive/20 font-semibold rounded-xl text-sm hover:bg-destructive/20 transition-colors"
            >
              End Session
            </button>
          )}
        </div>
      </div>

      {!inProgress ? (
        /* Pre-interview Overview Card */
        <div className="rounded-2xl border border-border bg-card p-8 text-center space-y-6 max-w-2xl mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center">
            <Video className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold">Ready for your Mock Round?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You will be interviewed by our Socratic AI interviewer on Data Structures & Algorithms. 
            Speak or type your solution, explain your thought process out loud, and write code in the live editor.
          </p>
          <div className="grid grid-cols-3 gap-3 text-left pt-2">
            <div className="p-3 rounded-xl bg-secondary/50 border border-border text-xs">
              <span className="font-semibold block mb-1">⏱️ Duration</span>
              45 Minutes
            </div>
            <div className="p-3 rounded-xl bg-secondary/50 border border-border text-xs">
              <span className="font-semibold block mb-1">🎯 Topic</span>
              Arrays & Hash Maps
            </div>
            <div className="p-3 rounded-xl bg-secondary/50 border border-border text-xs">
              <span className="font-semibold block mb-1">📊 Feedback</span>
              Instant Rating
            </div>
          </div>
          <button
            onClick={() => setInProgress(true)}
            className="w-full py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors text-base"
          >
            Begin Live Technical Round
          </button>
        </div>
      ) : (
        /* Active Interview Workspace */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Chat / Audio Column */}
          <div className="lg:col-span-6 space-y-4 flex flex-col h-[650px] bg-card rounded-2xl border border-border overflow-hidden">
            {/* Interviewer Status Bar */}
            <div className="p-4 bg-secondary/40 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                  AI
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Senior Tech Interviewer</h3>
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Active Session
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsMicActive(!isMicActive)}
                className={`p-2.5 rounded-xl border transition-colors ${isMicActive ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' : 'bg-card border-border text-muted-foreground'}`}
              >
                {isMicActive ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </button>
            </div>

            {/* Conversation Log */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.role === 'interviewer' && (
                    <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      AI
                    </div>
                  )}
                  <div className={`p-3.5 rounded-xl max-w-[85%] leading-relaxed ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground border border-border'}`}>
                    {m.content}
                  </div>
                  {m.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-secondary text-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      You
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input Box */}
            <div className="p-3 border-t border-border bg-card flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type your explanation or thoughts..."
                className="flex-1 px-4 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Live Code Notepad Column */}
          <div className="lg:col-span-6 flex flex-col h-[650px] bg-[#1e1e2e] rounded-2xl border border-border overflow-hidden">
            <div className="p-3 bg-[#181825] border-b border-border/40 flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span>solution.py</span>
              <span className="text-emerald-400">Python 3.10</span>
            </div>
            <textarea
              defaultValue={`def twoSum(nums: list[int], target: int) -> list[int]:
    # Write your interview solution here
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`}
              className="flex-1 w-full p-4 bg-[#1e1e2e] text-slate-200 font-mono text-sm resize-none focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  )
}
