import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useMusicStore } from '@/stores/useMusicStore'
import { Calendar, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const SongsTable = () => {
  const {songs,deleteSong,isLoading} = useMusicStore()
  if(isLoading) return <div className='text-3xl w-full flex justify-center items-center'>Loading...</div>
  return (
    <div>
      <Table >
        <TableHeader className='text-md'>
          <TableRow >
            <TableHead>Title</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead>Release Date</TableHead>
            <TableHead className='text-end'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song)=>(
            <Link to={`/search/${song._id}`}>
              <TableRow className='border-b-zinc-600 hover:bg-zinc-800/50' key={song._id}>
                <TableCell className='flex gap-2 items-center font-semibold  text-lg  '>
                  <img src={song.imageUrl } className='size-12 rounded'/>
                  <span>{song.title}</span>
                </TableCell>
                <TableCell>
                  {song.artist}
                </TableCell>
                <TableCell>
                  <span className='inline-flex items-center gap-1 text-zinc-400'>
                    <Calendar className='size-4'/>
                    {song.createdAt.split("T")[0]}
                  </span>
                </TableCell>
                <TableCell >
                  <div className='flex justify-end'>
                    <Button variant={"ghost"} size={"sm"} className='text-red-400 hover:text-red-300 hover:bg-red-400/10' onClick={()=>deleteSong(song._id)}>
                      <Trash2 className='size-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </Link>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default SongsTable