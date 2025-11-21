import { axiosInstance } from "@/lib/axios"
import { useAuth } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import { Loader } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";


const AuthProvider = ({children} : {children:React.ReactNode}) => {
  const {getToken,userId} = useAuth()
  const [loading,setLoading] = useState(true)
  const {checkAdminStatus} = useAuthStore()
  const {initSocket,disconnectSocket} = useChatStore()

  const updateApiToken = (token : string | null)=>{
    // kalo ada token, kasih cookies nya, kalo token nya null berarti user belum authenticated
    if(token){
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }else{
      delete axiosInstance.defaults.headers.common['Authorization']
    }
  }

  useEffect(()=>{
    const initAuth = async()=>{
      try {
        const token = await getToken()
        updateApiToken(token)
        if(token)  {
          await checkAdminStatus()
          if(userId) initSocket(userId)
        }
      } catch (error) {
        updateApiToken(null)
        console.log("Error in auth provider",error)
      }finally{
        setLoading(false)
      }
    }
    initAuth()

    //cleanup
    return ()=>disconnectSocket()
  },[getToken,userId,checkAdminStatus,initSocket,disconnectSocket])

  if (loading)
		return (
			<div className='h-screen w-full flex items-center justify-center'>
				<Loader className='size-8 text-emerald-500 animate-spin' />
			</div>
		);

  return (
    <div>{children}</div>
  )
}

export default AuthProvider