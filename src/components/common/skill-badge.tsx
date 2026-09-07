import { cn } from '@/lib/utils'

interface SkillBadgeProps {
  topic: string
  level?: number
  className?: string
}

export function SkillBadge({ topic, level, className }: SkillBadgeProps) {
  // Generate a somewhat stable color based on topic length/chars
  const colors = [
    'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'bg-purple-500/10 text-purple-500 border-purple-500/20',
    'bg-teal-500/10 text-teal-500 border-teal-500/20',
    'bg-rose-500/10 text-rose-500 border-rose-500/20',
    'bg-amber-500/10 text-amber-500 border-amber-500/20',
  ]
  const colorIndex = topic.length % colors.length
  
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
      colors[colorIndex],
      className
    )}>
      {topic}
      {level !== undefined && (
        <span className="ml-1.5 px-1 py-0.5 rounded-full bg-background/50 text-[10px]">
          L{level}
        </span>
      )}
    </span>
  )
}
