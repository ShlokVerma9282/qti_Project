const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const courseModel = require('./models/Course')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/course")

app.post('/c_1',(req,res)=>{
    courseModel.create(req.body)
    .then(courses => res.json(courses))
    .catch(err=>res.json(err))
})

app.listen(3001, ()=> {
    console.log("Server is running")
})