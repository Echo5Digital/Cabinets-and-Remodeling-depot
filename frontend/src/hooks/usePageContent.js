'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'

/**
 * Fetch page content by slug.
 * Used by every public page AND the admin page editor.
 */
export function usePageContent(slug) {
  return useQuery({
    queryKey: ['page', slug],
    queryFn: async () => {
      const { data } = await api.get(`/pages/${slug}`)
      return data.data
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

/**
 * Fetch all pages (for admin pages list).
 */
export function usePages() {
  return useQuery({
    queryKey: ['pages'],
    queryFn: async () => {
      const { data } = await api.get('/pages')
      return data.data
    },
  })
}

/**
 * Update page content (admin only).
 * On success, invalidates the public page query so changes appear immediately.
 */
export function useUpdatePageContent(slug) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (content) => {
      const { data } = await api.put(`/pages/admin/${slug}`, { content })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page', slug] })
      queryClient.invalidateQueries({ queryKey: ['pages'] })
    },
  })
}
