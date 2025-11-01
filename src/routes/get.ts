import { json, Router } from "express";
import { DictModel } from "../db/schema/dictionary.js";
import redis from "../db/redis/redis.js";
const Words = Router();


Words.get("/",async(req,res)=>{
    try { 

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
const total = await DictModel.countDocuments();

 const words = await DictModel.find()
      .skip((page - 1) * limit)
      .limit(limit);
       
      const totalPages = Math.ceil(total/limit);

  return res.status(200).json({
    totalPages,
    words,
    currentPages:page
  })

    }catch (error){
       return  res.status(500).json({
            message:"error occured in  server",
            error
        })

    }

})

Words.get("/search",async(req,res)=>{
    try {

    
    const q = req.query.q as string;
    if(!q){
      return  res.status(400).json({
           message: "missing required query parameters"
        })
    }
    const key = `search:${q.toLowerCase()}`
    const cache =  await redis.get(key);
    if(cache){
 return res.status(200).json({
     result:JSON.parse(cache),
     cached:true
 })

    }
    



    const result = await DictModel.find({
        $or:[
            {kanji:{ $regex: q, $options :"i"}},
            {readings:{ $regex: q, $options :"i"}},
            {meanings:{ $regex: q, $options :"i"}}

        ]
    } ).limit(20)

      if(!result || result.length === 0){
        return res.status(404).json({
            message: "could'nt find  in the collection !!"
        })
      }
     await redis.setEx(key,600,JSON.stringify(result));


   return res.status(200).json({
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

Words.get("/random" ,async(req,res)=>{
    try {
         
    
    
    let count = parseInt(req.query.count as string);
    if(isNaN(count) || count >1 ){
        count = 10
    }
    const random = await DictModel.aggregate([{$sample : {size:count }}]);
    if(!random || random.length === 0){
       return res.status(404).json({
            message: " no words found in. the collection !!"
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


export default Words;
 