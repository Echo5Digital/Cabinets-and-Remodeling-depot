import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileX } from 'lucide-react'

export default function AdminNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="space-y-4 max-w-md">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
          <FileX className="w-6 h-6 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="text-muted-foreground text-sm">
          This admin page doesn&apos;t exist or may have been moved.
        </p>
        <Button asChild>
          <Link href="/admin/pages">Back to Pages</Link>
        </Button>
      </div>
    </div>
  )
}
