import { configDotenv } from "dotenv";
import { createClient } from "redis";
configDotenv();
const redis = createClient({
    url:process.env.redis!
});
redis.on("error",(err)=>{
    console.log("redis error",err)
})
await redis.connect();
console.log("redis running !!");
export default redis;