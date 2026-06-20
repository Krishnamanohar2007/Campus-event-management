require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const adminExists = await User.findOne({
            email: "admin@campus.com"
        });

        if (adminExists) {
            console.log("Admin already exists");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash(
            "admin@123",
            10
        );

        await User.create({
            name: "Admin",
            email: "admin@campus.com",
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin created successfully");

        process.exit();

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

seedAdmin();