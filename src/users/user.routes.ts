import express from 'express'
import userSevices from './user.service'
import Uservalidation from './user.validation'
import auth from '../auth/authen'
const userRouter = express.Router()
userRouter.get('/',auth.allowedRoles(['admin']),userSevices.gettAllUser)
userRouter.post('/login',Uservalidation.login,userSevices.login)
userRouter.post('/register',Uservalidation.register,userSevices.register)
userRouter.post('/verify',userSevices.verifyCode)
userRouter.post('/password-reset-code',userSevices.ResetPasswordCode)
userRouter.post('/verify-reset-code',userSevices.verifyCodeForgetPasswordCode)
userRouter.post('/reset-password',userSevices.resetPassword)

export default userRouter