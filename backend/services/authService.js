const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

    const hashedPassword = await bcrypt.hash(password, 10); //hashes the password

    //creates new user
    const user = new User({
        full_name,
        email,
        password: hashedPassword,
        role:'user' //default
    })

    await user.save();
    return user;
}

//login api
exports.login = async (data) => {
    const { email, password } = data

    //check if the fields are empty
    if (!email || !password) {
        throw new Error('All fields are required')
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new Error ('Invalid email or password' )
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials' )
    }
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            {expiresIn:'1d'}
        );

        return{
            status:"Success",
            existingUser:{
                id:user._id,
                full_name:user.full_name,
                role:user.role
            },
            token
        };
};





    
