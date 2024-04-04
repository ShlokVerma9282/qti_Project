const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const courseModel = require('./models/Course');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/course");

app.post('/c_1', async (req, res) => {
    const { num, title, slug, about,difficulty,discount,price,student } = req.body;

    try {
        // Check if a course with num 1 exists
        let existingCourse = await courseModel.findOne({ num: 1 });

        if (existingCourse) {
            // If the course exists and has num 1, update its fields
            existingCourse.title = title;
            existingCourse.slug = slug;
            existingCourse.about = about;
            existingCourse.difficulty = difficulty;
            existingCourse.discount = discount;
            existingCourse.price = price;
            existingCourse.student = student;
            await existingCourse.save();
            res.json(existingCourse); // Return the updated course
        } else {
            // If the course doesn't exist or has a different num, create a new one with num 1
            const newCourse = new courseModel({
                num: 1,
                title,
                slug,
                about,
                difficulty,
                discount,
                price,
                student
            });
            await newCourse.save();
            res.json(newCourse); // Return the newly created course
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3001, () => {
    console.log("Server is running");
});
