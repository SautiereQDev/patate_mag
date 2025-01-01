import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGO_URI;
  if (!uri)
    throw new Error('MongoDB URI not defined in environment variables.');

  try {
    mongoose.connection.on('error', (error) => {
      console.error('Error connecting to MongoDB:', error);
    });
    mongoose.connection.on('disconnected', () => {
      console.log('Disconnected from MongoDB');
    });
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });
    mongoose.set({ sanitizeFilter: true, strictQuery: true });
    await mongoose.connect(uri);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
