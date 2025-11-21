import { Router } from "express";
import { fetchCurrentSong, getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controller/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router()

router.get('/',protectRoute,getAllSongs)
router.get('/featured',getFeaturedSongs)
router.get('/made-for-you',getMadeForYouSongs)
router.get('/trending',getTrendingSongs)
router.get('/:songId',fetchCurrentSong)

export default router

