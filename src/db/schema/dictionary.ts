import mongoose, { Schema }  from "mongoose";
const dict = new Schema({

    id: {type:String,unique:true},
    kanji: [{type:String}],
    readings: [{type:String}],
    meanings: [{type:String}],

})
export const DictModel = mongoose.model("dictionart",dict);