import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI environment variable is not set.\n' +
      '  Create backend/.env and add your MongoDB Atlas connection string.\n' +
      '  See backend/.env.example for the required format.'
    )
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    })
    console.log('✓ MongoDB connected successfully')
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error.message)
    throw error
  }
}

export async function disconnectDB() {
  await mongoose.connection.close()
  console.log('✓ MongoDB connection closed.')
}

export default mongoose
