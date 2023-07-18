import { config } from '../config/index.js';
import mongoose from 'mongoose';

export default async function connectDB() {
    if (config.MONGODB_URI) {
        return await mongoose.connect(config.MONGODB_URI)
    } else {
        throw new Error('MONGODB_URI in config is not defined')
    }
}