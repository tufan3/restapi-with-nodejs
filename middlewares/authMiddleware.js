const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const sToken = token.split(" ")[1];
        const decode = jwt.verify(sToken, process.env.JWT_SECRET);
        const id = decode.id;
        const user = await User.findById(id);
        
        req.user = user;

        next();

    } catch (error) {
        res.status(500).json({ 
            message: "Server error",
            error: error.message
        });
    }
};
