import { Router } from "express";
import senServices from "./sen.service";
import validationSen from "./sen.validation";
import auth from "../auth/authen";
const senRouter = Router()
senRouter.route('/')
.get(auth.verifyToken,senServices.getAll)
.post(auth.allowedRoles(['admin','user']),senServices.create)
senRouter.route('/:id')
.get(auth.verifyToken,validationSen.getOne,senServices.getOne)
.put(auth.verifyToken,validationSen.update,senServices.updateOne)
.delete(auth.verifyToken,validationSen.delete,senServices.deleteOne)
export default senRouter