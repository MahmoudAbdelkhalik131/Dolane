import { pipeline } from "@huggingface/transformers";
import { WaveFile } from "wavefile";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import { tmpdir } from "os";
import path from "path";

ffmpeg.setFfmpegPath(ffmpegPath!);

let transcriber: any;

// تحميل الموديل مرة واحدة
async function loadModel() {
  if (!transcriber) {
    transcriber = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-small",
      { dtype: "fp16" }
    );
  }
  return transcriber;
}

// 🔄 تحويل أي ملف صوت (mp3 → wav 16k mono)
async function convertToWav(inputPath: any) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(tmpdir(), `${Date.now()}.wav`);

    ffmpeg(inputPath)
      .audioChannels(1) // mono
      .audioFrequency(16000) // 16kHz
      .toFormat("wav")
      .on("end", () => resolve(outputPath))
      .on("error", reject)
      .save(outputPath);
  });
}

export async function transcribeAudio(filePath: any) {
  try {
    // أول حاجة: حوّل الملف لو wav
    const wavPath: any = await convertToWav(filePath);
    const buffer = fs.readFileSync(wavPath);

    // جهّز ملف wav
    let wav = new WaveFile(buffer);
    wav.toBitDepth("32f");
    wav.toSampleRate(16000);

    let audioData = wav.getSamples();
    if (Array.isArray(audioData)) {
      if (audioData.length > 1) {
        const SCALING_FACTOR = Math.sqrt(2);
        for (let i = 0; i < audioData[0].length; ++i) {
          audioData[0][i] =
            (SCALING_FACTOR * (audioData[0][i] + audioData[1][i])) / 2;
        }
      }
      audioData = audioData[0];
    }

    const model = await loadModel();
    const output = await transcriber(audioData, {
      chunk_length_s: 30, //قسم الصوت لمقاطع 30 ثانية
      stride_length_s: 5,
      language: "ar",
      task: "transcribe", // يعمل overlap 5 ثواني بين المقاطع لتجنب ضياع كلمات
    });

    // نظّف الملفات المؤقتة
    fs.unlinkSync(wavPath);
    fs.unlinkSync(filePath);

    return output;
  } catch (err: any) {
    console.error("Error in transcribeAudio:", err.message);
    throw err;
  }
}
