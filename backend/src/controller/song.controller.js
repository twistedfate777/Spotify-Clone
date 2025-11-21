import { Song } from "../models/song.model.js"

export const getAllSongs = async(req,res,next)=>{
  try {
    //sort the songs from the latest
    const songs = await Song.find().sort({createdAt:-1})
    res.status(200).json(songs)
  } catch (error) {
    console.log("Error in getAllSongs controller",error)
    next(error)
  }
}

export const getFeaturedSongs = async(req,res,next)=>{
  try {
    //fetch 6 random songs, ( project mirip kaya populate , 1 => true)
    const songs = await Song.aggregate([
      {
        $sample:{size:6}
      },
      {
        $project:{
          _id:1,
          title:1,
          artist:1,
          imageUrl:1,
          audioUrl:1
        }
      }
    ])

    res.json(songs)
  } catch (error) {
    console.log("Error in getFeaturedSongs controller",error)
    next(error)
  }
}

export const getMadeForYouSongs = async(req,res,next)=>{
  try {
    //fetch 4 random songs, ( project mirip kaya populate , 1 => true)
    const songs = await Song.aggregate([
      {
        $sample:{size:4}
      },
      {
        $project:{
          _id:1,
          title:1,
          artist:1,
          imageUrl:1,
          audioUrl:1
        }
      }
    ])
    res.status(200).json(songs)
  } catch (error) {
    console.log("Error in getMadeForYouSongs controller",error)
    next(error)
  }
}

export const getTrendingSongs = async(req,res,next)=>{
  try {
    //fetch 4 random songs, ( project mirip kaya populate , 1 => true)
    const songs = await Song.aggregate([
      {
        $sample:{size:4}
      },
      {
        $project:{
          _id:1,
          title:1,
          artist:1,
          imageUrl:1,
          audioUrl:1
        }
      }
    ])
    res.status(200).json(songs)
  } catch (error) {
    console.log("Error in getTrendingSongs controller",error)
    next(error)
  }
}

export const fetchCurrentSong = async(req,res,next)=>{
  const {songId} = req.params
  try {
    const song = await Song.findById(songId)
    res.status(200).json(song)
  } catch (error) {
    console.log("Error in fetchCurrentSong",error)
    next(error)
  }
}