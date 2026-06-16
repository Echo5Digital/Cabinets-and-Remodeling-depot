'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Send } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSubmitLead } from '@/hooks/useLeads'
import { SERVICES_LIST_FOR_FORM } from '@/lib/constants'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Phone number is required'),
  service: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().optional(),
})

export function ShowroomSection({ data }) {
  const bgImage = data && data.bgImage ? data.bgImage : '/Kitchen-Cabinet-Showroom-Tampa.jpg'
  const sectionLabel = data && data.label ? data.label : "Tampa Bay's Trusted Showroom"
  const sectionHeading = data && data.heading ? data.heading : null
  const sectionBody = data && data.body ? data.body : null

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const { mutate: submitLead, isPending } = useSubmitLead()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = (data) => {
    const combined = [
      data.subject ? `Subject: ${data.subject}` : '',
      data.message || '',
    ]
      .filter(Boolean)
      .join('\n') || 'Showroom consultation request'

    submitLead(
      {
        firstName: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        message: combined,
        source: 'showroom-section',
      },
      {
        onSuccess: () => {
          toast.success("Thanks! We'll be in touch soon.")
          reset()
        },
        onError: () => toast.error('Something went wrong. Please try again.'),
      }
    )
  }

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">
      {/* ── Background image ── */}
      <Image
        src={bgImage}
        alt="Kitchen cabinet showroom Tampa"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      {/* Overlay: light on left for text readability, fades to near-transparent on right so image shows across the full section */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.70) 40%, rgba(255,255,255,0.38) 65%, rgba(255,255,255,0.10) 100%)',
        }}
      />

      <div className="relative z-10 container-custom">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: heading + body copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Section label */}
            <p className="text-xs uppercase tracking-[0.18em] font-semibold text-primary mb-3">
              {sectionLabel}
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              {sectionHeading ? (
                <span className="text-foreground">{sectionHeading}</span>
              ) : (
                <>
                  <span className="text-foreground">Visit Our Kitchen Cabinet Showroom Tampa</span>{' '}
                  <span className="text-primary">Homeowners Trust</span>
                </>
              )}
            </h2>

            {/* Decorative underline */}
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
              <div className="h-1 w-8 bg-primary rounded-full" />
              <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
            </div>

            {sectionBody ? (
              <div className="text-gray-900 text-base leading-relaxed [&_p]:mb-4" dangerouslySetInnerHTML={{ __html: sectionBody }} />
            ) : (
              <>
                <p className="text-gray-900 text-base leading-relaxed mb-4">
                  Seeing cabinetry in person makes a difference. Our Valrico showroom gives
                  homeowners the opportunity to explore cabinet styles, finishes, countertop
                  materials, and remodeling options before making a final decision.
                </p>
                <p className="text-gray-900 text-base leading-relaxed">
                  If you&apos;ve been searching for a kitchen cabinet showroom Tampa homeowners
                  recommend or looking online for a &ldquo;valrico showroom kitchen cabinets near
                  me tampa,&rdquo; our showroom offers a convenient place to compare designs and
                  speak directly with experienced remodeling professionals.
                </p>
              </>
            )}
          </motion.div>

          {/* ── Right: consultation form card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-7 md:p-8">
              <h3 className="text-xl font-bold mb-1 text-foreground">
                Book free consultation
              </h3>
              <p className="text-muted-foreground text-sm mb-6">Fill out the form and we&apos;ll contact you within 1 business day.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="sr-name">
                      Your Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="sr-name"
                      placeholder="John Smith"
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="text-destructive text-xs">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="sr-email">
                      Your Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="sr-email"
                      type="email"
                      placeholder="john@example.com"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-destructive text-xs">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone + Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="sr-phone">
                      Ph Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="sr-phone"
                      type="tel"
                      placeholder="(813) 555-0100"
                      {...register('phone')}
                    />
                    {errors.phone && (
                      <p className="text-destructive text-xs">{errors.phone.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label>Select Service</Label>
                    <Select onValueChange={(val) => setValue('service', val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a service..." />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICES_LIST_FOR_FORM.map((svc) => (
                          <SelectItem key={svc.value} value={svc.value}>
                            {svc.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Row 3: Subject */}
                <div className="space-y-1.5">
                  <Label htmlFor="sr-subject">Subject</Label>
                  <Input
                    id="sr-subject"
                    placeholder="e.g. Kitchen cabinet consultation"
                    {...register('subject')}
                  />
                </div>

                {/* Row 4: Message */}
                <div className="space-y-1.5">
                  <Label htmlFor="sr-message">Your Message</Label>
                  <Textarea
                    id="sr-message"
                    placeholder="Tell us about your project..."
                    rows={4}
                    {...register('message')}
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
