import mongoose  from "mongoose";
import User from "./user.interface";
const UserSchema =new mongoose.Schema<User>({
    username:{type:String,required: true},
    password:{type:String,required: true},
    email:{type:String,required: true},
    role:{type:String,enum:['user','admin'],default:'user'},
    verifyCode:{type:String},
    forgetPasswordCode:{type:String},
    validUser:{type:Boolean,default:false}

},{timestamps:true});
 const userSchema=mongoose.model<User>('users',UserSchema);
export default userSchema;