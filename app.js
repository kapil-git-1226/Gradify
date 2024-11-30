import express from "express"
import cors from "cors"
import path from "path"
const app = express()
app.set('view engine','ejs')
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
import userroute from "./routes/user.router.js"
app.use("/api/users",userroute)
export {app}

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});