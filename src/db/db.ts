import { configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv();
const connectDB = async()=>{
try {
   const connect =   mongoose.connect(process.env.MONGO_URI! || "");
   if(!connect){
    console.log("error while connecting !!")
   }else{
    console.log("succesfully connected to DB!!");
   }
}catch(error){
    console.log(error);
}
}
export default connectDB;