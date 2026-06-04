'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { usePageContent } from '@/hooks/usePageContent'
import { useSettings } from '@/hooks/useSettings'
import { ContactForm } from '@/components/forms/ContactForm'
import { PageHeader } from '@/components/common/PageHeader'
import { Card, CardContent } from '@/components/ui/card'

export function ContactPageClient() {
  const { data: pageData } = usePageContent('contact')
  const { data: settings } = useSettings()
  const content = pageData?.content || {}
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const phone = settings?.phone || '(813) 555-0100'
  const email = settings?.email || 'info@company.com'
  const address = settings?.address || 'Valrico, FL'
  const googleMapsEmbedUrl = settings?.googleMapsEmbedUrl

  const contactItems = [
    { icon: Phone, label: 'Phone', value: phone, href: `tel:${phone}` },
    { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
    { icon: MapPin, label: 'Address', value: address },
    { icon: Clock, label: 'Hours', value: 'Mon–Sat: 8am–6pm' },
  ]

  return (
    <>
      <PageHeader
        title={content.hero?.title || 'Contact Us'}
        subtitle={content.hero?.subtitle || 'Get a free estimate or ask us anything. We respond within 24 hours.'}
      />

      <section className="section-padding" ref={ref}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: contact info + map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">Get In Touch</h2>
                <p className="text-muted-foreground">
                  We&apos;d love to hear about your project. Reach out using the form or contact us directly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactItems.map((item) => (
                  <Card key={item.label}>
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm font-medium hover:text-primary transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium">{item.value}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Google Maps embed */}
              {googleMapsEmbedUrl && (
                <div className="rounded-xl overflow-hidden border aspect-video">
                  <iframe
                    src={googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Our location"
                  />
                </div>
              )}
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="bg-white border border-primary/15 rounded-2xl p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold mb-2">Request Free Estimate</h2>
              <p className="text-muted-foreground mb-6 text-sm">
                Fill out the form and we&apos;ll get back to you within 24 hours.
              </p>
              <ContactForm source="contact-page" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
