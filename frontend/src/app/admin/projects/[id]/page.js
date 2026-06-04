'use client'

import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { ProjectForm } from '@/components/admin/ProjectForm'
import { useUpdateProject } from '@/hooks/useProjects'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronLeft } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function EditProjectPage() {
  const { id } = useParams()
  const router = useRouter()
  const { mutate: updateProject, isPending } = useUpdateProject()

  const { data: project, isLoading } = useQuery({
    queryKey: ['project-by-id', id],
    queryFn: async () => {
      const { data } = await api.get(`/projects/${id}`)
      return data.data
    },
    enabled: !!id,
  })

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/projects"><ChevronLeft className="w-4 h-4 mr-1" />Projects</Link>
        </Button>
        <h1 className="text-2xl font-bold">Edit Project</h1>
      </div>

      {isLoading ? <Skeleton className="h-64 w-full" /> : project ? (
        <ProjectForm
          initialData={project}
          isPending={isPending}
          onSubmit={(formData) =>
            updateProject({ id, formData }, {
              onSuccess: () => { toast.success('Project updated!'); router.push('/admin/projects') },
              onError: (err) => toast.error(err.response?.data?.error || 'Failed to update'),
            })
          }
        />
      ) : <p className="text-muted-foreground">Project not found.</p>}
    </div>
  )
}
