import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url';
const app = express()
app.set('view engine','ejs')
app.use (cors({
    origin: "*",
    credentials: true
}))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
app.set('views', path.join(__dirname, 'views'));
app.use('/notes', express.static(path.join(__dirname, 'notes')));
app.use('/lectures', express.static(path.join(__dirname, 'lectures')));
app.use('/about', express.static(path.join(__dirname, 'about')));
app.use('/Grade_predictor', express.static(path.join(__dirname, 'Grade_predictor')));
app.use('/Groups', express.static(path.join(__dirname, 'Groups')));
app.use('/pyqs', express.static(path.join(__dirname, 'pyqs')));
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'notes', 'Gradify - Notes.html'));
});
app.get('/lectures', (req, res) => {
  res.sendFile(path.join(__dirname, 'lectures', 'lecture-interface.html'));
});
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about', 'about-page.html'));
});
app.get('/Grade_predictor', (req, res) => {
  res.sendFile(path.join(__dirname, 'Grade_predictor', 'grade_predictor.html'));
});
app.get('/Groups', (req, res) => {
  res.sendFile(path.join(__dirname, 'Groups', 'group-page.html'));
});
app.get('/pyqs', (req, res) => {
  res.sendFile(path.join(__dirname, 'pyqs', 'pyqs.html'));
});