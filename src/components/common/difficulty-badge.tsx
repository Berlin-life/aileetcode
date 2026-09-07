import { cn } from '@/lib/utils'

export function DifficultyBadge({ difficulty, className }: { difficulty: 'Easy' | 'Medium' | 'Hard', className?: string }) {
  const colors = {
    Easy: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    Medium: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    Hard: 'text-rose-500 bg-rose-500/10 border-rose-500/20'
  }

  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-xs font-medium border",
      colors[difficulty],
      className
    )}>
      {difficulty}
    </span>
  )
}
