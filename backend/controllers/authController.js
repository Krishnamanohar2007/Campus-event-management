const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
  try{
    const { name, email, password,role } = req.body;
    if(!name || !email || !password || !role){
        return res.status(400).json({ message: "Please provide all required fields" });
    }
    if(role==="admin"){
        return res.status(400).json({ message: "Cannot Register as Admin" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({ message: "User registered successfully", user });
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}


const login = async (req, res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            {
                id:user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        )
        res.status(200).json({ message: "Login successful", token ,user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        }});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

const profile = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    register,
    login,
    profile
}
