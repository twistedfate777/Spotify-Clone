import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { axiosInstance } from '@/lib/axios'
import { useMusicStore } from '@/stores/useMusicStore'
import { Plus, Upload } from 'lucide-react'
import {  useRef, useState } from 'react'
import toast from 'react-hot-toast'

const AddAlbumDialog = () => {
  const {fetchAlbums,fetchStats} = useMusicStore()
  const [albumDialogOpen,setAlbumDialogOpen] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [newAlbum,setNewAlbum] = useState({
    title:"",
    artist:"",
    releaseYear: new Date().getFullYear().toString()
  })
  const [image,setImage] = useState<File | null>(null)
  const imageRef = useRef<HTMLInputElement>(null)
  const handleSubmit = async()=>{
    setIsLoading(true)
    try {
      const formData = new FormData()
      if(!image || newAlbum.title.length==0 || newAlbum.artist.length==0 || newAlbum.releaseYear.length==0){
        toast.error("Please fill in all fields")
        return
      }
      formData.append("title",newAlbum.title)
      formData.append("artist",newAlbum.artist)
      formData.append("releaseYear",newAlbum.releaseYear)
      formData.append("imageFile",image)

      await axiosInstance.post('/admin/albums',formData,{
        headers:{"Content-Type":"multipart/form-data"}
      })

      setNewAlbum({
        title:"",
        artist:"",
        releaseYear: new Date().getFullYear().toString()
      })
      setImage(null)
      fetchAlbums()
      fetchStats()
      toast.success("Album added successfully")
      setAlbumDialogOpen(false)
    } catch (error) {
      console.log("Error in addingAlbum",error)
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <Dialog open={albumDialogOpen} onOpenChange={setAlbumDialogOpen}>
      <DialogTrigger asChild>
        <Button className='bg-emerald-500 hover:bg-emerald-600 text-white'>
          <Plus/>
          Add Album
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto '>
        <DialogHeader>
          <DialogTitle className='text-white'>
            Add new Albums
          </DialogTitle>
          <DialogDescription>
            Add new albums to your library
          </DialogDescription>
        </DialogHeader>
        <div>
          <input 
          type='file' accept='image/*'
          className='hidden'
          ref={imageRef}
          onChange={(e)=>{
            setImage(e.target.files![0])
          }}
          />
        </div>
        <div
						className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer mb-4'
						onClick={() => imageRef.current?.click()}
					>
						<div className='text-center'>
							{image ? (
								<div className='space-y-2'>
									<div className='text-sm text-emerald-500'>Image selected:</div>
									<div className='text-xs text-zinc-400'>{image.name.slice(0, 20)}</div>
								</div>
							) : (
								<>
									<div className='p-3 bg-zinc-800 rounded-full inline-block mb-2'>
										<Upload className='h-6 w-6 text-zinc-400' />
									</div>
									<div className='text-sm text-zinc-400 mb-2 '>Upload artwork</div>
									<Button variant='outline' size='sm' className='text-xs'>
										Choose File
									</Button>
								</>
							)}
						</div>
					</div>
          <div className='text-white flex flex-col gap-3'>
            <label>
              Title
            </label>
            <Input
              onChange={(e)=>setNewAlbum({...newAlbum,title : e.target.value})}
              className='border-zinc-500/50'
            />
            <label>
              Artist
            </label>
            <Input
              onChange={(e)=>setNewAlbum({...newAlbum,artist:e.target.value})}
              className='border-zinc-500/50'
            />
            <label>
              Release Year
            </label>
            <Input
              onChange={(e)=>setNewAlbum({...newAlbum,releaseYear : e.target.value})}
              type='number'
              value={newAlbum.releaseYear}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit} disabled={isLoading} >
              {isLoading ? 'Creating...' : "Add Album" }
            </Button>
            <DialogClose asChild>
              <Button variant={"secondary"} disabled={isLoading} >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddAlbumDialog