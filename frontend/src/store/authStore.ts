import { create } from 'zustand'
import { TOKEN_KEY } from '../services/api'
import type { User } from '../types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem(TOKEN_KEY),
  isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
  setAuth: (user, token) => {
    localStorage.setItem(TOKEN_KEY, token)
    set({ user, token, isAuthenticated: true })
  },
  clearAuth: () => {
    localStorage.removeItem(TOKEN_KEY)
    set({ user: null, token: null, isAuthenticated: false })
  },
}))
