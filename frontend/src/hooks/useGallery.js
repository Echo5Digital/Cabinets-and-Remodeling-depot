'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'

export function useGallery(params = {}) {
  return useQuery({
    queryKey: ['gallery', params],
    queryFn: async () => {
      const { data } = await api.get('/gallery', { params })
      return data
    },
  })
}

export function useUploadGalleryImages() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.post('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return data.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gallery'] }),
  })
}

export function useUpdateGalleryImage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...updateData }) => {
      const { data } = await api.put(`/gallery/${id}`, updateData)
      return data.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gallery'] }),
  })
}

export function useDeleteGalleryImage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/gallery/${id}`)
      return data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gallery'] }),
  })
}
