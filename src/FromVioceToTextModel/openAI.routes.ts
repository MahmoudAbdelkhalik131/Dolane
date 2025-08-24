import express from "express";
import multer from "multer";
import { transcribeAudio } from "./connect_ai";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await transcribeAudio(req.file.path);
    res.json({ text: result.text });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
