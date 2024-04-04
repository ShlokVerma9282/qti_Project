const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    num:Number,
    title:String,
    slug:String,
    about:String,
    student:Number,
    difficulty:String,
    price:Number,
    discount:Number
})

const courseModel = mongoose.model("course",courseSchema)
module.exports = courseModel