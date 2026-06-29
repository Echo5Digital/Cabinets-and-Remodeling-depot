import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { globalRateLimiter } from './middleware/rateLimiter.js'
import { notFound } from './middleware/notFound.js'
import { errorHandler } from './middleware/errorHandler.js'

// Routes
import authRoutes from './routes/auth.routes.js'
import pagesRoutes from './routes/pages.routes.js'
import projectsRoutes from './routes/projects.routes.js'
import blogsRoutes from './routes/blogs.routes.js'
import galleryRoutes from './routes/gallery.routes.js'
import leadsRoutes from './routes/leads.routes.js'
import settingsRoutes from './routes/settings.routes.js'
import templatesRoutes from './routes/templates.routes.js'
import globalSectionsRoutes from './routes/globalSections.routes.js'
import mediaRoutes from './routes/media.routes.js'

const app = express()

// ─── Security ────────────────────────────────────────────────────────────────
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
)

// ─── CORS ────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:3001',
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error(`CORS: Origin ${origin} not allowed`))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// ─── Cookie Parsing ───────────────────────────────────────────────────────────
app.use(cookieParser())

// ─── Body Parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// ─── Logging ──────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
}

// ─── Rate Limiting ───────────────────────────────────────────────────────────
app.use(globalRateLimiter)

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  })
})

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/pages', pagesRoutes)
app.use('/api/projects', projectsRoutes)
app.use('/api/blogs', blogsRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/leads', leadsRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/templates', templatesRoutes)
app.use('/api/global-sections', globalSectionsRoutes)
app.use('/api/media', mediaRoutes)

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFound)
app.use(errorHandler)

export default app
