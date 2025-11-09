 import { configDotenv } from "dotenv";
import express from "express"
import cors from  "cors";
import connectDB from "./db/db.js";
import Words from "./routes/get.js";
import Kanji from "./routes/getKanji.js";
import Story from "./routes/story.js";
 configDotenv();
 const app = express();

  app.use(express.json());
  app.use(cors({
    origin : "*",
    methods:"GET"
  }));

 app.use("/v1/words",Words);
 app.use("/v1/kanji",Kanji);
 app.use("/v1/stories",Story);



  connectDB();
 app.listen(process.env.PORT || 4000);