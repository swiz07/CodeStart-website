const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    course_image: {
        type: String,
    },
    description: {
        type: String,
        default:""
    },
    category: {
        type: String,
    },
    language: {
        type: String,
    },
    difficulty_level: {
        type: String,
        enum:["Beginner", "Intermediate", "Advanced"],
        default: "Beginner"
    },
    lessons:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Lesson"
    }],
    quizzes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Quiz"
    }],
    students_enrolled:{
        type:Number,
        default:0
    },
    course_duration: {
        type: Number
    },
    last_updated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema)