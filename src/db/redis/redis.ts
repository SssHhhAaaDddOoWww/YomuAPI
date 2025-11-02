import { Redis as UpstashRedis } from "@upstash/redis";
import { createClient } from "redis";
import { configDotenv } from "dotenv";
configDotenv();



let redis: any;
try {


if(process.env.NODE_ENV === "prod"){
redis = new UpstashRedis({
    url : process.env.UPSTASH_REDIS_REST_URL! ,
    token:process.env.UPSTASH_REDIS_REST_TOKEN!

})
}else{ 
    

  const localRedis = createClient({ url: "redis://localhost:6379" });

  localRedis.on("error", (err) => console.error(" Redis Client Error:", err));
  await localRedis.connect();
  console.log("Connected to Local Redis");

  redis = localRedis;
}}catch(error){
    console.log("error connecting to redis!")
}

export default redis;