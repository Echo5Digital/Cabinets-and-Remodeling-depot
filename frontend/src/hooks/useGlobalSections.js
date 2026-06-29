'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'

/**
 * Fetch all active global sections (public).
 */
export function useGlobalSections() {
  return useQuery({
    queryKey: ['global-sections'],
    queryFn: async () => {
      const { data } = await api.get('/global-sections')
      return data.data
    },
    staleTime: 1000 * 60 * 5,
  })
}

/**
 * Fetch all global sections including inactive (admin).
 */
export function useGlobalSectionsAdmin() {
  return useQuery({
    queryKey: ['global-sections-admin'],
    queryFn: async () => {
      const { data } = await api.get('/global-sections/admin')
      return data.data
    },
    staleTime: 0,
  })
}

/**
 * Create a global section.
 */
export function useCreateGlobalSection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post('/global-sections', payload)
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['global-sections'] })
      queryClient.invalidateQueries({ queryKey: ['global-sections-admin'] })
    },
  })
}

/**
 * Update a global section.
 */
export function useUpdateGlobalSection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...payload }) => {
      const { data } = await api.put(`/global-sections/${id}`, payload)
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['global-sections'] })
      queryClient.invalidateQueries({ queryKey: ['global-sections-admin'] })
    },
  })
}

/**
 * Delete a global section.
 */
export function useDeleteGlobalSection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/global-sections/${id}`)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['global-sections'] })
      queryClient.invalidateQueries({ queryKey: ['global-sections-admin'] })
    },
  })
}
