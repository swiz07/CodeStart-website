const mongoose = require('mongoose')
const usersSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        default: null
    },
    bio:{
        type:String,
        default:null
    },
    role: {
        type:String,
        default: 'user',
        enum: ['user', 'admin'],
    },
    registration_date: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    last_updated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("User", usersSchema)