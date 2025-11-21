import {Router} from "express"
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js"
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controller/admin.controller.js"

const router = Router()

//slightly optimised clean code
router.use(protectRoute,requireAdmin)

router.post('/songs',createSong)
router.delete('/songs/:id',deleteSong)
router.post('/albums',createAlbum)
router.delete('/albums/:id',deleteAlbum)
router.get('/check',checkAdmin)


export default router

