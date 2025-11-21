import mongoose from 'mongoose'

export const connectDB = async()=>{
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log("Mongo DB Connected at "+conn.connection.host)
  } catch (error) {
    console.log("Failed to connect to mongodb",error)
    process.exit(1)
  }
}