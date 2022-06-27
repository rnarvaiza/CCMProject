const mongoose = require("mongoose")


const HopWeeklyCollectionSchema = new mongoose.Schema(
    {
        hopName:{
            type:String,
            required:false,
        },
        hopPrice:{
            type:String,
            required:false,
        },
        hopLink:{
            type:String,
            required:false,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("HopWeeklyCollection", HopWeeklyCollectionSchema);