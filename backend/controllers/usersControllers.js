const User = require('../models/users')
const bcrypt = require('bcrypt');

//get user
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal Server Error!' })
    }
}

//create user
exports.createUsers = async (req, res) => {
    try {
        const { full_name, email, password, profile_pic, bio, role, isActive } = req.body;
        if(!full_name || !email || !password){
            return res.status(400).json({message:"All fields required"})
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        //hashedPassword
        const hashedPassword = await bcrypt.hash(password, 10);

        const newForm = new User({
            full_name,
            email,
            password: hashedPassword,
            profile_pic,
            role,
            bio,
            isActive
        })
        await newForm.save();
        res.status(201).json({ msg: 'New User Registered successfully' })
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal Server Error!' })
    }
}

//update user
exports.updateUser = async (req, res) => {
    try {
        const {id}=req.params;
        const {full_name, email, password, profile_pic, role, bio, isActive } = req.body;
        const updateData =
        {
            full_name,
            email,
            profile_pic,
            role,
            bio,
            isActive,
            last_updated: Date.now()
        };

        //only hash if password is provided        
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json({ msg: 'Updated successfully', user })
    }
    catch (err) {
        res.status(500).json({err})
    }
};

//delete user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await User.findByIdAndDelete({ _id: id })

        if (!result) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json({ msg: 'User deleted successfully', result })
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal Server Error!' })
    }
};

exports.getUserById=async(req, res)=>{
    try{
        const user=await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        res.json(user);
    }catch(err){
        res.status(500).json({message:"Internal error"})
    }
}