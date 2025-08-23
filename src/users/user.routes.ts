import express from 'express'
import userSevices from './user.service'
import Uservalidation from './user.validation'
import auth from '../auth/authen'
const userRouter = express.Router()
userRouter.get('/',auth.allowedRoles(['admin']),userSevices.gettAllUser)
userRouter.post('/login',Uservalidation.login,userSevices.login)
userRouter.post('/register',Uservalidation.register,userSevices.register)
export default userRouter