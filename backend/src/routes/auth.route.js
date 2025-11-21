import { Router } from "express";
import { syncUser } from "../controller/auth.controller.js";

const router = Router()

router.post("/callback",syncUser)

export default router