import bcrypt from "bcryptjs";
import { config } from "dotenv";
import mongoose from "mongoose";
import User from "../models/user.js";

config();

const DATABASE_URL = 'mongodb://localhost:27017/mobile_post';

export const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("[LOG]: Database connection successful");

        // Seeding
        const _user = await User.findOne({ email: "admin@gmail.com" });
        if (_user) return;

        const hashed = await bcrypt.hash("admin@pass123", 10);
        const user = {
            fullname: "Admin First Name",
            email: "admin@gmail.com",
            mobile: "+250782307144",
            password: hashed,
            role: "ADMIN"
        };

        const newUser = new User(user);
        await newUser.save();
        console.log("Database seeded successfully");
    } catch (err) {
        console.error("Failed to connect to database or perform operations:", err);
    }
};

// Call connectDB to initiate the connection and seeding
connectDB();
