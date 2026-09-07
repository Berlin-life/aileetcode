import * as React from 'react'
import { FileQuestion, FolderOpen, Trophy, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: 'empty' | 'search' | 'trophy' | 'magic'
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon = 'empty', title, description, action, className }: EmptyStateProps) {
  const Icon = {
    empty: FolderOpen,
    search: FileQuestion,
    trophy: Trophy,
    magic: Sparkles,
  }[icon]

  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="bg-secondary p-4 rounded-full mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  )
}
