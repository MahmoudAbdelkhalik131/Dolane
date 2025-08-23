import express from 'express'
import userRouter from './src/users/user.routes'
import { Error } from 'mongoose';
import { errorHandler } from './src/middleware/Error';
import router from './src/openapi/openAI.routes';





declare module "express" {
  interface Request {
    projectId?: string;
    CurrentUser?: any;
  }
}



const Routes =(app:express.Application)=>{
app.use('/api/v1/user',userRouter)
app.use('/api/v1/AI',router)



app.use(errorHandler)

}

export default Routes
