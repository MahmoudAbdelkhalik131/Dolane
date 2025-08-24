import mongoose from "mongoose";
interface Senten extends mongoose.Document{
    category:string;
    body:string;
}
export default Senten