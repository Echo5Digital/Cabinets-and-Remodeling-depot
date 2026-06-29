'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'

/**
 * Upload a single image file to Cloudinary via the media endpoint.
 * The image is saved to the Gallery collection automatically.
 * Returns { url, publicId, id }.
 */
export function useUploadMedia() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData()
      formData.append('file', file)
      const { data } = await api.post('/media/upload', formData)
      return data.data // { url, publicId, id }
    },
    onSuccess: () => {
      // Invalidate gallery so the Library tab shows the new image immediately
      queryClient.invalidateQueries({ queryKey: ['gallery'] })
    },
  })
}
