import { ScrollArea } from '@/components/ui/scroll-area'
import { useMusicStore } from '@/stores/useMusicStore'
import { useEffect} from 'react'
import {useParams } from 'react-router-dom'
import { formatDuration } from '../album/AlbumPage'
import {Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePlayerStore } from '@/stores/usePlayerStore'

const Song = () => {
  const {songId} = useParams()
  const {currentSongData,fetchCurrentSongData} = useMusicStore()
  const {setCurrentSong,isPlaying,togglePlay,currentSong} = usePlayerStore()

  
  const gradientFromList = ["#4D4D4D","#5F0000","#005F0C","#5F001D","#5F3E00","#5F0046"]

  const gradientFromColor = gradientFromList[Math.floor(Math.random() * 7)]

  useEffect(()=>{
    if(songId) fetchCurrentSongData(songId)
  },[songId,fetchCurrentSongData])

  const handlePlaySong = ()=>{
    if(isPlaying && currentSong!=currentSongData) setCurrentSong(currentSongData)
    else togglePlay()
  }


  if(!currentSongData) return <div>Song not found</div>
  return (
    
    <ScrollArea className={`h-full px-10 py-12 flex flex-col justify-center items-center `} style={{
    background: `linear-gradient(to bottom, ${gradientFromColor}, #000000)`
  }}>
    {/* we use css style not tailwind because Tailwind needs to see the exact class names (like from-[#2A7B9B]) at build time to include them*/}
      <div className='flex justify-center items-center mb-10 '>
        <img src={currentSongData.imageUrl} className='size-80 object-cover rounded-xl'/>
      </div>
      <div className="text-3xl font-semibold flex justify-center mb-5">
        <h1>{currentSongData.title} By {currentSongData.artist} </h1>
      </div>
      <div className='flex justify-center w-full text-xl font-semibold mb-4'>
        <h1>Released {currentSongData.createdAt.split("T")[0]}</h1>
      </div>
      <div className='flex justify-center items-center'>
        <Button onClick={handlePlaySong}>
          <Play className='size-6'/>
          Play Song : ({formatDuration(currentSongData.duration)})
        </Button>
        <h1></h1>
      </div>
    </ScrollArea>
  )
}

export default Song