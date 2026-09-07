// src/types/index.ts

export type SupportedLanguage = "java" | "python" | "javascript" | "cpp";
export type ProblemDifficulty = "easy" | "medium" | "hard";
export type AttemptStatus = "passed" | "failed" | "error" | "pending";
export type HintLevel = 1 | 2 | 3 | 4 | 5;
export type AIRole = "system" | "user" | "assistant";
export type Theme = "light" | "dark" | "system";

export type PatternType = 
  | "sliding_window"
  | "two_pointers"
  | "fast_slow_pointers"
  | "merge_intervals"
  | "cyclic_sort"
  | "in_place_reversal_linked_list"
  | "tree_bfs"
  | "tree_dfs"
  | "two_heaps"
  | "subsets"
  | "modified_binary_search"
  | "bitwise_xor"
  | "top_k_elements"
  | "k_way_merge"
  | "0_1_knapsack"
  | "unbounded_knapsack"
  | "fibonacci_numbers"
  | "palindromic_subsequence"
  | "longest_common_substring"
  | "topological_sort"
  | "trie"
  | "union_find";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  level: number;
  goal: string;
  xp: number;
  currentStreak: number;
  longestStreak: number;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  skills: Skill[];
  achievements: UserAchievement[];
}

export interface UserLevel {
  level: number;
  title: string;
  minXp: number;
}

export interface UserGoal {
  type: "daily_problems" | "weekly_hours" | "mastery";
  target: number;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  explanation?: string;
}

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: string | number;
  title: string;
  slug: string;
  description: string;
  difficulty: ProblemDifficulty;
  constraints: string[];
  examples: ProblemExample[];
  solution: Record<SupportedLanguage, string>;
  topics: string[];
  patterns: string[];
  expectedTimeComplexity: string;
  expectedSpaceComplexity: string;
  hints: string[];
  testCases?: TestCase[];
  createdAt: string;
}

export interface Attempt {
  id: string | number;
  userId: string;
  problemId: string | number;
  code: string;
  language: SupportedLanguage;
  status: AttemptStatus;
  runtimeMs?: number;
  memoryKb?: number;
  testResults: any;
  createdAt: string;
}

export interface UnderstandingQuestion {
  id: string;
  text: string;
  type: "input_output" | "constraints" | "edge_case" | "approach";
}

export interface UnderstandingScore {
  questionId: string;
  score: number;
  feedback: string;
}

export interface UnderstandingSession {
  id: string | number;
  userId: string;
  problemId: string | number;
  questions: UnderstandingQuestion[];
  answers: Record<string, string>;
  scores: UnderstandingScore[];
  overallScore: number;
  completed: boolean;
  createdAt: string;
}

export interface HintRecord {
  id: string | number;
  userId: string;
  problemId: string | number;
  hintLevel: HintLevel;
  createdAt: string;
}

export interface SkillTopic {
  id: string;
  name: string;
  category: string;
}

export interface Skill {
  id: string | number;
  userId: string;
  topic: string;
  score: number;
  problemsSolved: number;
  problemsAttempted: number;
  avgHintsUsed: number;
  confidence: number;
  updatedAt: string;
}

export interface RevisionSchedule {
  intervalDays: number;
  multiplier: number;
}

export interface Revision {
  id: string | number;
  userId: string;
  problemId: string | number;
  scheduledAt: string;
  completedAt?: string;
  performance?: number;
  createdAt: string;
}

export interface Achievement {
  id: string | number;
  name: string;
  description: string;
  icon: string;
  category: string;
  xpReward: number;
  createdAt: string;
}

export interface UserAchievement {
  id: string | number;
  userId: string;
  achievementId: string | number;
  earnedAt: string;
}

export interface RecommendationReason {
  type: string;
  description: string;
}

export interface Recommendation {
  id: string | number;
  userId: string;
  problemId: string | number;
  reason: string;
  score: number;
  factors: Record<string, number>;
  createdAt: string;
}

export interface DailyChallenge {
  id: string | number;
  problemId: string | number;
  challengeDate: string;
  focusTopic: string;
  reason: string;
  createdAt: string;
}

export interface CodeExecutionRequest {
  code: string;
  language: SupportedLanguage;
  testCases: TestCase[];
}

export interface TestCaseResult {
  passed: boolean;
  actualOutput: string;
  expectedOutput: string;
  error?: string;
  executionTimeMs?: number;
}

export interface CodeExecutionResult {
  status: AttemptStatus;
  results: TestCaseResult[];
  overallRuntimeMs?: number;
  overallMemoryKb?: number;
  compilationError?: string;
}

export interface AIMessage {
  id: string;
  role: AIRole;
  content: string;
  timestamp: string;
}

export interface AIContext {
  problem: Problem;
  userCode?: string;
  currentLanguage: SupportedLanguage;
  understandingSession?: UnderstandingSession;
  previousMessages: AIMessage[];
}

export interface AIResponse {
  message: string;
  suggestedActions?: string[];
  detectedPatterns?: string[];
}

export interface LearningQualityScore {
  understanding: number;
  efficiency: number;
  independence: number;
  overall: number;
}
