import { Playfair_Display, Manrope, Montserrat } from 'next/font/google'
import { QueryProvider } from '@/providers/QueryProvider'
import { AuthProvider } from '@/providers/AuthProvider'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

/* Body / general text */
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

/* UI chrome — nav, buttons, labels, uppercase tracking text */
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

/* Display / editorial headings */
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Cabinets & Remodeling Depot | Tampa Kitchen & Bathroom Remodeling',
    template: '%s',
  },
  description:
    'Expert kitchen remodeling, bathroom renovation, custom cabinets, quartz & granite countertops, and flooring in Tampa Bay. Free in-home estimates.',
  keywords: [
    'kitchen remodeling Tampa',
    'bathroom remodeling Tampa',
    'custom cabinets Tampa',
    'quartz countertops Tampa',
    'granite countertops Tampa',
    'flooring Tampa',
    'Valrico remodeling',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Cabinets & Remodeling Depot',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} ${montserrat.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
