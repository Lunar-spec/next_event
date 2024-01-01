import mongoose from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL;

let cached = (global as any).mongoose || { conn: null, promise: null }

export const connectToDb = async () => {
    if (cached.conn) return cached.conn;

    console.log('running');
    

    if (!MONGODB_URL) throw new Error('MONGO_URL MISSING')

    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
        dbName: 'ArcTic',
        bufferCommands: false
    })

    cached.conn = await cached.promise;

    return cached.conn;
}