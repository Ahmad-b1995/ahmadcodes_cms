import { create } from 'zustand'
import type { User } from '@/types/api'

const ACCESS_TOKEN = 'ahmad_codes_admin_token'
const USER_DATA = 'ahmad_codes_admin_user'

interface AuthState {
  auth: {
    user: User | null
    setUser: (user: User | null) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    resetAccessToken: () => void
    reset: () => void
    isAuthenticated: () => boolean
  }
}

// Helper functions for localStorage
const getStoredToken = (): string => {
  try {
    return localStorage.getItem(ACCESS_TOKEN) || ''
  } catch {
    return ''
  }
}

const getStoredUser = (): User | null => {
  try {
    const userData = localStorage.getItem(USER_DATA)
    return userData ? JSON.parse(userData) : null
  } catch {
    return null
  }
}

const setStoredToken = (token: string): void => {
  try {
    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token)
    } else {
      localStorage.removeItem(ACCESS_TOKEN)
    }
  } catch {
    // Handle localStorage errors silently
  }
}

const setStoredUser = (user: User | null): void => {
  try {
    if (user) {
      localStorage.setItem(USER_DATA, JSON.stringify(user))
    } else {
      localStorage.removeItem(USER_DATA)
    }
  } catch {
    // Handle localStorage errors silently
  }
}

export const useAuthStore = create<AuthState>()((set, get) => {
  // Initialize from localStorage
  const initToken = getStoredToken()
  const initUser = getStoredUser()
  
  return {
    auth: {
      user: initUser,
      setUser: (user) => {
        setStoredUser(user)
        set((state) => ({ ...state, auth: { ...state.auth, user } }))
      },
      accessToken: initToken,
      setAccessToken: (accessToken) => {
        setStoredToken(accessToken)
        set((state) => ({ ...state, auth: { ...state.auth, accessToken } }))
      },
      resetAccessToken: () => {
        setStoredToken('')
        set((state) => ({ ...state, auth: { ...state.auth, accessToken: '' } }))
      },
      reset: () => {
        setStoredToken('')
        setStoredUser(null)
        set((state) => ({
          ...state,
          auth: { ...state.auth, user: null, accessToken: '' },
        }))
      },
      isAuthenticated: () => {
        const state = get()
        return !!state.auth.accessToken && !!state.auth.user
      },
    },
  }
})
