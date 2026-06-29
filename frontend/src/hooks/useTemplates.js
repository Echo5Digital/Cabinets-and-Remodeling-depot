'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'

/**
 * Fetch all templates.
 */
export function useTemplates() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const { data } = await api.get('/templates')
      return data.data
    },
    staleTime: 1000 * 60 * 5,
  })
}

/**
 * Save a section (or sections array) as a template.
 */
export function useSaveTemplate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ name, description, category, sections }) => {
      const { data } = await api.post('/templates', { name, description, category, sections })
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] })
    },
  })
}

/**
 * Delete a template by id.
 */
export function useDeleteTemplate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/templates/${id}`)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] })
    },
  })
}
