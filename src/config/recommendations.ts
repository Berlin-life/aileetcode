/**
 * Weights used to calculate problem recommendation scores.
 * The total score determines the top recommendations for a user.
 */
export const RECOMMENDATION_WEIGHTS = {
  topicGap: 0.30,       // Weight for topics the user is struggling with or hasn't practiced
  difficultyFit: 0.20,  // Weight for problems that match the user's current skill level
  patternRelevance: 0.20, // Weight for algorithmic patterns the user needs to learn
  revisionPriority: 0.15, // Weight for spaced repetition and previously failed problems
  recentPerformance: 0.15, // Weight based on recent streaks and momentum
};

export type RecommendationFactor = keyof typeof RECOMMENDATION_WEIGHTS;

export interface RecommendationScoreContext {
  topicGapScore: number;
  difficultyFitScore: number;
  patternRelevanceScore: number;
  revisionPriorityScore: number;
  recentPerformanceScore: number;
}
