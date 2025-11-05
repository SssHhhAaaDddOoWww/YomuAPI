import { Router } from "express";
import { StoryModel } from "../db/schema/story.js";
 import * as wanakana from "wanakana";
import { configDotenv } from "dotenv";
const Story = Router();

configDotenv();

Story.get("/",async(req,res)=>{
    try { 

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;
    
 const total = await StoryModel.countDocuments();
        
     const words = await StoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit);
           
          const totalPages = Math.ceil(total/limit)
    
      return res.status(200).json({
        totalPages,
        words,
        currentpage:page
      })
    
        }catch (error){
           return  res.status(500).json({
                message:"error occured in  server",
                error
            })
    
        }
    
    })


Story.get("/search",async(req,res)=>{
     try {
        
        let q = req.query.q as string;
        if(!q){
          return  res.status(400).json({
               message: "missing required query parameters"
            })
        } 
         q = q.replace(/\s+/g, "").trim();
            const kana = wanakana.toKana(q);
        
    //     const key = `search:${ q.toLowerCase()}`;
    // const cache:any = await redis.get(key);
    //        if(cache){
    //       return  res.status(200).json({
    //              result:JSON.parse(cache),
    //              cached:true
    //         })
    //        }
        


        const result = await StoryModel.find({
            $or:[
                {title_jp: {$regex: q ,$options:"i" }},
                {title_jp: {$regex: kana ,$options:"i" }},
                {title_romaji: {$regex: q ,$options:"i" }},
                {title_romaji: {$regex: kana,$options:"i" }}
            ]
        } ).limit(5);
    
          if(!result || result.length === 0){
            return res.status(404).json({
                message: "could'nt find  in the collection !!"
            })
          }
        //    if(process.env.NODE_ENV === "prod"){
        // await redis.set(key, JSON.stringify(result), { ex: 600 });

    // }else{
    //     await redis.set(key, JSON.stringify(result), { EX: 600 });
    // }
    
    
       return res.status(200).json({
            result,
            // cached:false
        })
    }catch(error){
      return  res.status(500).json({
            message : "error occured in server",
            error
        })
    }
    
    
    })


export default Story;