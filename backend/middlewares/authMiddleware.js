const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try{
        const authheader = req.headers.authorization;
        if(!authheader){
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authheader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        req.user = user;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid Token" });
    }
}

module.exports = { protect };