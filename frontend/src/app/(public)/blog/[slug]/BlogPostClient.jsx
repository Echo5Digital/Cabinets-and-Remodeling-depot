'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react'
import { useBlog } from '@/hooks/useBlogs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { CTABanner } from '@/components/sections/CTABanner'
import { formatDate } from '@/lib/utils'

export function BlogPostClient({ slug }) {
  const { data: blog, isLoading } = useBlog(slug)

  if (isLoading) {
    return (
      <div className="section-padding container-custom max-w-4xl space-y-6">
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    )
  }

  if (!blog) return null

  return (
    <>
      <article className="section-padding">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back */}
            <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
              <Link href="/blog">
                <ArrowLeft className="mr-1 h-4 w-4" />
                All Articles
              </Link>
            </Button>

            {/* Cover image */}
            {blog.coverImage && (
              <div className="relative aspect-[16/7] rounded-2xl overflow-hidden bg-primary/10 mb-8">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 896px"
                />
              </div>
            )}

            {/* Category */}
            {blog.category && (
              <Badge className="mb-4">{blog.category.name}</Badge>
            )}

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {blog.authorName || 'Admin'}
              </span>
              {blog.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(blog.publishedAt)}
                </span>
              )}
              {blog.readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {blog.readTime} min read
                </span>
              )}
            </div>

            {/* Body */}
            <div
              className="prose prose-lg max-w-none text-foreground
                prose-headings:font-bold prose-headings:text-foreground
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-primary prose-a:underline
                prose-strong:text-foreground
                prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                prose-blockquote:border-primary prose-blockquote:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: blog.body }}
            />
          </motion.div>
        </div>
      </article>

      <CTABanner
        heading="Ready to Transform Your Home?"
        subheading="Get a free consultation with our remodeling experts."
        buttonText="Get Free Estimate"
        buttonLink="/contact"
      />
    </>
  )
}
