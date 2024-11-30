import {app} from "./app.js"
import connectDB from "./db/index.js"
connectDB()
.then(()=>{
    app.listen(3000, () => {
        console.log(`server is running on port ${3000}`);
    })
    app.on("error", (error) => {
        console.log(`Error occurred ${error}`)
        throw error
    })
})
.catch((err)=>{
    console.log(`mongo db connection fialed : ${err}`)
})