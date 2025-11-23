import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL:"https://spotify-clone-bice-two.vercel.app/api"
})