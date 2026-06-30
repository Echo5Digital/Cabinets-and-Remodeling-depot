'use client'

import Image from 'next/image'
import Link from 'next/link'
import { COMPANY_NAME, COMPANY_PHONE_DISPLAY, COMPANY_EMAIL, COMPANY_ADDRESS } from '@/lib/constants'
import { useSettings } from '@/hooks/useSettings'

function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

const FOOTER_SERVICES = [
  { label: 'Countertops', href: '/countertops-tampa' },
  { label: 'Kitchen Cabinets', href: '/kitchen-cabinets-tampa' },
  { label: 'Kitchen Remodeling', href: '/kitchen-remodeling-tampa' },
  { label: 'Flooring', href: '/flooring-in-tampa' },
  { label: 'Bathroom Remodeling', href: '/bathroom-remodeling-tampa' },
]

const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/showroom-gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
]

function FooterHeading({ first, second }) {
  return (
    <div className="mb-5">
      <h3 className="text-base tracking-widest uppercase font-medium text-white font-montserrat">
        {first}{' '}
        <span className="font-bold text-primary">{second}</span>
      </h3>
      {/* Red underline */}
      <div className="w-8 h-0.5 bg-primary mt-2 rounded-full" />
    </div>
  )
}

export function Footer() {
  const { data: settings } = useSettings()

  const companyName  = settings?.companyName  || COMPANY_NAME
  const phone        = settings?.phone        || COMPANY_PHONE_DISPLAY
  const phoneHref    = `tel:+1${phone.replace(/\D/g, '').slice(-10)}`
  const email        = settings?.email        || 'sales@cabinetsandremodelingdepot.com'
  const address      = settings?.address      || 'Cabinets and Remodeling Depot, 106 S St Cloud Ave, Valrico, FL 33594'
  const facebookUrl  = settings?.facebook     || 'https://facebook.com'
  const instagramUrl = settings?.instagram    || 'https://instagram.com'

  // Use admin-edited arrays from settings, fall back to hardcoded defaults
  const activeFooterLinks    = Array.isArray(settings?.footerLinks) && settings.footerLinks.length
    ? settings.footerLinks
    : FOOTER_LINKS
  const activeFooterServices = Array.isArray(settings?.footerServices) && settings.footerServices.length
    ? settings.footerServices
    : FOOTER_SERVICES

  return (
    <footer
      className="text-white/80"
      style={{
        backgroundColor: '#0d0d0d',
        backgroundImage:
          'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      <div className="container mx-auto px-4 md:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Col 1 — About Us */}
          <div>
            <div className="mb-5">
              <Image
                src="/Logo1.jpg"
                alt="Cabinets & Remodeling Depot"
                width={180}
                height={58}
                className="h-14 w-auto object-contain"
              />
            </div>

            <FooterHeading first="ABOUT" second="US" />

            <p className="text-sm leading-relaxed text-white/70 mb-6">
              Since 2005, we&apos;ve been designing, building, and supplying kitchen and bath
              cabinets in Tampa, FL. Visit our showroom for all your remodeling needs — no
              need to search elsewhere!
            </p>

            <div className="flex items-center gap-3">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2 — Useful Links */}
          <div>
            <FooterHeading first="USEFUL" second="LINKS" />
            <ul className="space-y-2.5">
              {activeFooterLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Our Services */}
          <div>
            <FooterHeading first="OUR" second="SERVICES" />
            <ul className="space-y-2.5">
              {activeFooterServices.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-white/70 hover:text-primary transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact Here */}
          <div>
            <FooterHeading first="CONTACT" second="HERE" />
            <ul className="space-y-3 text-sm text-white/70 leading-snug">
              <li>
                <span className="text-white font-semibold">Address: </span>
                {address}
              </li>
              <li>
                <span className="text-white font-semibold">Phone: </span>
                <a
                  href={phoneHref}
                  className="hover:text-primary transition-colors"
                >
                  {phone}
                </a>
              </li>
              <li>
                <span className="text-white font-semibold">Mail: </span>
                <a
                  href={`mailto:${email}`}
                  className="hover:text-primary transition-colors break-all"
                >
                  {email}
                </a>
              </li>
              <li>
                <span className="text-white font-semibold">Timing:</span>
                <div className="mt-1 space-y-0.5 pl-0">
                  <p>Mon – Fri: 10:00AM – 6:00PM</p>
                  <p>Sat: 10:00AM – 4:00PM</p>
                  <p>Sun: Closed</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <p className="text-xs text-white/50">
            Proudly serving Tampa Bay, Hillsborough, and Pinellas Counties
          </p>
        </div>
      </div>
    </footer>
  )
}
