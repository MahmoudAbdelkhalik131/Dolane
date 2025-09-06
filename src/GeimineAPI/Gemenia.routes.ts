import express from "express";
import multer from "multer";
import  main  from "./Gemenia.connection";
import auth from "../auth/authen";

const Googlerouter = express.Router();
const upload = multer({dest:'uploads'});
Googlerouter.post("/transcribeGoogle", auth.verifyToken,upload.single("audio"), main);

export default Googlerouter;