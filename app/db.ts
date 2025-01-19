import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

let cachedConnection: typeof mongoose | null = null;

export default async function connectDB() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    cachedConnection = await mongoose.connect(MONGODB_URI as string, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      maxPoolSize: 10
    });
    console.log('Connected to MongoDB');
    return cachedConnection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}
