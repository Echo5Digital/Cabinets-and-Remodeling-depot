'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'

/**
 * Fetch revision list for a page (metadata only).
 */
export function usePageRevisions(slug) {
  return useQuery({
    queryKey: ['page-revisions', slug],
    queryFn: async () => {
      const { data } = await api.get(`/pages/admin/${slug}/revisions`)
      return data.data
    },
    enabled: !!slug,
    staleTime: 0, // Always fresh — revisions change after every save
  })
}

/**
 * Restore a revision. Invalidates the page content query so the editor reloads.
 */
export function useRestoreRevision(slug) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (revisionId) => {
      const { data } = await api.post(
        `/pages/admin/${slug}/revisions/${revisionId}/restore`
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page', slug] })
      queryClient.invalidateQueries({ queryKey: ['page-preview', slug] })
      queryClient.invalidateQueries({ queryKey: ['page-revisions', slug] })
    },
  })
}
