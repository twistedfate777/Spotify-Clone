import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useChatStore } from '@/stores/useChatStore'

const ChatHeader = () => {
  const {selectedUser,onlineUsers} = useChatStore()
  
  if(!selectedUser) return null

  return (
    <div className='flex px-4 py-2 gap-2 border-b border-zinc-800'>
      <Avatar className='size-12'>
        <AvatarImage src={selectedUser.imageUrl} />
        <AvatarFallback>
          {selectedUser.fullName}
        </AvatarFallback>
      </Avatar>
      <div>
        <div>{selectedUser.fullName}</div>
        <div className='text-zinc-500'>{onlineUsers.has(selectedUser.clerkId) ? "Online" : "Offline"}</div>
      </div>
    </div>
  )
}

export default ChatHeader