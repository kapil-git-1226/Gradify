import express from "express"
import cors from "cors"
const app = express()
app.use (cors({
    origin: "*",
    credentials: true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
import noterouter from "./routes/notes.routes.js"
app.use("/api/notes",noterouter)
import pyqsrouter from "./routes/pyqs.router.js"
app.use("/api/pyqs",pyqsrouter)
export {app}