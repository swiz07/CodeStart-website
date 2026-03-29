const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        default:""
    },
    author:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }],
    category:{
        type:String,
        trim:true
    },
    created_at: {
        type: Date,
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    coverImage:{
        type:String
    }
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema)