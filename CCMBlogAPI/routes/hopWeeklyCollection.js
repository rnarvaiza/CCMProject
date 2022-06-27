const router = require("express").Router();
const HopWeeklyCollection = require("../models/HopWeeklyCollection");


router.post("/", async (req, res) =>{
    const newHopWeeklyCollection = new HopWeeklyCollection(req.body);
    try{
        const savedCollection = await newHopWeeklyCollection.save();
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(savedCollection);
    }catch (err){
        res.header("Access-Control-Allow-Origin", "*");
        res.status(500).json(err)
    }
});

router.get("/", async (req, res) =>{
    try{
        const newHopWeeklyCollection = await HopWeeklyCollection.find();
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(newHopWeeklyCollection);
    }catch (err){
        res.header("Access-Control-Allow-Origin", "*");
        res.status(500).json(err)
    }
});

module.exports = router