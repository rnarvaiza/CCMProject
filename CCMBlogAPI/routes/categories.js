const router = require("express").Router();
const Category = require("../models/Category");


router.post("/", async(req,res)=>{
    const newCat = new Category(req.body);
    try{
        const savedCategory = await newCat.save();
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(savedCategory);
    }catch (err){
        res.header("Access-Control-Allow-Origin", "*");
        res.status(500).json(err)
    }
});

router.get("/", async(req,res)=>{
    try{
        const categories = await Category.find();
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(categories);
    }catch (err){
        res.header("Access-Control-Allow-Origin", "*");
        res.status(500).json(err)
    }
});


module.exports = router
