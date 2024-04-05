const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    num:Number,
    drop:String,
    link:String,
})

const videoModel = mongoose.model("video",videoSchema)
module.exports = videoModel