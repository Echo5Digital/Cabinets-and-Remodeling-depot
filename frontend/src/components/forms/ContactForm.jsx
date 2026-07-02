'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSubmitLead } from '@/hooks/useLeads'
import { SERVICES_LIST_FOR_FORM } from '@/lib/constants'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  service: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Please provide some details (min 10 characters)'),
})

export function ContactForm({ source = 'contact-page', dark = false }) {
  const { mutate: submitLead, isPending } = useSubmitLead()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = (data) => {
    const [firstName, ...rest] = (data.name || '').trim().split(' ')
    const lastName = rest.join(' ')
    submitLead(
      { firstName, lastName, email: data.email, phone: data.phone, service: data.service, subject: data.subject, message: data.message, source },
      {
        onSuccess: () => {
          toast.success("Message sent! We'll be in touch within 24 hours.")
          reset()
        },
        onError: () => {
          toast.error('Something went wrong. Please try calling us directly.')
        },
      }
    )
  }

  const inputCls = dark
    ? 'w-full bg-gray-800 border border-gray-600 text-white placeholder:text-gray-500 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors'
    : 'w-full border border-input bg-background rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors'

  const labelCls = dark
    ? 'block text-gray-300 text-sm font-medium mb-1.5'
    : 'block text-sm font-medium text-foreground mb-1.5'

  const errorCls = dark ? 'text-red-400 text-xs mt-1' : 'text-destructive text-xs mt-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className={labelCls}>Full Name *</label>
        <input {...register('name')} placeholder="Full Name" className={inputCls} />
        {errors.name && <p className={errorCls}>{errors.name.message}</p>}
      </div>

      <div>
        <label className={labelCls}>Email Address *</label>
        <input type="email" {...register('email')} placeholder="Email Address" className={inputCls} />
        {errors.email && <p className={errorCls}>{errors.email.message}</p>}
      </div>

      <div>
        <label className={labelCls}>Phone Number</label>
        <input type="tel" {...register('phone')} placeholder="Phone Number" className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>Project Type</label>
        <Select onValueChange={(val) => setValue('service', val)}>
          <SelectTrigger
            className={
              dark
                ? 'w-full bg-gray-800 border-gray-600 text-white data-placeholder:text-gray-500 focus:ring-primary'
                : 'w-full'
            }
          >
            <SelectValue placeholder="Select Project Type" />
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

      <div>
        <label className={labelCls}>Project Location</label>
        <input {...register('subject')} placeholder="City or Zip Code" className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>Message</label>
        <textarea
          {...register('message')}
          placeholder="Tell us about your project..."
          rows={4}
          className={`${inputCls} resize-none`}
        />
        {errors.message && <p className={errorCls}>{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary text-white font-semibold text-sm tracking-widest uppercase py-3 px-6 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Request My Free Estimate
          </>
        )}
      </button>
    </form>
  )
}
