'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSettings } from '@/hooks/useSettings'
import { formatDate } from '@/lib/utils'

function BlogCard({ blog, index, inView, defaultImage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/blog/${blog.slug}`} className="group block h-full">
        <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
          {/* Cover Image */}
          <div className="relative h-52 bg-primary/10 overflow-hidden">
            <Image
              src={blog.thumbnailImage || blog.coverImage || defaultImage}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <CardContent className="p-5 space-y-3">
            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {blog.publishedAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(blog.publishedAt)}
                </span>
              )}
              {blog.readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {blog.readTime} min read
                </span>
              )}
            </div>

            <h3 className="font-semibold text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {blog.title}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {blog.excerpt}
            </p>

            <div className="flex items-center text-sm font-medium text-primary pt-1">
              Read More
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

export function BlogGrid({ blogs = [], showViewAll = false }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const { data: settings } = useSettings()
  const defaultImage = settings?.blogDefaultBannerImage || '/contact-no-1 (1).jpg'

  if (!blogs.length) return null

  return (
    <div ref={ref}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <BlogCard key={blog.id || index} blog={blog} index={index} inView={inView} defaultImage={defaultImage} />
        ))}
      </div>

      {showViewAll && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-10"
        >
          <Button asChild variant="outline" size="lg">
            <Link href="/blog">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      )}
    </div>
  )
}
