import { clerkClient } from "@clerk/express";

export const protectRoute = async(req,res,next)=>{
  console.log(req)
  if(!req.auth.userId){
    return res.status(401).json({message:"Unauthorized"})
  }
  next()
}

export const requireAdmin = async(req,res,next)=>{
  const currentUser = await clerkClient.users.getUser(req.auth.userId) //get current clerk user
  const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress //check if admin email in .env is equal to currentUser email
  if(!isAdmin){
    return res.status(403).json({message:"Unauthorized - You are not an admin"})
  }
  next()
}