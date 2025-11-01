import mongoose, { mongo, Schema } from "mongoose";

const storySchema = new Schema({
     title_jp: {type:String},
    title_romaji: {type:String},
    author_romaji: {type:String},
    text_jp: {type:String}
})

export const StoryModel = mongoose.model("story",storySchema);