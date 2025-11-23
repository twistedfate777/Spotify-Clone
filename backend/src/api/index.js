import express from 'express'
import dotenv from 'dotenv'
import fileUpload from 'express-fileupload'
import { clerkMiddleware } from '@clerk/express'
import path from 'path'

import userRoutes from '../routes/user.route.js'
import adminRoutes from '../routes/admin.route.js'
import authRoutes from '../routes/auth.route.js'
import songRoutes from '../routes/song.route.js'
import statsRoutes from '../routes/stats.route.js'
import albumRoutes from '../routes/album.route.js'
import {connectDB} from '../lib/db.js'

import cors from "cors"
import { createServer } from 'http'
import { initializeSocket } from '../lib/socket.js'


const app = express()
const __dirname = path.resolve()
dotenv.config()

app.use(express.json())

//initializing socket io by passing our server
const httpServer = createServer(app)
initializeSocket(httpServer)

const PORT = process.env.PORT || 5000
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}))

app.use(clerkMiddleware()) //this will add auth to req object => (give access to) req.auth.userId
//when we upload a file from the client, we would like to store them in a temporary file in backend
app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:path.join(__dirname,"tmp"),
  createParentPath:true, // if the folder doesnt exist, create it
  limits:{
    fileSize: 10 * 1024 * 1024 //10mb
  }
}))

app.use('/api/user',userRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/song',songRoutes)
app.use('/api/album',albumRoutes)
app.use('/api/stats',statsRoutes)

//error handler
app.use((err, req, res, next) => {
	res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message });
});
connectDB()
export default app;
