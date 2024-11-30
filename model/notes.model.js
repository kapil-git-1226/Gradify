import mongoose from "mongoose";
const noteschema = new mongoose.Schema({
    notetitle:{
        type:String,
        required:true
    },
    pdfdescription:{
        type:String,
        required:true
    },
    pdfurl:{
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
export const notes = mongoose.model("notes",noteschema)