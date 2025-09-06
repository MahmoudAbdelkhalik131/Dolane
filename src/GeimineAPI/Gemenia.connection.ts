import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";
import { NextFunction, Request, Response } from "express";
import chatSchema from "../Chat/Chat.schema";
import ErrorHandler from "../middleware/Error";
async function main(req: Request, res: Response,next:NextFunction) {
  if (req.file === undefined)
     {
      if(!req.body.message||req.body.message.trim()===""){
        return next(new ErrorHandler(400,`${req.__("validation_field")}`))
      }
      await chatSchema.create({
        userId:req.CurrentUser._id,
        message:req.body.message,
        IsTranscreption:false
      })
      res.status(201).json({data:req.body.message})
  } else
     {
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
    try {
      const myfile: any = await ai.files.upload({
        file: req.file?.path!,
        config: { mimeType: "audio/mp3" },
      });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: createUserContent([
          createPartFromUri(myfile.uri, myfile.mimeType),
          "transcribe the audio to text in the language of the speaker spoken in the audio",
        ]),
      });
      await chatSchema.create({
        userId:req.CurrentUser._id,
        message:response.text?.normalize("NFC"),
        IsTranscreption:true
      })
      res.status(200).json({ data: response.text });
      console.log("Transcription:", response.text?.normalize("NFC"));
    } catch (error: any) {
      console.error("Error in main:", error.message);
    }
  }
}
export default main;
