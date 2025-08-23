import express from 'express';
import dotenv from 'dotenv';
import connectDB  from './connect/connect';
import Routes from './index';
import OpenAI from 'openai';
const app: express.Application = express();
app.use(express.json());
dotenv.config();
Routes(app)
connectDB();
app.listen(process.env.Port,()=>{
    console.log(`server started on port ${process.env.Port}`);
})

    
