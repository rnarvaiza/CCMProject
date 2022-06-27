const router = require("express").Router();
const Post = require("../models/Post");

//CREATE
router.post("/", async (req,res)=>{
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(savedPost);
    }catch (err){
        res.header("Access-Control-Allow-Origin", "*");
        res.status(500).json(err)
    }
});

//UPDATE POST
router.put("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id, {
                        $set:req.body
                    },
                    {new:true}
                );
	        res.header("Access-Control-Allow-Origin", "*");
                res.status(200).json(updatedPost);
            }catch (err){
	        res.header("Access-Control-Allow-Origin", "*");
                res.status(500).json(err);
            }
        }else{
            res.header("Access-Control-Allow-Origin", "*");
            res.status(401).json("Not your post");
        }

    }catch (err){
        res.header("Access-Control-Allow-Origin", "*");
        res.status(500).json(err);
    }
});


//DELETE POST
router.delete("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                await post.delete();
	        res.header("Access-Control-Allow-Origin", "*");
                res.status(200).json("Post has been deleted");
            }catch (err){
	        res.header("Access-Control-Allow-Origin", "*");
                res.status(500).json(err);
            }
        }else{
            res.header("Access-Control-Allow-Origin", "*");
            res.status(401).json("Not your post");
        }

    }catch (err){
        res.header("Access-Control-Allow-Origin", "*");
        res.status(500).json(err);
    }
});

//GET POST
router.get("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(post);
    }catch (err){
        res.header("Access-Control-Allow-Origin", "*");
        res.status(500).json(err)
    }
});

//GET ALL POSTS
router.get("/", async (req, res)=>{
    const username = req.query.user;
    const category = req.query.cat;
    try{
        let posts;
        if(username){
            posts = await Post.find({username})
        } else if(category){
            posts = await Post.find({categories:{
                $in:[category],
                },
            });
        } else{
            posts = await Post.find();
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(posts);
    }catch (err){
        res.header("Access-Control-Allow-Origin", "*");
        res.status(500).json(err).catch();
    }
});

module.exports = router
