import express from 'express'
import userRouter from './src/users/user.routes'
import chatRouter from './src/Chat/Chat.routes';
import { errorHandler } from './src/middleware/Error';
import router from './src/FromVioceToTextModel/openAI.routes';
import senRouter from './src/Senten/sen.routes';
import Googlerouter from './src/GeimineAPI/Gemenia.routes';




declare module "express" {
  interface Request {
    projectId?: string;
    CurrentUser?: any;
  }
}
const Routes =(app:express.Application)=>{
app.use('/api/v1/user',userRouter)
app.use('/api/v1/AI',router)
app.use('/api/v1/AI/google',Googlerouter)
app.use('/api/v1/senten',senRouter)
app.use('/api/v1/user/chat',chatRouter)
app.use(errorHandler)

}

export default Routes
