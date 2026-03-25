const User = require('../models/users')
const bcrypt = require('bcrypt');

//get user profile
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        console.log(req.user)
        if (!user) {
            return res.status(404).json({ status: "error", message: 'User not found' })
        }
        console.log("User found:", user);

        console.log("User")
        return res.status(200).json({ status: "Success", data: user })
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: "error", message: "Server error" })
    }
}

//update profile
exports.updateProfile = async (req, res) => {
    try {
        const { full_name, email, password, profile_pic, bio } = req.body;
        const updateData =
        {
            full_name,
            email,
            profile_pic,
            bio,
            last_updated: Date.now()
        };
        

        //only hash if password is provided        
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            updateData,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json({ msg: 'Profile updated successfully', user })
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal Server Error!' })
    }
};
