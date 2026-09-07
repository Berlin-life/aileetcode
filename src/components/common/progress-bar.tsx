'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  className?: string
  indicatorClassName?: string
}

export function ProgressBar({ 
  value, 
  max = 100, 
  label, 
  showValue = false, 
  className,
  indicatorClassName 
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1 text-sm font-medium">
          {label && <span>{label}</span>}
          {showValue && <span className="text-muted-foreground">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="h-2 w-full bg-secondary overflow-hidden rounded-full">
        <motion.div
          className={cn("h-full bg-primary", indicatorClassName)}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
