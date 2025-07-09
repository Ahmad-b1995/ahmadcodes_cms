// User types
export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'editor' | 'user'
  permissions: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface AuthResponse {
  access_token: string
  user: User
}

// Type aliases for consistency
export type LoginResponse = AuthResponse
export type RegisterResponse = AuthResponse

export interface CreateUserRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'admin' | 'editor' | 'user'
}

export interface UpdateUserRequest {
  firstName?: string
  lastName?: string
  role?: 'admin' | 'editor' | 'user'
  isActive?: boolean
}

export interface UpdateProfileRequest {
  firstName?: string
  lastName?: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}

// Article types
export interface ArticleImage {
  alt: string
  src: string
}

export interface Article {
  id: number
  title: string
  content: string
  image?: ArticleImage
  createdAt: string
}

export interface CreateArticleRequest {
  title: string
  content: string
  image?: ArticleImage
}

export interface UpdateArticleRequest {
  title?: string
  content?: string
  image?: ArticleImage
}

// API Response types
export interface ApiError {
  message: string
  statusCode: number
}

export interface MessageResponse {
  message: string
} 