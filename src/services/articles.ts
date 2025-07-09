import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { apiClient } from '@/lib/api'
import { API_CONFIG } from '@/config/api'
import type {
  Article,
  CreateArticleRequest,
  UpdateArticleRequest,
} from '@/types/api'

// Articles API functions
export const articlesApi = {
  getArticles: async (): Promise<Article[]> => {
    return apiClient.get<Article[]>(API_CONFIG.ENDPOINTS.ARTICLES)
  },

  getArticle: async (id: number): Promise<Article> => {
    return apiClient.get<Article>(`${API_CONFIG.ENDPOINTS.ARTICLES}/${id}`)
  },

  createArticle: async (data: CreateArticleRequest): Promise<Article> => {
    return apiClient.post<Article>(API_CONFIG.ENDPOINTS.ARTICLES, data)
  },

  updateArticle: async (id: number, data: UpdateArticleRequest): Promise<Article> => {
    return apiClient.patch<Article>(`${API_CONFIG.ENDPOINTS.ARTICLES}/${id}`, data)
  },

  deleteArticle: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`${API_CONFIG.ENDPOINTS.ARTICLES}/${id}`)
  },
}

// Articles hooks
export const useArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: articlesApi.getArticles,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useArticle = (id: number) => {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => articlesApi.getArticle(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useCreateArticle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: articlesApi.createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      toast.success('Article created successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create article')
    },
  })
}

export const useUpdateArticle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateArticleRequest }) =>
      articlesApi.updateArticle(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      queryClient.invalidateQueries({ queryKey: ['article', id] })
      toast.success('Article updated successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update article')
    },
  })
}

export const useDeleteArticle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: articlesApi.deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      toast.success('Article deleted successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete article')
    },
  })
} 