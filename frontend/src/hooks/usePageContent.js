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
      queryClient.invalidateQueries({ queryKey: ['page-preview', slug] })
      queryClient.invalidateQueries({ queryKey: ['pages'] })
    },
  })
}

/**
 * Update page status only (draft / published).
 */
export function useUpdatePageStatus(slug) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (status) => {
      const { data } = await api.put(`/pages/admin/${slug}`, { status })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page', slug] })
      queryClient.invalidateQueries({ queryKey: ['page-preview', slug] })
      queryClient.invalidateQueries({ queryKey: ['pages'] })
    },
  })
}

/**
 * Fetch page content for admin preview (includes draft pages).
 */
export function usePreviewPageContent(slug) {
  return useQuery({
    queryKey: ['page-preview', slug],
    queryFn: async () => {
      const { data } = await api.get(`/pages/admin/preview/${slug}`)
      return data.data
    },
    enabled: !!slug,
    staleTime: 0,
  })
}
