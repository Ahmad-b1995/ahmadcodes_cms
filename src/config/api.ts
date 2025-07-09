export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  ENDPOINTS: {
    // Health
    HEALTH: '/',
    
    // Authentication
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
    LOGOUT: '/auth/logout',
    
    // Users
    USERS: '/users',
    USER_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    
    // Articles
    ARTICLES: '/articles',
  },
} as const

export type ApiEndpoint = typeof API_CONFIG.ENDPOINTS[keyof typeof API_CONFIG.ENDPOINTS] 