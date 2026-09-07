import { Achievement } from "@/types";

export const SEED_ACHIEVEMENTS: Partial<Achievement>[] = [
  {
    id: 1,
    name: "First Problem Solved",
    description: "Successfully solve your very first DSA problem.",
    icon: "🚀",
    category: "milestone",
    xpReward: 50
  },
  {
    id: 2,
    name: "10 Problems Solved",
    description: "Solve 10 problems on the platform.",
    icon: "⭐",
    category: "milestone",
    xpReward: 100
  },
  {
    id: 3,
    name: "50 Problems Solved",
    description: "Complete 50 problems across various topics.",
    icon: "🏆",
    category: "milestone",
    xpReward: 500
  },
  {
    id: 4,
    name: "No-Hint Master",
    description: "Solve 5 problems consecutively without using any hints.",
    icon: "🧠",
    category: "challenge",
    xpReward: 200
  },
  {
    id: 5,
    name: "Debugger",
    description: "Find and fix 10 logic bugs in your own code.",
    icon: "🐛",
    category: "skill",
    xpReward: 150
  },
  {
    id: 6,
    name: "Pattern Hunter",
    description: "Successfully identify and apply 20 algorithmic patterns.",
    icon: "🔍",
    category: "learning",
    xpReward: 250
  },
  {
    id: 7,
    name: "Complexity Expert",
    description: "Optimize 10 solutions from a less efficient time/space complexity to an optimal one.",
    icon: "⚡",
    category: "skill",
    xpReward: 300
  },
  {
    id: 8,
    name: "7-Day Streak",
    description: "Maintain a study streak for 7 consecutive days.",
    icon: "🔥",
    category: "consistency",
    xpReward: 100
  },
  {
    id: 9,
    name: "30-Day Streak",
    description: "Maintain an incredible study streak for 30 consecutive days.",
    icon: "🌋",
    category: "consistency",
    xpReward: 500
  },
  {
    id: 10,
    name: "Understanding Master",
    description: "Score 90%+ in the problem understanding phase for 10 different problems.",
    icon: "📚",
    category: "learning",
    xpReward: 200
  },
  {
    id: 11,
    name: "Speed Demon",
    description: "Solve a medium difficulty problem in under 10 minutes.",
    icon: "⏱️",
    category: "challenge",
    xpReward: 150
  },
  {
    id: 12,
    name: "Edge Case Expert",
    description: "Identify all edge cases before writing code 10 times.",
    icon: "🛡️",
    category: "skill",
    xpReward: 250
  }
];
