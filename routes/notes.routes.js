import {Router} from "express";
import { getnotesfunc } from "../controller/notes.controller.js";
const router = Router()
router.route("/getnotes").get(getnotesfunc)
export default router