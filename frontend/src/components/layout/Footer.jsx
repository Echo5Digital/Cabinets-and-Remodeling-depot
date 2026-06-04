import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

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
import { COMPANY_NAME } from '@/lib/constants'

const FOOTER_SERVICES = [
  { label: 'Kitchen Remodeling', href: '/kitchen-remodeling' },
  { label: 'Bathroom Remodeling', href: '/bathroom-remodeling' },
  { label: 'Countertops', href: '/countertops' },
  { label: 'Flooring', href: '/flooring' },
  { label: 'Cabinets', href: '/cabinets' },
]

const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
]

function FooterHeading({ first, second }) {
  return (
    <div className="mb-5">
      <h3 className="text-base tracking-wider uppercase text-white">
        {first} <span className="font-bold">{second}</span>
      </h3>
      <div className="w-8 h-0.5 bg-white/40 mt-2 rounded-full" />
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-primary text-white/80">
      <div className="container mx-auto px-4 md:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Col 1 — About Us */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0">
                <span className="text-primary font-bold text-sm">C&amp;R</span>
              </div>
              <div>
                <p className="font-bold text-white text-sm leading-tight">Cabinets &amp; Remodeling</p>
                <p className="text-xs text-white/70">Depot</p>
              </div>
            </div>

            <FooterHeading first="ABOUT" second="US" />

            <p className="text-sm leading-relaxed text-white/70 mb-5">
              Since 2005, we&apos;ve been designing, building, and supplying kitchen and bath cabinets in Tampa, FL. Visit our showroom for all your remodeling needs — no need to search elsewhere!
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-primary transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-primary transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2 — Useful Links */}
          <div>
            <FooterHeading first="USEFUL" second="LINKS" />
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
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
              {FOOTER_SERVICES.map((service) => (
                <li key={service.href} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                  <Link
                    href={service.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
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
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span className="text-sm text-white/70 leading-snug">
                  Cabinets and Remodeling Depot,<br />
                  106 S St Cloud Ave,<br />
                  Valrico, FL 33594
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <a
                  href="tel:+18136512333"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  +1 813-651-2333
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <a
                  href="mailto:sales@cabinetsandremodelingdepot.com"
                  className="text-sm text-white/70 hover:text-white transition-colors break-all"
                >
                  sales@cabinetsandremodelingdepot.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div className="text-sm text-white/70 leading-relaxed">
                  <p>Mon – Fri: 10:00AM – 6:00PM</p>
                  <p>Sat: 10:00AM – 4:00PM</p>
                  <p>Sun: Closed</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 md:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-white/50">
            Proudly serving Tampa Bay, Hillsborough, and Pinellas Counties
          </p>
        </div>
      </div>
    </footer>
  )
}
