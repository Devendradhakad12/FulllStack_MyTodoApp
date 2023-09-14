import { Task } from "../models/task.js"
import { errorHandler } from "../utils/error.js"; 
import { checkauthUser } from "../utils/features.js";

// add task
export const addTask = async (req,res) =>{
    const {title,description} = req.body
    const token = req.headers.cookie?.split("=")[1];
    try {
        if (!token) return errorHandler(res, 400, "Please Login");
        const user = checkauthUser(res, token.toString());
        await Task.create({title,description,creator:user.id})
        res.status(200).json({success:true,message:"Task Successfully Created"})
    } catch (error) {
        console.log(error);
        errorHandler(res, 500, "Internal Server Error");
    }

} 

// get tasks
export const getTask = async (req,res) =>{
    const token = req.headers.cookie?.split("=")[1];
    try {
        if (!token) return errorHandler(res, 400, "Please Login");
        const user = checkauthUser(res, token.toString());
        const task = await Task.find({creator:user.id}).populate("creator")
        res.status(200).json(task)
    } catch (error) {
        console.log(error);
        errorHandler(res, 500, "Internal Server Error");
    }
}

// update task
export const updateTask = async (req,res) =>{
    const {title,description} = req.body
    const taskid = req.params.id
    const token = req.headers.cookie?.split("=")[1];
    try {
        if (!token) return errorHandler(res, 400, "Please Login");
        const user = checkauthUser(res, token.toString());
        let task = await Task.findOne({_id:taskid})
       if(!task) return errorHandler(res,404,"Task Not Found")
        if(task.creator.toString() !== user.id) return    errorHandler(res,400,"You are not Authorized")
        task.title = title;
        task.description = description,
        await task.save()
        res.status(200).json({success:true,message:"Task successfully updated"})
        
    } catch (error) {
        console.log(error);
        errorHandler(res, 500, "Internal Server Error");
    }

}

// delete Task
export const deleteTask = async (req,res) =>{
    const taskid = req.params.id
    const token = req.headers.cookie?.split("=")[1];
    try {
        if (!token) return errorHandler(res, 400, "Please Login");
        const user = checkauthUser(res, token.toString());
        let task = await Task.findOne({_id:taskid})
        if(!task) return errorHandler(res,404,"Task Not Found")
        if(task.creator.toString() !== user.id) return    errorHandler(res,400,"You are not Authorized")
        await task.deleteOne()
        res.status(200).json({success:true,message:"Task successfully Deleted"})
        
    } catch (error) {
        console.log(error);
        errorHandler(res, 500, "Internal Server Error");
    }
}