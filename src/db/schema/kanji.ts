import mongoose from "mongoose";

const KanjiSchema = new mongoose.Schema({
  kanji: { type: String, required: true, unique: true },
  grade: Number,
  stroke_count: Number,
  jlpt: Number,
  readings: {
    on: [String],
    kun: [String],
  },
  meanings: [String],

});

   export const KanjiModel =  mongoose.model("Kanji", KanjiSchema);
