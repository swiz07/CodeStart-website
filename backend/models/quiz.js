const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
        options: [{
            type: String,
            required:true
        }],
        correctAnswer: {
            type: String,
            required:true
        }
});

const quizSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    questions:[questionSchema],
    order:{
        type:Number,
        required:true
    }
},{timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema)