import Jwt from "../middleware/Jwt";
import User from "./user.interface";
import bcrypt from "bcrypt";
import userSchema from "./user.schema";
import { Request, Response, NextFunction } from "express";
import AsyncHandler from "express-async-handler";
import sendEmail from "../utils/sendMail";
import ErrorHandler from "../middleware/Error";
class UserServices {
  gettAllUser = async (req: Request, res: Response, next: NextFunction) => {
    const users: User[] | null = await userSchema.find();
    res.status(200).json({ data: users });
  };
  login = async (req: Request, res: Response, next: NextFunction) => {
    const user: User | null = await userSchema.findOne({
      email: req.body.email,
    });
    if (!user) {
      return next(new ErrorHandler(400, "Invalid email or password"));
    }
    const password = await bcrypt.compare(req.body.password, user.password);
    if (password === false) {
      return next(new ErrorHandler(400, "Invalid email or password"));
    }
    if(user.validUser==false){
      return next(new ErrorHandler(401,"Please Verify your email before login ....."))
    }
    const token = Jwt.createToken(user);
    res.status(200).json({ data: user, token: token });
  };
  register = async (req: Request, res: Response, next: NextFunction) => {
      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const user = await userSchema.create({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });
   
    await sendEmail({
      verifyCode: verifyCode,
      subject: "You verification code is ",
      email: user.email.toString(),
    })
    user.verifyCode=verifyCode
    user.save({validateModifiedOnly:true})
    const token=Jwt.createToken(user)
    res.status(200).json({token:token,message:"verification code sent successfully Please check your email"})
  };
  verifyCode=AsyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
     if(req.headers.authorization){
      const token = req.headers.authorization.split(" ")[1];
      if(!token){
        return next(new ErrorHandler(401,`${req.__("check_active")}`))
      }
      const decode:any= Jwt.verifyToken(token);
      const user =await userSchema.findById(decode.user._id.toString())
      if(!user){
        return next(new ErrorHandler(400,`${req.__("allowed_to")}`))
      }
      if(req.body.verifyCode!==user.verifyCode){
        return next (new ErrorHandler(400,`${req.__("check_code_valid")}`))
      }
      user.validUser=true;
      user.verifyCode=await bcrypt.hash(user.verifyCode,10)
      user.save()
      res.status(200).json({message:"You have registared successfully"})
     }
     else{
      return next(new ErrorHandler(404,`${req.__("check_login")}`))
     }
  })
  // Still under Development
  ResetPassword=AsyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
     if(req.headers.authorization){
      const token = req.headers.authorization.split(" ")[1];
      if(!token){
        return next(new ErrorHandler(401,`${req.__("check_active")}`))
      }
      const decode:any= Jwt.verifyToken(token);
      const user =await userSchema.findById(decode.user._id.toString())
      if(!user){
        return next(new ErrorHandler(400,`${req.__("allowed_to")}`))
      }
      if(req.body.verifyCode!==user.verifyCode){
        return next (new ErrorHandler(400,`${req.__("check_code_valid")}`))
      }
      user.validUser=true;
      user.verifyCode=await bcrypt.hash(user.verifyCode,10)
      user.save()
      res.status(200).json({message:"You have registared successfully"})
     }
     else{
      return next(new ErrorHandler(404,`${req.__("check_login")}`))
     }
  })
}
const userSevices = new UserServices();
export default userSevices;
