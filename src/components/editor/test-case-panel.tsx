'use client'

import * as React from 'react'
import { useProblemStore } from '@/stores/problem-store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Play, CheckCircle2, XCircle } from 'lucide-react'

export function TestCasePanel() {
  const { problem, testResults, isRunning } = useProblemStore()
  const [activeTab, setActiveTab] = React.useState('cases')
  const [customInput, setCustomInput] = React.useState('')

  React.useEffect(() => {
    if (testResults) {
      setActiveTab('results')
    }
  }, [testResults])

  if (!problem) return null

  // Get test cases. For Phase 1 we use visible test cases.
  const testCases = problem.examples || []

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-950 border border-slate-800 rounded-lg overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between px-4 bg-slate-900 border-b border-slate-800 flex-none h-11">
          <TabsList className="bg-transparent gap-2 h-auto p-0">
            <TabsTrigger 
              value="cases" 
              className="px-3 py-1.5 text-xs font-semibold rounded-md border-b-2 border-transparent data-[state=active]:border-teal-500 data-[state=active]:bg-transparent text-slate-400 data-[state=active]:text-teal-400"
            >
              Test Cases
            </TabsTrigger>
            <TabsTrigger 
              value="results" 
              className="px-3 py-1.5 text-xs font-semibold rounded-md border-b-2 border-transparent data-[state=active]:border-teal-500 data-[state=active]:bg-transparent text-slate-400 data-[state=active]:text-teal-400"
            >
              Results
            </TabsTrigger>
            <TabsTrigger 
              value="custom" 
              className="px-3 py-1.5 text-xs font-semibold rounded-md border-b-2 border-transparent data-[state=active]:border-teal-500 data-[state=active]:bg-transparent text-slate-400 data-[state=active]:text-teal-400"
            >
              Custom Input
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <TabsContent value="cases" className="mt-0 h-full">
            <div className="space-y-4">
              {testCases.map((tc: any, index: number) => (
                <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
                  <div className="text-xs font-bold text-slate-400 mb-2">Case {index + 1}</div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs text-slate-500 block">Input:</span>
                      <pre className="text-sm font-mono bg-slate-950 p-2 rounded border border-slate-800 mt-1 overflow-x-auto text-slate-300">{tc.input}</pre>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Expected Output:</span>
                      <pre className="text-sm font-mono bg-slate-950 p-2 rounded border border-slate-800 mt-1 overflow-x-auto text-slate-300">{tc.output}</pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="results" className="mt-0 h-full">
            {isRunning ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12">
                <Play className="h-8 w-8 text-teal-500 animate-pulse mb-3" />
                <span className="text-sm font-medium animate-pulse">Running test cases against sandbox...</span>
              </div>
            ) : testResults ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-850 pb-3">
                  {testResults.status === 'passed' ? (
                    <div className="flex items-center space-x-2 text-emerald-500">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-bold text-sm">All Test Cases Passed ({testResults.overallRuntimeMs}ms)</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-rose-500">
                      <XCircle className="h-5 w-5" />
                      <span className="font-bold text-sm">
                        {testResults.status === 'error' ? 'Error' : 'Wrong Answer'}
                      </span>
                    </div>
                  )}
                </div>

                {testResults.compilationError && (
                  <div className="bg-rose-950/20 border border-rose-900/50 rounded-lg p-3 text-rose-400 font-mono text-xs overflow-x-auto">
                    <pre>{testResults.compilationError}</pre>
                  </div>
                )}

                {testResults.results && (
                  <div className="space-y-3">
                    {testResults.results.map((tr: any, idx: number) => (
                      <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-400">Test Case {idx + 1}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                            tr.passed ? 'text-emerald-400 bg-emerald-950/30 border-emerald-900/50' : 'text-rose-400 bg-rose-950/30 border-rose-900/50'
                          }`}>
                            {tr.passed ? 'Passed' : 'Failed'}
                          </span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="text-slate-500">Input:</span>
                            <pre className="bg-slate-950 p-1.5 rounded border border-slate-850 mt-1 font-mono text-slate-300 overflow-x-auto">{tr.input}</pre>
                          </div>
                          <div>
                            <span className="text-slate-500">Expected:</span>
                            <pre className="bg-slate-950 p-1.5 rounded border border-slate-850 mt-1 font-mono text-slate-300 overflow-x-auto">{tr.expected_output}</pre>
                          </div>
                          <div>
                            <span className="text-slate-500">Actual:</span>
                            <pre className="bg-slate-950 p-1.5 rounded border border-slate-850 mt-1 font-mono text-slate-300 overflow-x-auto">{tr.actual_output}</pre>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 py-12">
                <span className="text-sm">Run your code to see results here.</span>
              </div>
            )}
          </TabsContent>

          <TabsContent value="custom" className="mt-0 h-full flex flex-col space-y-3">
            <textarea
              className="flex-1 w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent text-slate-300 min-h-[120px]"
              placeholder="Enter your custom test input here..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
            />
            <div className="text-xs text-slate-500">Note: Custom execution will evaluate your code only against this input.</div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
