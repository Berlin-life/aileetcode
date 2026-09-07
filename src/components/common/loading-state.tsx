import { cn } from '@/lib/utils'

export function LoadingState({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse space-y-4", className)}>
      <div className="h-4 bg-secondary rounded w-3/4"></div>
      <div className="h-4 bg-secondary rounded"></div>
      <div className="h-4 bg-secondary rounded w-5/6"></div>
      <div className="h-4 bg-secondary rounded w-1/2"></div>
    </div>
  )
}

export function LoadingCard({ className }: { className?: string }) {
  return (
    <div className={cn("border border-border rounded-xl p-4 bg-card animate-pulse", className)}>
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-10 w-10 bg-secondary rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-secondary rounded w-1/3"></div>
          <div className="h-3 bg-secondary rounded w-1/4"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-secondary rounded"></div>
        <div className="h-3 bg-secondary rounded w-5/6"></div>
      </div>
    </div>
  )
}
