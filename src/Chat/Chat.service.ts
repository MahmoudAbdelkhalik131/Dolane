import { Request,Response,NextFunction } from "express";
import Chat from "./Chat.interface";
import chatSchema from "./Chat.schema";
import AsyncHandler from "express-async-handler";
import ErrorHandler from "../middleware/Error";
class ChatServices{
    createChat=AsyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const chat :Chat=await chatSchema.create(req.body)
        res.status(201).json({date:chat})
    })
    getAllUserChats=AsyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const chats:Chat[]|null =await chatSchema.find({userId:req.CurrentUser._id})
        if(!chats){
            return next(new ErrorHandler(404,`${req.__("check_login")}`))
        }
        res.status(200).json({data:chats})
    })
}
const chatServices = new ChatServices()
export default chatServices