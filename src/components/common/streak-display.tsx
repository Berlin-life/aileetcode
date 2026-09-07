'use client'

import { motion } from 'framer-motion'

export function StreakDisplay({ streak }: { streak: number }) {
  return (
    <div className="flex items-center space-x-2 bg-orange-500/10 text-orange-500 px-3 py-1.5 rounded-full border border-orange-500/20">
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-lg"
      >
        🔥
      </motion.span>
      <span className="font-bold text-sm">{streak} Day Streak</span>
    </div>
  )
}
