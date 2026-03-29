const mongoose = require('mongoose')
const progresschema = new mongoose.Schema({
    user:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }],
    course:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    }],
    completedLessons:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Lesson"
    }],
    completion_percentage:{
        type:Number,
        default:0
    },
    last_accessed: {
        type: Date,
        default:Date.now
    },

}, { timestamps: true });

module.exports = mongoose.model("Progress", progresschema)