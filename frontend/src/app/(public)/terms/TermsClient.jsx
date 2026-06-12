'use client'

import { usePageContent } from '@/hooks/usePageContent'
import { normalizeContent } from '@/lib/pageContent'
import { PageHeader } from '@/components/common/PageHeader'
import { JsonLd } from '@/components/common/JsonLd'

// Hardcoded fallback — shown when no API text section exists
function HardcodedContent() {
  return (
    <>
      <h2>Acceptance of Terms</h2>
      <p>
        By accessing and using the Cabinets &amp; Remodeling Depot website, you accept and agree
        to be bound by the terms and provisions of this agreement.
      </p>

      <h2>Services</h2>
      <p>
        Cabinets &amp; Remodeling Depot provides home remodeling services including kitchen
        remodeling, bathroom renovations, custom cabinets, countertop installation, and flooring.
        All services are subject to separate written contracts between the company and the client.
      </p>

      <h2>Website Use</h2>
      <p>
        This website is provided for informational purposes. You agree to use this website only
        for lawful purposes and in a way that does not infringe the rights of others or restrict
        their use and enjoyment of the website.
      </p>

      <h2>Accuracy of Information</h2>
      <p>
        We strive to provide accurate information on our website, but we make no warranties about
        the completeness, reliability, or accuracy of the content. Pricing and availability are
        subject to change and must be confirmed through a formal quote.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on this website, including text, images, and design, is owned by Cabinets &amp;
        Remodeling Depot and protected by copyright laws. You may not reproduce or distribute
        content without written permission.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        Cabinets &amp; Remodeling Depot shall not be liable for any indirect, incidental, or
        consequential damages arising from your use of this website or our services, beyond the
        scope covered by your service contract.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms of Service should be directed to{' '}
        <a href="mailto:sales@cabinetsandremodelingdepot.com" className="text-primary underline">
          sales@cabinetsandremodelingdepot.com
        </a>
        .
      </p>
    </>
  )
}

export function TermsClient() {
  const { data: page } = usePageContent('terms')
  const apiContent = page?.content ? normalizeContent(page.content) : null
  const textSection = apiContent?.sections?.find((s) => s.type === 'text')
  const body = textSection?.body || null
  const subtitle = textSection?.heading || 'Last updated: January 1, 2025'
  const schemaJson = page?.content?.schema || null

  return (
    <>
      <JsonLd schema={schemaJson} />
      <PageHeader title="Terms of Service" subtitle={subtitle} />

      <section className="section-padding">
        <div className="container-custom max-w-3xl prose prose-sm md:prose-base text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
          {body ? (
            <div dangerouslySetInnerHTML={{ __html: body }} />
          ) : (
            <HardcodedContent />
          )}
        </div>
      </section>
    </>
  )
}
