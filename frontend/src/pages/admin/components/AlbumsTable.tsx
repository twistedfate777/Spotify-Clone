
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useMusicStore } from '@/stores/useMusicStore'
import { Calendar, Trash2 } from 'lucide-react'

const AlbumsTable = () => {
  const {albums,deleteAlbum} = useMusicStore()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Title
          </TableHead>
          <TableHead>
            Artist
          </TableHead>
          <TableHead>
            Release Date
          </TableHead>
          <TableHead className='text-end'>
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {albums.map((album)=>(
          <TableRow  className='border-b-zinc-600 hover:bg-zinc-800/50' key={album._id}>
            <TableCell className='flex gap-2 items-center font-semibold  text-lg '>
              <img src={album.imageUrl} className='size-12 rounded' />
              {album.title}
            </TableCell>
            <TableCell>
              {album.artist}
            </TableCell>
              <TableCell>
                <span className='inline-flex items-center gap-1 text-zinc-400'>
                  <Calendar className='size-4'/>
                  {album.releaseYear}
                </span>
              </TableCell>
            <TableCell >
              <div className='flex justify-end'>
                <Button variant={"ghost"} onClick={()=>deleteAlbum(album._id)} className='text-red-400 hover:text-red-300 hover:bg-red-400/10'>
                <Trash2 className='size-4'/>
              </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default AlbumsTable