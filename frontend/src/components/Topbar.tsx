import { SignedOut, UserButton} from "@clerk/clerk-react"
import { LayoutDashboardIcon, Search } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import SignInGoogleButton from "./SignInGoogleButton"
import { useAuthStore } from "@/stores/useAuthStore"
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { useEffect, useRef, useState } from "react"
import { Input } from "./ui/input"
import { useSearchStore } from "@/stores/useSearchStore"

const Topbar = () => {
  const location = useLocation()
  const currPath = location.pathname

  const searchRef = useRef<HTMLAnchorElement>(null)
  
  const {isAdmin} = useAuthStore()
  const {searchInput,setSearchInput} = useSearchStore()
  const [isMobile,setIsMobile] = useState(false)
  
    useEffect(()=>{
      const checkMobile = ()=>{
        setIsMobile(window.innerWidth < 768)
      }
      checkMobile()
      window.addEventListener("resize",checkMobile)
      return()=> window.removeEventListener("resize",checkMobile)
    },[])

    useEffect(()=>{
      if(!searchRef) return
      if(searchInput.length>0 && currPath!="/search-page") searchRef?.current?.click()
    },[searchInput])
  
  return (
    <div className="bg-zinc-900/75 flex justify-between px-2 py-4 sticky top-0 z-10">
      <Link to={'/search-page'} className="hidden" ref={searchRef}/>
      {!isMobile && <div className="flex gap-2 items-center">
        <img src="/spotify.png" className="size-8" alt="spotify-logo"/>
        Spotify
      </div>}
      <div className="flex">
        <Input
        placeholder="Search Song..."
        value={searchInput}
        onChange={(e)=>setSearchInput(e.target.value)}
        className="max-w-64 rounded-r-none border-white"
        autoFocus
      />
      <Button className="rounded-l-none  border-white" variant={"secondary"}>
        <Search/>
      </Button>
      </div>
      <div className="flex items-center justify-center gap-4">
        {isAdmin && (
          <Link to='/admin' className={cn(buttonVariants({ variant: "default" }))}>
            <LayoutDashboardIcon className="size-4 mr-2"/> 
            Admin Dashboard
          </Link>
        )}
        
        <SignedOut>
          <SignInGoogleButton/>
        </SignedOut>

        <UserButton/>
      </div>
    </div>
  )
}

export default Topbar