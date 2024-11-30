import { Router } from "express";
import { getpyqsfunc } from "./../controller/pyqs.controller.js";
const router = Router()
router.route("/getpyqs").get(getpyqsfunc)
export default router