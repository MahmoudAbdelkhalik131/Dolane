import jwt from 'jsonwebtoken';
import User from '../users/user.interface';
class JWT{
 createToken =(user:User)=>{
    const expire:any=process.env.JWT_EXPIRES_IN!;
    return jwt.sign({user},process.env.JWT_SECRET!,{expiresIn: expire})
}
verifyToken =(token:string)=>{
   return jwt.verify(token,process.env.JWT_SECRET!)
}
}
const Jwt =new JWT();
export default Jwt;
