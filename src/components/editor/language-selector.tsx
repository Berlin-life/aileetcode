'use client'

import * as React from 'react'
import { useProblemStore } from '@/stores/problem-store'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const LANGUAGES = [
  { value: 'java', label: 'Java (Default)' },
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'cpp', label: 'C++' },
]

export function LanguageSelector() {
  const { language, setLanguage } = useProblemStore()

  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Language:</span>
      <Select value={language} onValueChange={(val) => setLanguage(val || 'java')}>
        <SelectTrigger className="w-[160px] h-9 bg-slate-900 border-slate-700 text-slate-100 focus:ring-1 focus:ring-teal-500">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
          {LANGUAGES.map((lang) => (
            <SelectItem key={lang.value} value={lang.value} className="focus:bg-slate-800 focus:text-teal-400">
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
