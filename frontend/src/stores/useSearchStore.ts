import {create} from "zustand"

interface searchStore {
  searchInput : string
  setSearchInput : (value:string)=>void
}

export const useSearchStore =create<searchStore>((set)=>({
  searchInput : "",
  setSearchInput : (value) => set({searchInput : value})
}))