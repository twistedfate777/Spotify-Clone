import { usePlayerStore } from '@/stores/usePlayerStore'
import { useEffect, useRef } from 'react'

const AudioPlayer = () => {
  const {currentSong,isPlaying,playNext} = usePlayerStore()
  const audioRef = useRef<HTMLAudioElement>(null)
  const prevSongRef = useRef<string | null>(null)

  //handle play/pause logic
  useEffect(()=>{
    if(isPlaying) audioRef.current?.play()
    else audioRef.current?.pause()
  },[isPlaying])

  // handle when song ends
  useEffect(()=>{
    const audio = audioRef.current

    //once the song finishes, play the next song using playNext function
    audio?.addEventListener("ended",playNext)

    //return for more optimised code (useEffect cleanup)
    return ()=>audio?.removeEventListener("ended",playNext)
  },[playNext])

  //handle song changes
  useEffect(()=>{
    const audio = audioRef.current
    if(!audio || !currentSong) return

    //check if this is actually a new song
    const isSongChanged = prevSongRef.current !== currentSong?.audioUrl

    //if new song
    if(isSongChanged){
      audio.src = currentSong?.audioUrl,
      //reset the song duration
      audio.currentTime = 0
      prevSongRef.current = currentSong?.audioUrl

      if(isPlaying) audio.play()
    }
  },[currentSong,isPlaying])

  return (
    <audio ref={audioRef} />
  )
}

export default AudioPlayer