import mongoose from 'mongoose';
import Document from 'mongoose'
interface User extends mongoose.Document{
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    verifyCode:string;
    validUser:boolean;
}
export default User;