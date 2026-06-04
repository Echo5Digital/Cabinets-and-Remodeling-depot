import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

/**
 * Singleton QueryClient for server-side prefetching.
 * Using React's cache() to create a per-request singleton in RSC.
 */
export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 2, // 2 minutes — page content should be fresh
          gcTime: 1000 * 60 * 10, // 10 minutes garbage collection
          retry: 1,
          refetchOnWindowFocus: false,
        },
      },
    })
)
