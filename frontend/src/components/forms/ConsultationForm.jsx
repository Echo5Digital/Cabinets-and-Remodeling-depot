'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calendar, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSubmitLead } from '@/hooks/useLeads'
import { SERVICES_LIST_FOR_FORM } from '@/lib/constants'

const schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Phone number is required'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Please describe your project'),
})

export function ConsultationForm({ serviceName = '' }) {
  const { mutate: submitLead, isPending } = useSubmitLead()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { service: serviceName },
  })

  const onSubmit = (data) => {
    submitLead(
      { ...data, source: 'consultation-form' },
      {
        onSuccess: () => {
          toast.success("Request received! We'll call you within 1 business day to schedule.")
          reset()
        },
        onError: () => {
          toast.error('Something went wrong. Please call us directly.')
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="c-firstName">First Name *</Label>
          <Input id="c-firstName" {...register('firstName')} placeholder="John" />
          {errors.firstName && <p className="text-destructive text-xs">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-lastName">Last Name *</Label>
          <Input id="c-lastName" {...register('lastName')} placeholder="Smith" />
          {errors.lastName && <p className="text-destructive text-xs">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="c-phone">Phone *</Label>
        <Input id="c-phone" type="tel" {...register('phone')} placeholder="(813) 555-0100" />
        {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="c-email">Email *</Label>
        <Input id="c-email" type="email" {...register('email')} placeholder="john@example.com" />
        {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Service *</Label>
        <Select
          defaultValue={serviceName}
          onValueChange={(val) => setValue('service', val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a service..." />
          </SelectTrigger>
          <SelectContent>
            {SERVICES_LIST_FOR_FORM.map((svc) => (
              <SelectItem key={svc.value} value={svc.value}>
                {svc.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.service && <p className="text-destructive text-xs">{errors.service.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="c-message">Project Details *</Label>
        <Textarea
          id="c-message"
          {...register('message')}
          placeholder="Describe your project, timeline, and any specific requirements..."
          rows={4}
        />
        {errors.message && <p className="text-destructive text-xs">{errors.message.message}</p>}
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Free Consultation
          </>
        )}
      </Button>
    </form>
  )
}
