'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'

export function useBlogs(params = {}) {
  return useQuery({
    queryKey: ['blogs', params],
    queryFn: async () => {
      const { data } = await api.get('/blogs', { params })
      return data
    },
  })
}

export function useBlog(slug) {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const { data } = await api.get(`/blogs/${slug}`)
      return data.data
    },
    enabled: !!slug,
  })
}

export function useBlogCategories() {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const { data } = await api.get('/blogs/categories')
      return data.data
    },
  })
}

export function useCreateBlog() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.post('/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return data.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })
}

export function useUpdateBlog() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, formData }) => {
      const { data } = await api.put(`/blogs/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return data.data
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.invalidateQueries({ queryKey: ['blog'] })
      queryClient.invalidateQueries({ queryKey: ['blog-by-id', id] })
    },
  })
}

export function useDeleteBlog() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/blogs/${id}`)
      return data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })
}
