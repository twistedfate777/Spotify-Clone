import { Router } from "express";
import { getAlbumById, getAlbums } from "../controller/album.controller.js";

const router = Router()

router.get('/',getAlbums)
router.get('/:id',getAlbumById)

export default router

