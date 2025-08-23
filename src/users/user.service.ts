import ErrorHandler from "../middleware/Error";
import Jwt from "../middleware/Jwt";
import User from "./user.interface";
import bcrypt from 'bcrypt'
import userSchema from "./user.schema";
import { Request, Response, NextFunction } from "express";
class UserServices {
  gettAllUser = async (req: Request, res: Response, next: NextFunction) => {
    const users: User[] | null = await userSchema.find();
    res.status(200).json({data:users})
  };
  login = async(req:Request,res:Response,next:NextFunction)=>{
    const user:User|null =await userSchema.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler(400,"Invalid email or password"))
    }
    const password= await bcrypt.compare(req.body.password, user.password)
    if(password ===false){
        return next(new ErrorHandler(400,"Invalid email or password"))
    }
    const token =  Jwt.createToken(user);
    res.status(200).json({data:user,token:token})
  }
  register=async(req:Request,res:Response,next:NextFunction)=>{
      const user= await userSchema.create({
        username:req.body.username,
        email:req.body.email,
        password:await bcrypt.hash(req.body.password,10)
      });
      
      await user.save();
      const token =  Jwt.createToken(user);
      res.status(201).json({data:user,token:token})
  }
}
const userSevices=new UserServices();
export default userSevices