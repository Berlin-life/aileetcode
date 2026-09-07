'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Code2,
  RefreshCw,
  Mic,
  BarChart3,
  Trophy,
  User,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react'
import { useThemeStore } from '@/stores/theme-store'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'RisingBrain Sheet', href: '/sheet', icon: Sparkles, badge: 'New' },
  { name: 'Practice', href: '/practice', icon: Code2 },
  { name: 'Revision', href: '/revision', icon: RefreshCw },
  { name: 'Interview', href: '/interview', icon: Mic },
  { name: 'Progress', href: '/progress', icon: BarChart3 },
  { name: 'Achievements', href: '/achievements', icon: Trophy },
  { name: 'Profile', href: '/profile', icon: User },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = React.useState(false)
  const { theme, toggleTheme } = useThemeStore()

  return (
    <aside className={cn(
      "flex flex-col h-screen border-r border-border bg-card transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!collapsed && <span className="font-bold text-xl text-primary animate-fade-in">CodeMentor AI</span>}
        {collapsed && <span className="font-bold text-xl text-primary mx-auto">CM</span>}
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  collapsed ? "justify-center" : "justify-start"
                )}
              >
                <item.icon
                  className={cn(
                    "flex-shrink-0",
                    collapsed ? "h-6 w-6" : "mr-3 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
                {!collapsed && (
                  <span className="flex-1 flex justify-between items-center">
                    {item.name}
                    {item.badge && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {item.badge}
                      </span>
                    )}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-border flex flex-col gap-4">
        <button
          onClick={toggleTheme}
          className={cn(
            "flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          {theme === 'dark' ? (
            <Sun className={cn("flex-shrink-0", collapsed ? "h-6 w-6" : "mr-3 h-5 w-5")} />
          ) : (
            <Moon className={cn("flex-shrink-0", collapsed ? "h-6 w-6" : "mr-3 h-5 w-5")} />
          )}
          {!collapsed && <span>Toggle Theme</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-6 w-6" />
          ) : (
            <>
              <ChevronLeft className="mr-3 h-5 w-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
