import { PageHeader } from '@/components/common/PageHeader'

export const metadata = {
  title: 'Privacy Policy | Cabinets & Remodeling Depot',
  description: 'Privacy Policy for Cabinets & Remodeling Depot.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" subtitle="Last updated: January 1, 2025" />

      <section className="section-padding">
        <div className="container-custom max-w-3xl prose prose-sm md:prose-base text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
          <h2>Information We Collect</h2>
          <p>
            When you submit a contact form or consultation request on our website, we collect information
            such as your name, email address, phone number, and project details. We use this information
            solely to respond to your inquiry and provide you with remodeling services.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and provide quotes</li>
            <li>Schedule consultations and project appointments</li>
            <li>Send relevant communications about your project</li>
            <li>Improve our services and website</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or transfer your personal information to outside parties. We may
            share information with trusted third parties who assist us in operating our website and
            servicing you, provided those parties agree to keep this information confidential.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>Cookies</h2>
          <p>
            Our website may use cookies to enhance your experience. You can choose to have your
            computer warn you each time a cookie is being sent, or you can choose to turn off all
            cookies through your browser settings.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:sales@cabinetsandremodelingdepot.com" className="text-primary underline">
              sales@cabinetsandremodelingdepot.com
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
