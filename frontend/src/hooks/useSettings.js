'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'

export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const { data } = await api.get('/settings')
      return data.data
    },
    staleTime: 1000 * 60 * 10, // 10 minutes - settings don't change often
  })
}

export function useUpdateSettings() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (settings) => {
      const { data } = await api.put('/settings', { settings })
      return data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['settings'] }),
  })
}

export function useUploadSettingImage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ key, file, label, group }) => {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('key', key)
      if (label) formData.append('label', label)
      if (group) formData.append('group', group)
      const { data } = await api.post('/settings/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['settings'] }),
  })
}
