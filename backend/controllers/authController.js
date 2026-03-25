const authService = require('../services/authService');
const jwt = require('jsonwebtoken')
const User = require('../models/users')

exports.signup = async (req, res) => {
    try {
        const result = await authService.signup(req.body);

        return res.status(201).json({
            message: 'Signup successful',
            user: result.user
        });
    } catch (err) {
        return res.status(400).json({ message: 'Login unsuccessful' })
    }
}

exports.login = async (req, res) => {
    try {
        const result = await authService.login(req.body);

        //set token cookie
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000 //1hr
        });

        return res.status(200).json({
            status: "Success",
            message: 'Login successful',
            token: result.token,
            user: result.existingUser
        })
    } catch (err) {
        console.error("LOGIN ERROR:", err.message)
        res.status(400).json({
            status: "error",
            message: err.message
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ status: "error", message: "No token found" })
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ status: 'error', message: "Token invalid or expired" })
        }

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ status: "error", message: 'User not found' })
        }

        return res.status(200).json({ status: "Success", data: user })
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: "error", message: "Server error" })
    }
}

exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/'
    });
    return res.status(200).json({ status: "Success", message: "Logged out successfully" })
}
