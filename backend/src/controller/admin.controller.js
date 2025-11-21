import { Album } from "../models/album.model.js"
import { Song } from "../models/song.model.js"
import cloudinary from "../lib/cloudinary.js"
import { clerkClient } from "@clerk/express"

//helper function for cloudinary upload
const uploadToCloudinary=async(file)=>{
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath,{
      resource_type:"auto"
    })
    return result.secure_url
  } catch (error) {
    console.log("error in uploadToCloudinary",error)
    throw new Error("Error in uploading to cloudinary")
  }
}

export const createSong = async(req,res,next)=>{
  try {
    if(!req.files || !req.files.audioFile || !req.files.imageFile){
      return res.status(400).json({message:"Please provide all needed files"})
    }
    const {title,artist,duration,albumId} = req.body

    const audioFile = req.files.audioFile
    const imageFile = req.files.imageFile

    const audioUrl = await uploadToCloudinary(audioFile)
    const imageUrl = await uploadToCloudinary(imageFile)

    const newSong = await Song.create({
      title,artist,audioUrl,imageUrl,duration,albumId: albumId || null
    })
    
    //if albumId exist, update the album by adding the song to the album
    if(albumId){
      await Album.findByIdAndUpdate(albumId,{
        $push:{songs:newSong._id}
      })
    }
    res.status(201).json(newSong)
  } catch (error) {
    console.log("Error in createSong controller",error)
    next(error)
  }
}

export const deleteSong = async(req,res,next)=>{
  const {id:songId} = req.params
  try {
    const song = await Song.findById(songId)
    if(!song) return res.status(404).json({message:"Song not found"})
    if(song.albumId){
     await Album.findByIdAndUpdate(song.albumId,{
        $pull:{songs:songId}
      })
    }
    await Song.findByIdAndDelete(songId)
    res.status(200).json({message:"Song deleted"})
  } catch (error) {
    console.log("Error in deleteSong controller",error)
    next(error)
  }
}

export const createAlbum = async(req,res,next)=>{
  try {
    const {title,artist,releaseYear} = req.body
    if(!req.files.imageFile) return res.status(400).json({message:"Please Provide image file"})
    const imageUrl = await uploadToCloudinary(req.files.imageFile)

    const newAlbum = new Album({
      title,artist,releaseYear,imageUrl
    })
    await newAlbum.save()
    res.status(200).json(newAlbum)
  } catch (error) {
    console.log("Error in createAlbum",error)
    next(error)
  }
}

export const deleteAlbum = async(req,res,next)=>{
  const {id:albumId} = req.params
  try {
    const album = await Album.findById(albumId)
    if(!album) return res.status(404).json({message:"Album not found"})

    //delete all the songs in the album
    await Song.deleteMany({albumId})

    await Album.findByIdAndDelete(albumId)

    res.status(200).json({message:"Album deleted successfully"})

  } catch (error) {
    console.log("Error in deleteAlbum",error)
    next(error)
  }
}

export const checkAdmin = async(req,res)=>{
  return res.status(200).json({admin:true})
}