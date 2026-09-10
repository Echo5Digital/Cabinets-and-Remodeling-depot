'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import ReCAPTCHA from 'react-google-recaptcha'
import { Home, Eye, EyeOff, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'
import { COMPANY_NAME } from '@/lib/constants'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const [recaptchaError, setRecaptchaError] = useState('')
  const [recaptchaKey, setRecaptchaKey] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (values) => {
    if (!recaptchaToken) {
      setRecaptchaError('Please verify that you are not a robot.')
      return
    }
    setRecaptchaError('')

    try {
      const { user } = await login(values.email, values.password, recaptchaToken)
      // Set a same-domain cookie so the Next.js middleware can gate admin routes.
      // The cookie lives on the frontend domain and is readable server-side,
      // unlike the httpOnly refreshToken which the backend sets on its own domain.
      const secure = window.location.protocol === 'https:' ? '; Secure' : ''
      // eslint-disable-next-line react-hooks/immutability
      document.cookie = `adminLoggedIn=1; path=/; max-age=604800; SameSite=Lax${secure}`
      toast.success('Welcome back!')
      // Restricted ADMIN role has no access to the dashboard — send them
      // straight to Leads regardless of any ?redirect= param.
      const defaultPath = user?.role === 'ADMIN' ? '/admin/leads' : '/admin/dashboard'
      const redirect = searchParams.get('redirect') || defaultPath
      router.push(redirect)
    } catch (err) {
      const message = err.response?.data?.error || 'Invalid email or password'
      toast.error(message)
      setRecaptchaToken(null)
      setRecaptchaKey((k) => k + 1)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-primary/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4">
              <Home className="w-7 h-7 text-white" />
            </div>
            <CardTitle className="text-2xl">{COMPANY_NAME}</CardTitle>
            <CardDescription>Sign in to your admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  autoComplete="email"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    {...register('password')}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-center [&>div]:origin-top [&>div]:scale-[0.85] [&>div]:sm:scale-100 h-15.5 sm:h-19.5">
                  <ReCAPTCHA
                    key={recaptchaKey}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={(token) => {
                      setRecaptchaToken(token)
                      if (token) setRecaptchaError('')
                    }}
                    onExpired={() => setRecaptchaToken(null)}
                  />
                </div>
                {recaptchaError && (
                  <p className="text-sm text-destructive text-center">{recaptchaError}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                <Lock className="w-4 h-4 mr-2" />
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
