
import SectionGridSkeleton from '@/components/skeletons/SectionGridSkeleton'
import { usePlayerStore } from '@/stores/usePlayerStore'
import type { Song } from '@/types'
import { Button } from '@/components/ui/button'
import { Pause, Play } from 'lucide-react'


const SectionGrid = ({title,songs,isLoading}:{title:string,songs:Song[],isLoading:boolean}) => {
  const {setCurrentSong,isPlaying,currentSong,togglePlay} = usePlayerStore()

  const handlePlaySong = (song:Song)=>{
   // if a song is playing and we clicked it, pause the song
		//else if no song is playing and we click a song, play it. or if we are currently playing a song and we clicked another song, play it
		if(isPlaying && song._id == currentSong?._id) togglePlay()
		else setCurrentSong(song)
  }

  if(isLoading) return <SectionGridSkeleton/>
  return (
    <div className='flex h-full w-full flex-col'>
      <h1 className='font-bold text-2xl lg:text-3xl mb-6'>{title}</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2   gap-4'>
        {songs.map((song)=>(
          <div key={song._id} className='flex group gap-4 hover:bg-zinc-700/50 bg-zinc-800/50 cursor-pointer py-2 rounded-lg relative' onClick={()=>handlePlaySong(song)}>
            <img src={song.imageUrl} alt='song-image' className='size-16 sm:size-20 flex-shrink-0 object-cover'/>
            <div className='h-full flex flex-col justify-center'>
              <p>{song.title}</p>
              <p className='text-gray-400'>{song.artist}</p>
            </div>
            <Button className={`absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all size-8 
				opacity-0 translate-y-2 group-hover:translate-y-0 ${
					song._id == currentSong?._id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
				}`}>
					{(song._id == currentSong?._id) && isPlaying ? <Pause className='size-5 text-black'/> : <Play className='size-5 text-black'/>}
				</Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionGrid