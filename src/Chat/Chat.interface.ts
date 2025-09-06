import mongoose, { ObjectId }  from "mongoose";
interface Chat extends mongoose.Document{
    userId:ObjectId,
    message:string,
    IsTranscreption:boolean,
}
export default Chat