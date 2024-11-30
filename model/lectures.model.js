import mongoose from "mongoose";
const lecturesschema = new mongoose.Schema({
    videofile:{
        type:String,
        required:true
    },
    videotitle:{
        type:String,
        required:true
    },
    videodescription:{
        type:String,
        required:true
    },
    semester:{
        type:Number,
        required:true
    },
    Subject:{
        type:String,
        required:true
    }
},{timestamps:true})
export const lecture = mongoose.model("lecture",lecturesschema)