import mongoose, { mongo }  from "mongoose";
import Chat from "./Chat.interface";
const ChatSchema=new mongoose.Schema<Chat>(
    {
        userId:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
        message:{type:String},
        IsTranscreption:{type:Boolean,default:false}
    },
    {timestamps:true}
)
const chatSchema=mongoose.model<Chat>('chats',ChatSchema)
export default chatSchema;