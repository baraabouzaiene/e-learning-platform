const jwt = require("jsonwebtoken");
const accesskey = process.env.accesstoken;

// check if user is logged in (has valid token)
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, accesskey);
        req.user = decoded; // { id, role }/ here is where req.user is created
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

// check if user has required role
const checkRole = (roles = []) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied. Unauthorized role." });
        }
        next();
    };
};

module.exports = { verifyToken, checkRole };
