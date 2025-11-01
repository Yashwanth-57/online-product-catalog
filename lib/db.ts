import mongoose from "mongoose";

let isConnected = false; // Track connection state

export const connectToDB = async () => {
  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    const uri = process.env.MONGODB_URI!;
    if (!uri) throw new Error("❌ MONGODB_URI is missing in .env file");

    await mongoose.connect(uri);
    isConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
};
