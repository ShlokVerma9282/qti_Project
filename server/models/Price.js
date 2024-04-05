const mongoose = require('mongoose')

const priceSchema = new mongoose.Schema({
    num:Number,
    price:Number,
    discount:Number,
})

const priceModel = mongoose.model("price",priceSchema)
module.exports = priceModel