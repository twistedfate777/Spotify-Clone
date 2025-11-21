import { User } from "../models/user.model.js"

export const syncUser = async(req,res,next)=>{
  try {
    const {id,firstName,lastName,imageUrl} = req.body //get Data from clerk

    //check if user already exist
    const userAlreadyExist = await User.findOne({
      clerkId:id
    })

    if(!userAlreadyExist){
      await User.create({
        clerkId:id,
        fullName:`${firstName || ""}${lastName || ""}`.trim(),
        imageUrl
      })}

    res.status(200).json({success:true})

  } catch (error) {
    console.log("error in SyncUser",error)
    next(error)
  }
}