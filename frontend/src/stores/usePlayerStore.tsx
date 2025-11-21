import type { Song } from '@/types'
import {create} from 'zustand'
import { useChatStore } from './useChatStore'


interface PlayerStore{
  currentSong : Song | null
  isPlaying: boolean
  queue:Song[]
  currentIndex : number

  initializeQueue : (songs:Song[])=>Promise<void>
  playAlbum : (songs:Song[] , startIndex?:number)=>Promise<void>
  setCurrentSong : (song:Song | null)=>Promise<void>
  togglePlay : ()=>void
  playNext : ()=>void
  playPrevious : ()=>void
}

export const usePlayerStore = create<PlayerStore>((set,get)=>({
  currentSong : null,
  isPlaying:false,
  queue:[],
  currentIndex : -1,
  initializeQueue:async(songs)=>{
    set({
      queue:songs,
      currentSong:get().currentSong || songs[0] /* get the current song, if null set the currentSong to the first song in the queue */,
      currentIndex:get().currentIndex === -1 ? 0 : get().currentIndex //if the currentIndex equal to -1, set it to 0 if not, just get the current currentIndex,
    })
  },
  playAlbum:async(songs,startIndex=0)=>{
    //if startIndex is not provided, set it to zero
    if(!songs) return
    if(songs.length === 0 ) return

    const song =songs[startIndex]

    const socket = useChatStore.getState().socket
    if(socket.auth){
      socket.emit("update_activity",{
        userId : socket.auth.userId,
        activity : `Playing ${song.title} By ${song.artist}`
      })
    }

    set({
      isPlaying:true,
      queue:songs,
      currentSong:song,
      currentIndex : startIndex
    })
  },
  setCurrentSong:async(song)=>{
    if(!song)return

    const socket = useChatStore.getState().socket
    if(socket.auth){
      socket.emit("update_activity",{
        userId : socket.auth.userId,
        activity : `Playing ${song.title} By ${song.artist}`
      })
    }

    const songIndex = get().queue.findIndex(s=>s._id===song._id) //get the songIndex from queue

    set({
      isPlaying:true,
      currentSong:song,
      currentIndex:songIndex!== -1 ? songIndex : get().currentIndex
    })
  },
  togglePlay:()=>{
    const currentSong = get().currentSong
    const socket = useChatStore.getState().socket

    set({
      isPlaying:!get().isPlaying
    })

    if(socket.auth){
      socket.emit("update_activity",{
        userId : socket.auth.userId,
        activity : `${get().isPlaying ? `Playing ${currentSong?.title} By ${currentSong?.artist}` : "Idle"}`
      })
    }
  },
  playNext:()=>{
    const {currentIndex,queue} = get()
    const nextIndex = currentIndex+1
    //if there is next song lets play it
    if(nextIndex < queue.length){
      const socket = useChatStore.getState().socket
      if(socket.auth){
        socket.emit("update_activity",{
          userId : socket.auth.userId,
          activity : `Playing ${queue[nextIndex].title} By ${queue[nextIndex].artist}`
        })
      }
      set({
        isPlaying:true,
        currentIndex:nextIndex,
        currentSong:queue[nextIndex]
      })
      //if not, stop playing the song
    }else{
      set({isPlaying:false})
      const socket = useChatStore.getState().socket
      if(socket.auth){
        socket.emit("update_activity",{
          userId : socket.auth.userId,
          activity : `Idle`
        })
      }
    }
  },
  playPrevious:()=>{
    const {currentIndex,queue} = get()
    const prevIndex = currentIndex - 1
    if(prevIndex >= 0){
      const socket = useChatStore.getState().socket
      if(socket.auth){
        socket.emit("update_activity",{
          userId : socket.auth.userId,
          activity : `Playing ${queue[prevIndex].title} By ${queue[prevIndex].artist}`
        })
      }
      set({
        isPlaying:true,
        currentIndex:prevIndex,
        currentSong:queue[prevIndex]
      })
    }else{
      set({isPlaying:false})
      const socket = useChatStore.getState().socket
      if(socket.auth){
        socket.emit("update_activity",{
          userId : socket.auth.userId,
          activity : `Idle`
        })
      }
    }
  }
}))