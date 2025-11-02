import { Router } from "express";
 import { KanjiModel } from "../db/schema/kanji.js";
 import * as wanakana from "wanakana";
 import redis from "../db/redis/redis.js";

const Kanji = Router();

Kanji.get("/", async(req,res)=>{
    try { 

   
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const total = await KanjiModel.countDocuments();


    const result  = await KanjiModel.find().skip((page - 1) * limit).limit(limit);
    const totalPages = Math.ceil(total/limit)
    return res.status(200).json({
        totalPages,
        result,
        currentPage:page
    })
    
    }catch(error){
        return res.status(500).json({
            message: "error occured in server",
            error
        })
    }
})


Kanji.get("/search",async(req,res)=>{
    try {

    
    const q = req.query.q as string;
    if(!q){
      return  res.status(400).json({
           message: "missing required query parameters"
        })
    }
    const kana = wanakana.toKana(q);
    const key = `search:${kana.toLowerCase() || q.toLowerCase()}`;
    const cache:any = await redis.get(key);
           if(cache){
            res.status(200).json({
                 result:JSON.parse(cache),
                 cached:true
            })
           }


    const result = await KanjiModel.find({
        $or:[
            {kanji:{ $regex: q, $options :"i"}},
            {kanji:{ $regex: kana, $options :"i"}},
           { "readings.on": { $regex: q, $options: "i" } },
        { "readings.kun": { $regex: q, $options: "i" } },
          { "readings.on": { $regex: kana, $options: "i" } },
        { "readings.kun": { $regex: kana, $options: "i" } },
            {meanings:{ $regex: q, $options :"i"}}

        ]
    } ).limit(20)

      if(!result || result.length === 0){
        return res.status(404).json({
            message: "could'nt find  in the collection !!"
        })
      }

      await redis.set(key,JSON.stringify(result), {ex:600});



   return res.status(200).json({
       kana,
        result,
        cached:false
    })
}catch(error){
  return  res.status(500).json({
        message : "error occured in server",
        error
    })
}


})


Kanji.get("/random" ,async(req,res)=>{
    try {
         
    
    
    let count = parseInt(req.query.count as string);
    if(isNaN(count) || count >1 ){
        count = 10
    }
    const random = await KanjiModel.aggregate([{$sample : {size:count }}]);
    if(!random || random.length === 0){
       return res.status(404).json({
            message: " no kanjis found in. the collection !!"
        })
    }

  return  res.json(random);
}catch(error){
   return res.status(500).json({
        message: "error occured in server ",
        error
    }
        
    )
}
})

export default Kanji ;
