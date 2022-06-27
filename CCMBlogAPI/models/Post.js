const mongoose = require("mongoose")


const PostSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            unique:true
        },
        desc:{
            type:String,
            required:true,
        },
        originalGravity:{
            type:String,
            required:false,
        },
        finalGravity:{
            type:String,
            required:false,
        },
        mashTemp:{
            type:String,
            required:false,
        },
        mashTime:{
            type:String,
            required:false,
        },
        boilTime:{
            type:String,
            required:false,
        },
        malts:{
            type:String,
            required:false,
        },
        hops:{
            type:String,
            required:false,
        },
        otherAggregates:{
            type:String,
            required:false,
        },
        waterProfile:{
            type:String,
            required:false,
        },
        beerPhoto:{
            type:String,
            default:""
        },
        username:{
            type:String,
            required:true,
        },
        categories:{
            type:Array,
            required:false
        },
        dealLink:{
            type:String,
            required:false,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Post", PostSchema);