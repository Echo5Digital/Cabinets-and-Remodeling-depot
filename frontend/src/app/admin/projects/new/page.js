'use client'

import { useRouter } from 'next/navigation'
import { ProjectForm } from '@/components/admin/ProjectForm'
import { useCreateProject } from '@/hooks/useProjects'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function NewProjectPage() {
  const router = useRouter()
  const { mutate: createProject, isPending } = useCreateProject()

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/projects"><ChevronLeft className="w-4 h-4 mr-1" />Projects</Link>
        </Button>
        <h1 className="text-2xl font-bold">New Project</h1>
      </div>
      <ProjectForm
        onSubmit={(formData) =>
          createProject(formData, {
            onSuccess: () => { toast.success('Project created!'); router.push('/admin/projects') },
            onError: (err) => toast.error(err.response?.data?.error || 'Failed to create'),
          })
        }
        isPending={isPending}
      />
    </div>
  )
}
