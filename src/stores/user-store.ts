'use client'

import { create } from 'zustand'
import type { UserProfile } from '@/types'

interface UserState {
  profile: UserProfile | null
  streak: number
  xp: number
  skills: Record<string, number>
  setUser: (profile: UserProfile) => void
  updateStreak: (streak: number) => void
  addXP: (xp: number) => void
  updateSkills: (skills: Record<string, number>) => void
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  streak: 0,
  xp: 0,
  skills: {},
  setUser: (profile) => set({ profile }),
  updateStreak: (streak) => set({ streak }),
  addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
  updateSkills: (skills) => set({ skills }),
}))
