const jwt = require('jsonwebtoken');

// JWT authentication middleware
// Extracts token from cookies and verifies it
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ status: "error", message: "No token found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to request
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({ status: "error", message: "Token invalid or expired" });
    }
};

module.exports = authenticateJWT;