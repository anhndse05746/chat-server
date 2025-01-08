import mongoose from 'mongoose';
import config from '../config/config';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI as string, {
      dbName: config.DB_NAME,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
