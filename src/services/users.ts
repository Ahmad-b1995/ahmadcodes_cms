import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { apiClient } from '@/lib/api'
import { API_CONFIG } from '@/config/api'
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
  MessageResponse,
} from '@/types/api'

// Users API functions
export const usersApi = {
  getUsers: async (): Promise<User[]> => {
    return apiClient.get<User[]>(API_CONFIG.ENDPOINTS.USERS)
  },

  getUser: async (id: number): Promise<User> => {
    return apiClient.get<User>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`)
  },

  createUser: async (data: CreateUserRequest): Promise<User> => {
    return apiClient.post<User>(API_CONFIG.ENDPOINTS.USERS, data)
  },

  updateUser: async (id: number, data: UpdateUserRequest): Promise<User> => {
    return apiClient.patch<User>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`, data)
  },

  deleteUser: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`)
  },

  getUserProfile: async (): Promise<User> => {
    return apiClient.get<User>(API_CONFIG.ENDPOINTS.USER_PROFILE)
  },

  updateUserProfile: async (data: UpdateProfileRequest): Promise<User> => {
    return apiClient.patch<User>(API_CONFIG.ENDPOINTS.USER_PROFILE, data)
  },

  changePassword: async (data: ChangePasswordRequest): Promise<MessageResponse> => {
    return apiClient.post<MessageResponse>(API_CONFIG.ENDPOINTS.CHANGE_PASSWORD, data)
  },
}

// Users hooks
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: usersApi.getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => usersApi.getUser(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: usersApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User created successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create user')
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserRequest }) =>
      usersApi.updateUser(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['user', id] })
      toast.success('User updated successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update user')
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: usersApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User deleted successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete user')
    },
  })
}

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: usersApi.getUserProfile,
    staleTime: 5 * 60 * 1000,
  })
}

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: usersApi.updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      toast.success('Profile updated successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    },
  })
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: usersApi.changePassword,
    onSuccess: () => {
      toast.success('Password changed successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to change password')
    },
  })
} 