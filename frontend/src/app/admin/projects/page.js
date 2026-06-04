'use client'

import Link from 'next/link'
import { useProjects, useDeleteProject } from '@/hooks/useProjects'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Plus, Edit, Trash2, Star } from 'lucide-react'
import { toast } from 'sonner'
import { PROJECT_CATEGORIES } from '@/lib/constants'

export default function AdminProjectsPage() {
  const { data, isLoading } = useProjects({ published: 'false', limit: 50 })
  const { mutate: deleteProject } = useDeleteProject()

  const getCategoryLabel = (value) =>
    PROJECT_CATEGORIES.find((c) => c.value === value)?.label || value

  const handleDelete = (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return
    deleteProject(id, {
      onSuccess: () => toast.success('Project deleted'),
      onError: () => toast.error('Failed to delete project'),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage completed remodeling projects</p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-lg" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(!data?.data || data.data.length === 0) && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No projects yet. <Link href="/admin/projects/new" className="text-primary underline">Add your first project</Link>
            </div>
          )}
          {data?.data?.map((project) => (
            <div key={project.id} className="border rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
              {project.coverImage && (
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
                  {project.isFeatured && (
                    <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                      <Star className="w-3 h-3" /> Featured
                    </div>
                  )}
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-sm line-clamp-1">{project.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{getCategoryLabel(project.category)}</p>
                  </div>
                  <Badge variant={project.isPublished ? 'default' : 'secondary'} className="text-xs flex-shrink-0">
                    {project.isPublished ? 'Live' : 'Draft'}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/admin/projects/${project.id}`}><Edit className="w-3 h-3 mr-1" />Edit</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(project.id, project.title)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
