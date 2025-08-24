import sentenSchema from "./sen.schema";
import Senten from "./sen.interface";
import AsyncHandler from 'express-async-handler'
import { Request,Response,NextFunction } from "express";
import { APIError } from "openai";
import ErrorHandler from "../middleware/Error";
 class SentenServices{
    getAll=AsyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const sen:Senten[]=await sentenSchema.find()
        if(!sen){
            return next (new ErrorHandler(404,"Sorry no data found"))
        }
        res.status(200).json({data:sen})
       })
    create=AsyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const sen=await sentenSchema.create(req.body)
        res.status(201).json({date:sen})
    })
    getOne=AsyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const sen:Senten|null=await sentenSchema.findById(req.params.id)
        if(!sen){
            return next(new ErrorHandler(404,"Id is Invalid"))
        }
        res.status(200).json({data:sen})

    })
    updateOne=AsyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const sen:Senten|null =await sentenSchema.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!sen){
            return next (new ErrorHandler(404,"Invalid Id"))
        }
        res.status(200).json({data:sen})
    })
    deleteOne=AsyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        await sentenSchema.findByIdAndDelete(req.params.id)
        res.status(204).json({message:"Item deleted Succeffully"})
    })
 }
 const senServices=new SentenServices
 export default senServices