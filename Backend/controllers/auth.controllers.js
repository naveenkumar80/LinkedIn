import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signUp = async (req, res) => {
    try {
        let { firstName, lastName, email, password } = req.body;
        let existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ message: "Email already exists !" });
        }
        let existUserName= await User.findOne({ userName });
        if (existUserName) {
            return res.status(400).json({ message: "Username already exists !" });
        }

        let hassedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hassedPassword,
        });
        return res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}