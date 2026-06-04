import { Inter } from 'next/font/google'
import { QueryProvider } from '@/providers/QueryProvider'
import { AuthProvider } from '@/providers/AuthProvider'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Cabinets & Remodeling Depot | Tampa Kitchen & Bathroom Remodeling',
    template: '%s | Cabinets & Remodeling Depot',
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
    <html lang="en" className={inter.variable}>
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
