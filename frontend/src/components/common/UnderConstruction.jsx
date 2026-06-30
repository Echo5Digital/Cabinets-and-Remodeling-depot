import Link from 'next/link'
import { HardHat } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function UnderConstruction() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md w-full space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <HardHat className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Page Under Construction
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            We&apos;re currently updating this page.
            <br />
            Please check back soon.
          </p>
        </div>

        {/* CTA */}
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}
