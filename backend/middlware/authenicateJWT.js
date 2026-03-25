const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ status: "error", message: "No token found" })
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        //set user data to req.user
        req.user=decoded;
        next();
    } catch (err) {
        return res.status(401).json({status:"error", message:'Token invalid or expired'})
    }
}

module.exports=authenticateJWT;