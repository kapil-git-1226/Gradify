import { Router } from "express";
import { signupuser,loginfunc } from "./../controller/user.controller.js";
const router = Router()
router.route("/sign-up").post(signupuser)
router.route("/log-in").post(loginfunc)
export default router