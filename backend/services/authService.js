const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express=require('express')
const app=express();

const JWT_SECRET = process.env.JWT_SECRET

//signup api
exports.signup = async (data) => {
    const { full_name, email, password } = data;
    if (!full_name || !email || !password) {
        throw new Error('All fields are required')
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        full_name,
        email,
        password: hashedPassword,
    })

    await user.save();
    return user;
}

//login api
exports.login = async (data) => {
    const { email, password } = data

    if (!email || !password) {
        throw new Error('All fields are required')
    }

    const existingUser = await User.findOne({ email })
    if (!existingUser) {
        throw new Error ('User does not exists' )
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
        throw new Error('Invalid credentials' )
    }
        const token = jwt.sign(
            {
                id: existingUser._id,
                email: existingUser.email
            },
            JWT_SECRET,
            {expiresIn:'1h'}
        );

        return{
            status:"Success",
            existingUser:{
                id:existingUser._id,
                full_name:existingUser.full_name,
                role:existingUser.role
            },
            token
        };
};


app.get("/api/user", async(req, res)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({status:"error", message:"No token found"})
        }
        const decoded =jwt.verify(token, JWT_SECRET);
        const user=await User.findById(decoded.id).select("-password");
        if(!user){
            return res.status(404).json({status:"error", message:"User not found"});
        }
        return res.status(200).json({status:"Success", data:user})
    }catch(error){
        console.error("Error", error);
        return res.status(500).json({message:"Server error"})
    }
})



    
