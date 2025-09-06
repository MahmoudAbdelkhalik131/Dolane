import { Router } from "express";
import auth from "../auth/authen";
import chatServices from "./Chat.service";
const chatRouter=Router();
chatRouter.route('/')
.get(auth.verifyToken,chatServices.getAllUserChats)
export default chatRouter