import mongoose  from "mongoose";
import Senten from "./sen.interface";
 const SentenSchema = new mongoose.Schema<Senten>({
    category:{type:String,required:true},
    body:{type:String,required:true}
 })
 const sentenSchema=mongoose.model('senten',SentenSchema)
 export default sentenSchema;