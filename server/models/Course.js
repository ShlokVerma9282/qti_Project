const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    num:Number,
    title:String,
    slug:String,
    about:String
})

const courseModel = mongoose.model("course",courseSchema)
module.exports = courseModel