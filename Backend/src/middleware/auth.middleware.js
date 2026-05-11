require("dotenv").config();

const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {

    try {

        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = decoded.userId;
        req.role = decoded.role;

        next();

    } catch (err) {

        console.log("Auth middleware error:", err.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

module.exports = authMiddleware;