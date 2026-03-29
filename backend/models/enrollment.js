const mongoose = require('mongoose')
const enrollmentSchema = new mongoose.Schema({
    user_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }],
    course_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    }],
    category:{
        type:String,
        trim:true
    },
    enrolled_at: {
        type: Date,
        default:Date.now
    },

}, { timestamps: true });

module.exports = mongoose.model("Enrollment", enrollmentSchema)