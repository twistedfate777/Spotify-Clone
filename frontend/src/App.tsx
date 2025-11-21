import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import AuthCallback from "./pages/auth-callback/AuthCallback";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import Chat from "./pages/chat/Chat";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";
import {Toaster} from 'react-hot-toast'
import Song from "./pages/song/Song";
import Search from "./pages/search/Search";


const App = () => {

  return (
    <>
     <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/albums/:albumId" element={<AlbumPage/>}/>
          <Route path="/search-page/:songId" element={<Song/>}/>
          <Route path="search-page" element={<Search/>}/>
        </Route>
        {/* once user sign up redirect them to /auth-callback */}
        <Route path="/sso-callback"
        element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"}/>}/>
        <Route path="/auth-callback" element={<AuthCallback/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
     </Routes>
     <Toaster/>
    </>
  )
}

export default App