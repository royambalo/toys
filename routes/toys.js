const express = require('express');
const router = express.Router();
const {toysModel,validToy} =require("../moddels/toys_model");

router.get('/', function(req, res, ) {
  toysModel.find({})
  .sort({_id:-1})
  .then(data=>{
      res.json(data)
  })
});

router.get("/search/",(req,res)=>{
    const mysearch=new RegExp(`${req.query.q}`);
    toysModel.find({$or:[{name:mysearch},{category:mysearch}]})
    .then(date=>{
        res.json(date)
    })
})
router.get("/cat/:catId",(req,res)=>{
    let catId=req.params.catId;
    toysModel.find({category:catId})
    .then(date=>{
        res.json(date)
    })
    .catch(err=>{
        res.status(400).json(err)
    })
})
router.post("/add",async(req,res)=>{
    let dataBody=req.body;
    // dataBody._id=req.decoded._id;
    let toy=await validToy(dataBody);
    if(toy.error){
        res.status(400).json(toy.error.details[0])

    }
    else{
        try{
            let saveDate=await toysModel.insertMany([req.body]);
            res.json(saveDate[0]);
        }
        catch{
            res.status(400).json({massage:"error insert new toy soory"})
        }  
    }
})
router.post("/update",async(req,res)=>{
    let dataBody=req.body;
    let toy=await validToy(dataBody)
    if(toy.error){
        res.status(400).json(toy.error.details[0])
    }
    else{
        try{
            let updateData=await toysModel.updateOne({_id:req.body._id},req.body)
            res.json(updateData)      
        }
        catch{
            res.status(400).json({massage:"cant find id"})
        }
    }
})
router.post("/del",(req,res)=>{
    let delID=req.body._id;
    toysModel.deleteOne({_id:delID})
    .then(data=>{
        if(data.deletedCount>0){
            res.json({massage:"deleted",del:"ok"})
        }
        else{
            res.status(400).json({massage:"id not fount"})
        }
    })
})
//http://localhost:3000/toys/prices/?min=100&&max=500 first min then max-withoout check on what given.
router.get("/prices",(req,res)=>{
    let min=req.query.min||0;

    let max=req.query.max||9999;
    if(isNaN(min)||isNaN(max)||min<0)
    res.json({massage:"wrong!,please try again"})
    else
    {
    toysModel.find({price:{$gte:min,$lte:max}})
    .then(data=>{
        res.json(data)
    })
}
})
module.exports = router;
