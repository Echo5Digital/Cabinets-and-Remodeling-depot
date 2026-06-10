'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, ChevronRight } from 'lucide-react'
import { useBlog } from '@/hooks/useBlogs'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate } from '@/lib/utils'

export function BlogPostClient({ slug }) {
  const { data: blog, isLoading } = useBlog(slug)

  if (isLoading) {
    return (
      <>
        <Skeleton className="w-full h-64 md:h-80 rounded-none" />
        <div className="section-padding container-custom max-w-4xl space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </>
    )
  }

  if (!blog) return null

  return (
    <>
      {/* Hero Banner */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        <Image
          src={blog.coverImage || '/contact-no-1 (1).jpg'}
          alt={blog.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Banner content */}
        <div className="relative z-10 container-custom h-full flex flex-col justify-center gap-4 md:flex-row md:items-center md:justify-between">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl font-bold text-white leading-tight uppercase max-w-2xl"
          >
            {blog.title}
          </motion.h1>

          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-white/80 flex-shrink-0"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-white/50" />
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight className="h-3.5 w-3.5 text-white/50" />
            <span className="text-white/60 line-clamp-1 max-w-48 hidden md:inline">{blog.title}</span>
            <span className="text-white/60 md:hidden">Post</span>
          </motion.nav>
        </div>
      </div>

      {/* Article body */}
      <article className="section-padding">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Category */}
            {blog.category && (
              <Badge className="mb-4">{blog.category.name}</Badge>
            )}

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
    </>
  )
}
