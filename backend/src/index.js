import 'dotenv/config'
import app from './app.js'
import { connectDB, disconnectDB } from './config/db.js'
import { autoSeed } from './seed.js'

const PORT = process.env.PORT || 5000

async function main() {
  // Connect to MongoDB
  try {
    await connectDB()
  } catch (error) {
    console.error('✗ Database connection failed:', error.message)
    process.exit(1)
  }

  // Seed database if empty (first run)
  try {
    await autoSeed()
  } catch (error) {
    console.error('⚠ Auto-seed failed (non-fatal):', error.message)
  }

  const server = app.listen(PORT, () => {
    console.log(`✓ Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`)
    console.log(`  Health check: http://localhost:${PORT}/api/health`)
  })

  // Graceful shutdown
  const shutdown = async (signal) => {
    console.log(`\n${signal} received. Shutting down gracefully...`)
    server.close(async () => {
      await disconnectDB()
      process.exit(0)
    })
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))

  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason)
  })
}

main()
