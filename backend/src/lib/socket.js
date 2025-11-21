import {Server} from 'socket.io'
import { Message } from '../models/message.model.js'

export const initializeSocket=(server)=>{
  const io = new Server(server,{
    cors:{
      origin : "http://localhost:3000",
      credentials:true
    }
  })

  //keep track of user online status and activity
  const userSockets = new Map() //{userId : socketId}
  const userActivities = new Map() // {userId : activities}

  io.on("connection",(socket)=>{

    //listening for user_connected event (user will pass their userId when they sign in)
    socket.on("user_connected",(userId)=>{
      userSockets.set(userId,socket.id)
      userActivities.set(userId,"Idle")

      //once the user connected, we will let everyone know that the user is connected
      //io.emit makes server send event to client 
      io.emit("user_connected",userId)

      //send the list of online/offline users to user who just logged in and their activities

      //socket.emit makes client send event to server
      socket.emit("users_online",Array.from(userSockets.keys())) //get the key value only from the userSockets (userId), if the userId exist set them to online

      //get the user activity by sending both userId and activity
      io.emit("activities",Array.from(userActivities.entries()))
    })

    //listening to update_activity event (when we play or pause a music)
    socket.on("update_activity",({userId,activity})=>{
      userActivities.set(userId,activity)

      //broadcast this to all other users
      io.emit("activity_updated",{userId,activity})
    })

    //listening to send_message event
    socket.on("send_message",async(data)=>{
      try {
        const {senderId,receiverId,content} = data

        const message = await Message.create({
          senderId,receiverId,content
        })

        //send to receiver in realtime if they are online
        const receiverSocketId = userSockets.get(receiverId)
        if(receiverSocketId){
          //send an event specifically for that user
          io.to(receiverSocketId).emit("receive_message",message)
        }

        //send to sender, so they can update their ui
        socket.emit("message_sent",message)
      } catch (error) {
        console.error("Message Error",error)
      }
    })

    //listening when users diconnect
    socket.on("disconnect",()=>{
      let disconnectedUserId
      //loop through each user, get the userId and socketId of the user that disconnected
      for(const[userId,socketId] of userSockets.entries()){
        //find disconnected user
        if(socketId === socket.id){
          disconnectedUserId = userId
          userSockets.delete(userId)
          userActivities.delete(userId)
          break
        }
      }
      if(disconnectedUserId){
        io.emit("user_disconnected",disconnectedUserId)
      }
    })
  })
}
