import mongoose from 'mongoose';

// Force Mock Mode: Return null immediately to skip all MongoDB logic
// This ensures the app works without any database on Vercel or locally
async function connectDB() {
    console.log("Mock Mode: Skipping MongoDB connection");
    return null;
}

export default connectDB; 