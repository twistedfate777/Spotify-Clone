import Topbar from '@/components/Topbar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useMusicStore } from '@/stores/useMusicStore'
import { useSearchStore } from '@/stores/useSearchStore'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Search = () => {
  const {songs,fetchSongs} = useMusicStore()
  const {searchInput} = useSearchStore()
  useEffect(()=>{
    fetchSongs()
  },[fetchSongs])

  const filteredSongs = songs.filter((song)=>(song.title.toLowerCase().indexOf(searchInput.toLowerCase())!=-1))
  return (
    <ScrollArea className='h-full'>
      <Topbar/>
      <div className='grid grid-cols-3 '>
        {filteredSongs.map((song)=>(
          <Link key={song._id} className='hover:scale-105 cursor-pointer transition-all flex flex-col items-center mb-2' to={`${song._id}`}>
            <div>
              <img src={song.imageUrl} className='size-40 lg:size-72'/>
            </div>
            <div>
              {song.title}
            </div>
          </Link>
        ))}
      </div>
    </ScrollArea>
  )
}

export default Search