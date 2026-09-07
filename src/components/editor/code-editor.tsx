'use client'

import * as React from 'react'
import Editor, { Monaco } from '@monaco-editor/react'
import { useProblemStore } from '@/stores/problem-store'

interface CodeEditorProps {
  defaultValue?: string
  onChange?: (value: string | undefined) => void
}

const TEMPLATES: Record<string, string> = {
  java: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your Socratic-guided code here
        return new int[]{};
    }
}`,
  python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Write your Socratic-guided code here
        pass`,
  javascript: `function twoSum(nums, target) {
    // Write your Socratic-guided code here
    return [];
}`,
  cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your Socratic-guided code here
        return {};
    }
};`
}

export function CodeEditor({ onChange }: CodeEditorProps) {
  const { code, language, setCode } = useProblemStore()

  // Initialize template code on language change if current code is empty
  React.useEffect(() => {
    if (!code) {
      setCode(TEMPLATES[language] || '')
    }
  }, [language, code, setCode])

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value)
      if (onChange) onChange(value)
    }
  }

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    // Define a dark theme that matches the slate-900 / slate-950 UI theme
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
        { token: 'keyword', foreground: '14b8a6', fontStyle: 'bold' },
        { token: 'string', foreground: '38bdf8' },
        { token: 'number', foreground: 'fbbf24' }
      ],
      colors: {
        'editor.background': '#0f172a', // Slate-900
        'editor.foreground': '#f8fafc',
        'editor.lineHighlightBackground': '#1e293b',
        'editorCursor.foreground': '#14b8a6',
        'editorLineNumber.foreground': '#475569',
        'editorLineNumber.activeForeground': '#14b8a6',
      }
    })
    monaco.editor.setTheme('custom-dark')
  }

  return (
    <div className="w-full h-full min-h-[300px] border border-border rounded-lg overflow-hidden bg-card">
      <Editor
        height="100%"
        language={language === 'cpp' ? 'cpp' : language}
        value={code || TEMPLATES[language] || ''}
        theme="custom-dark"
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 12, bottom: 12 },
          fontLigatures: true,
        }}
        loading={
          <div className="flex h-full w-full items-center justify-center bg-card text-muted-foreground text-sm font-mono">
            Loading Monaco Editor...
          </div>
        }
      />
    </div>
  )
}
