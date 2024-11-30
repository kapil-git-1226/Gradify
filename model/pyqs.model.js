import mongoose from "mongoose";
const pyqsschema = new mongoose.Schema({
    pyqstitle:{
        type:String,
        required:true
    },
    pyqsdescription:{
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
    subject:{
        type:String,
        required:true
    }
},{timestamps:true})
export const pyqs = mongoose.model("pyqs",pyqsschema)