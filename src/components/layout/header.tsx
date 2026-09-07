'use client'

import * as React from 'react'
import { Bell, Search, UserCircle } from 'lucide-react'

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex-1 flex items-center">
        <div className="w-full max-w-md flex items-center relative">
          <Search className="h-4 w-4 text-muted-foreground absolute left-3" />
          <input
            type="text"
            placeholder="Search problems, topics... (Cmd+K)"
            className="w-full bg-background border border-border rounded-md pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        <button className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors">
          <UserCircle className="h-6 w-6" />
          <span>Profile</span>
        </button>
      </div>
    </header>
  )
}
