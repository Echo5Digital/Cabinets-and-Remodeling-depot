'use client'

import Link from 'next/link'
import { usePages } from '@/hooks/usePageContent'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { FileText, ChevronRight, ExternalLink } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function AdminPagesPage() {
  const { data: pages, isLoading } = usePages()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Page Management</h1>
        <p className="text-muted-foreground mt-1">
          Edit content for any public page. Changes are published instantly — no redeployment needed.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {pages?.map((page) => (
            <Card key={page.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium">{page.title}</span>
                        <Badge variant="outline" className="text-xs font-mono hidden sm:inline-flex">
                          /{page.slug === 'home' ? '' : page.slug}
                        </Badge>
                        {page.status === 'draft' ? (
                          <Badge className="text-xs bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
                            Draft
                          </Badge>
                        ) : (
                          <Badge className="text-xs bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                            Published
                          </Badge>
                        )}
                      </div>
                      {page.description && (
                        <p className="text-xs text-muted-foreground mt-0.5">{page.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {page.updatedAt && (
                      <span className="text-xs text-muted-foreground hidden sm:block">
                        Updated {formatDate(page.updatedAt)}
                      </span>
                    )}
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={`/${page.slug === 'home' ? '' : page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/admin/pages/${page.slug}`}>
                        Edit <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
