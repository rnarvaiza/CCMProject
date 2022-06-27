const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updatedUser = await User.findOneAndUpdate(req.params.id,{
                $set: req.body,
            },
                {new:true}
            );
            res.header("Access-Control-Allow-Origin", "*");
            res.status(200).json(updatedUser);
        }catch (err){
            res.header("Access-Control-Allow-Origin", "*");
            res.status(500).json(err);
        }
    }else{
        res.header("Access-Control-Allow-Origin", "*");
        res.status(401).json("Not your account");
    }
});

//DELETE
// noinspection DuplicatedCode
router.delete("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id);
            try{
                await Post.deleteMany({username:user.username})
                await User.findByIdAndDelete(req.params.id);
	        res.header("Access-Control-Allow-Origin", "*");
                res.status(200).json("User deleted.");
            }catch (err){
	        res.header("Access-Control-Allow-Origin", "*");
                res.status(500).json(err);
            }
        }catch (err){
            res.header("Access-Control-Allow-Origin", "*");
            res.status(404).json("User not found");
        }
    }else{
        res.header("Access-Control-Allow-Origin", "*");
        res.status(401).json("Not your account");
    }
});

//GET USER
router.get("/:id", async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.sendStatus(200).json(others);
    }catch (err){
        res.sendStatus(500).json(err)
    }
});

module.exports = router
