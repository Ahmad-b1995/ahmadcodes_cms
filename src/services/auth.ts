import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { toast } from 'sonner'
import { apiClient } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'
import type { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse,
  User 
} from '@/types/api'

// Login hook
export function useLogin() {
  const navigate = useNavigate()
  const search = useSearch({ from: '/(auth)/sign-in' }) as { redirect?: string }
  const { setUser, setAccessToken } = useAuthStore((state) => state.auth)

  return useMutation({
    mutationFn: async (data: LoginRequest): Promise<LoginResponse> => {
      return apiClient.post('/auth/login', data)
    },
    onSuccess: (response) => {
      setAccessToken(response.access_token)
      setUser(response.user)
      toast.success('Login successful!')
      
      // Redirect to the intended page or dashboard
      const redirectTo = search.redirect || '/'
      
      // Use setTimeout to ensure state updates are processed before navigation
      setTimeout(() => {
        navigate({ to: redirectTo })
      }, 100)
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
    },
  })
}

// Register hook
export function useRegister() {
  const navigate = useNavigate()
  const search = useSearch({ from: '/(auth)/sign-up' }) as { redirect?: string }
  const { setUser, setAccessToken } = useAuthStore((state) => state.auth)

  return useMutation({
    mutationFn: async (data: RegisterRequest): Promise<RegisterResponse> => {
      return apiClient.post('/auth/register', data)
    },
    onSuccess: (response) => {
      setAccessToken(response.access_token)
      setUser(response.user)
      toast.success('Registration successful!')
      
      // Redirect to the intended page or dashboard
      const redirectTo = search.redirect || '/'
      
      // Use setTimeout to ensure state updates are processed before navigation
      setTimeout(() => {
        navigate({ to: redirectTo })
      }, 100)
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
    },
  })
}

// Get profile hook
export function useProfile() {
  const { user, accessToken } = useAuthStore((state) => state.auth)

  return useQuery({
    queryKey: ['profile'],
    queryFn: async (): Promise<User> => {
      return apiClient.get('/auth/profile')
    },
    enabled: !!accessToken,
    initialData: user,
  })
}

// Logout hook
export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { reset } = useAuthStore((state) => state.auth)

  return useMutation({
    mutationFn: async (): Promise<void> => {
      return apiClient.post('/auth/logout')
    },
    onSuccess: () => {
      reset()
      queryClient.clear()
      toast.success('Logged out successfully!')
      navigate({ to: '/sign-in' })
    },
    onError: (error: any) => {
      // Even if logout fails on server, clear local state
      reset()
      queryClient.clear()
      const message = error.response?.data?.message || 'Logout completed'
      toast.success(message)
      navigate({ to: '/sign-in' })
    },
  })
} 