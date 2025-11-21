import FeaturedGridSkeleton from '@/components/skeletons/FeaturedGridSkeleton'
import { Button } from '@/components/ui/button'
import { useMusicStore } from '@/stores/useMusicStore'
import { usePlayerStore } from '@/stores/usePlayerStore'
import type { Song } from '@/types'
import { Pause, Play } from 'lucide-react'

const FeaturedSection = () => {
  const {isLoading,error,featuredSongs} = useMusicStore()
	const {setCurrentSong,togglePlay,isPlaying,currentSong} = usePlayerStore()

  if(isLoading) return <FeaturedGridSkeleton/>

  if (error) return <p className='text-red-500 mb-4 text-lg'>{error}</p>;

	const handlePlaySong = (song:Song)=>{
		// if a song is playing and we clicked it, pause the song
		//else if no song is playing and we click a song, play it. or if we are currently playing a song and we clicked another song, play it
		if(isPlaying && song._id == currentSong?._id) togglePlay()
		else setCurrentSong(song)
	}

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
			{featuredSongs.map((song) => (
				<div
					key={song._id}
					className='flex items-center bg-zinc-800/50 rounded-md overflow-hidden
         hover:bg-zinc-700/50 transition-colors group cursor-pointer relative'
				 onClick={()=>handlePlaySong(song)}
				>
					<img
						src={song.imageUrl}
						alt={song.title}
						className='w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0'
					/>
					<div className='flex-1 p-4'>
						<p className='font-medium truncate'>{song.title}</p>
						<p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
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
  )
}

export default FeaturedSection