
import { axiosInstance } from "@/lib/axios"
import type { Album, Song, Stats } from "@/types"
import toast from "react-hot-toast"
import {create} from "zustand"

interface MusicStore{
  songs : Song[]
  albums : Album[]
  currentAlbum : Album | null
  isLoading:boolean
  error: null | string
  madeForYouSongs : Song[]
  trendingSongs : Song[]
  featuredSongs : Song[]
  stats : Stats,
  currentSongData : Song | null //song data for song page

  fetchCurrentSongData : (songId:string)=>Promise<void>
  fetchAlbums : ()=>Promise<void>
  fetchAlbumById : (albumId:string)=>Promise<void>
  fetchMadeForYouSongs : ()=>Promise<void>
  fetchTrendingSongs : ()=>Promise<void>
  fetchFeaturedSongs : ()=>Promise<void>
  fetchStats : ()=>Promise<void>
  fetchSongs : ()=>Promise<void>
  deleteSong : (songId:string)=>Promise<void>
  deleteAlbum : (albumId:string)=>Promise<void>
}

export const useMusicStore = create<MusicStore>((set,get)=>({
  albums : [],
  songs : [],
  currentAlbum : null,
  isLoading : false,
  error : null,
  stats:{
    totalSongs:0,
    totalAlbums:0,
    totalArtists:0,
    totalUsers:0
  },
  currentSongData : null,
  fetchCurrentSongData : async(songId)=>{
    set({isLoading:true})
    try {
      const res = await axiosInstance.get(`/song/${songId}`)
      set({currentSongData:res.data})
    } catch (error:any) {
      console.log("Error in fetchCurrentSongData",error.response?.data?.error)
      set({error:error.response?.data?.error})
    }finally{
      set({isLoading:false})
    }
  },
  fetchAlbums : async()=>{
    set({isLoading:true,error:null})
    try {
      const res = await axiosInstance.get('/album')
      set({albums:res.data})
    } catch (error:any) {
      console.log("error in fetchAlbums",error)
      set({error:error.res?.data?.message})
    }finally{
      set({isLoading:false})
    }
  },
  fetchAlbumById: async(albumId)=>{
    set({isLoading:true,error:null})
    try {
      const res = await axiosInstance.get(`/album/${albumId}`)
      set({currentAlbum : res.data})
    } catch (error:any) {
      console.log("Error in fetchAlbumById",error.response)
      set({error:error.res?.data?.message})
    }finally{
      set({isLoading:false})
    }
  },
  madeForYouSongs:[],
  trendingSongs:[],
  featuredSongs:[],
  fetchMadeForYouSongs:async()=>{
    set({isLoading:true})
    try {
      const res = await axiosInstance.get('/song/made-for-you')
      set({madeForYouSongs:res.data})
    } catch (error:any) {
      console.log("Error in fetchMadeForYouSongs",error.response?.data?.error)
      set({error:error.response?.data?.error})
    }finally{
      set({isLoading:false})
    }
  },
  fetchTrendingSongs:async()=>{
    set({isLoading:true})
    try {
      const res = await axiosInstance.get('/song/trending')
      set({trendingSongs:res.data})
    } catch (error:any) {
      console.log("Error in fetchTrendingSongs",error.response?.data?.error)
      set({error:error.response?.data?.error})
    }finally{
      set({isLoading:false})
    }
  },
  fetchFeaturedSongs:async()=>{
    set({isLoading:true})
    try {
      const res = await axiosInstance.get('/song/featured')
      set({featuredSongs:res.data})
    } catch (error:any) {
      console.log("Error in fetchFeaturedSongs",error.response?.data?.error)
      set({error:error.response?.data?.error})
    }finally{
      set({isLoading:false})
    }
  },
  fetchSongs:async()=>{
    set({isLoading:true})
    try {
      const res = await axiosInstance.get('/song')
      set({songs:res.data})
    } catch (error:any) {
      console.log("Error in fetchSongs",error.response?.data?.error)
      set({error:error.response?.data?.error})
    }finally{
      set({isLoading:false})
    }
  },
  fetchStats:async()=>{
    set({isLoading:true})
    try {
      const res = await axiosInstance.get('/stats')
      set({stats : res.data})
    } catch (error:any) {
      console.log("Error in fetchStats",error.response?.data?.error)
      set({error:error.response?.data?.error})
    }finally{
      set({isLoading:false})
    }
  },
  deleteSong:async(songId)=>{
    set({isLoading:true})
    try {
      await axiosInstance.delete(`/admin/songs/${songId}`)
      //refetch the data to update ui after deleting
      get().fetchSongs()
      get().fetchStats()
      toast.success("Song deleted successfully")
    } catch (error:any) {
      console.log("Error in deleteSong",error.response?.data?.error)
      set({error:error.response?.data?.error})
    }finally{
      set({isLoading:false})
    }
  },
  deleteAlbum:async(albumId)=>{
    set({isLoading:true})
    try {
      await axiosInstance.delete(`/admin/albums/${albumId}`);
			set((state) => ({
				albums: state.albums.filter((album) => album._id !== albumId),
				songs: state.songs.map((song) =>
					song.albumId === state.albums.find((album) => album._id === albumId)?.title ? { ...song, album: null } : song
				),
			}));
      get().fetchStats()
			toast.success("Album deleted successfully");
    } catch (error:any) {
      console.log("Error in deleteAlbum",error.response?.data?.error)
      set({error:error.response?.data?.error})
    }finally{
      set({isLoading:false})
    }
  }
}))