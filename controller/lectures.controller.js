import {lecture} from "./../models/lectures.model.js"
const lecturedemand = async(req,res) =>{
  const {semester_button} = req.body
  
  console.log(req.body);
  const tosendlecture = await lecture.find({semester:semester_button})
  res.status(201).json(tosendlecture)
  
}
export{
  lecturedemand
}