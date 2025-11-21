import { Message } from "../models/message.model.js"
import { User } from "../models/user.model.js"

export const getAllUsers = async(req,res,next)=>{
  try {
    const currentUserId = req.auth.userId
    //get all users except current user
    const users = await User.find({
      clerkId : {$ne : currentUserId}
    })
    res.status(200).json(users)
  } catch (error) {
    console.log("Error in getAllUsers controller",error)
    next(error)
  }
}

export const getMessages = async(req,res,next)=>{
  try {
    const myId = req.auth.userId
  const {userId} = req.params

  const messages = await Message.find({
    $or : [
      {senderId : myId ,receiverId : userId},
      {senderId : userId, receiverId : myId}
    ]
  }).sort({createdAt : 1})

    res.status(200).json(messages)
  } catch (error) {
    next(error)
  }
}