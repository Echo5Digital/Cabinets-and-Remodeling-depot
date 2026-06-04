import { PageHeader } from '@/components/common/PageHeader'

export const metadata = {
  title: 'Terms of Service | Cabinets & Remodeling Depot',
  description: 'Terms of Service for Cabinets & Remodeling Depot.',
}

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms of Service" subtitle="Last updated: January 1, 2025" />

      <section className="section-padding">
        <div className="container-custom max-w-3xl prose prose-sm md:prose-base max-w-none text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
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
            <a href="mailto:info@cabinetsremodelingdepot.com" className="text-primary underline">
              info@cabinetsremodelingdepot.com
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
