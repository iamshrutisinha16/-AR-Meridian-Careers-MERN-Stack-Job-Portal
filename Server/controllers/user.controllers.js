import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }
        const file = req.file;
        let cloudResponse = "";
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }

        const existedUser = await User.findOne({ email: email });
        if (existedUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let url = null;
        if (file && cloudResponse) {
            url = cloudResponse.secure_url;
        }

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: url,
            },
        });

        return res.status(201).json({
            message: 'Account created',
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Email or password is missing",
                success: false,
            });
        }

        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch || role != user.role) {
            return res.status(400).json({
                message: "Incorrect Credentials",
                success: false,
            });
        }

        const tokenData = {
            userId: user._id,
        };

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        console.log("REQ BODY DATA:", req.body); 
        console.log("REQ FILE:", req.file);
        const { fullname, email, phoneNumber, bio, skills, experience, department } = req.body;
        const file = req.file;

        let cloudResponse = "";

        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: 'auto',
            });
        }

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",").map(skill => skill.trim());
        }

        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            });
        }

        if (fullname !== undefined) user.fullname = fullname;
        if (email !== undefined) user.email = email;
        if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
        if (bio !== undefined) user.profile.bio = bio;
        
        // Handle experience and department properly
        if (experience !== undefined && experience !== "") {
            user.profile.experience = Number(experience);
        }
        if (department !== undefined) {
            user.profile.department = department;
        }

        if (skillsArray) {
            user.profile.skills = skillsArray;
        }

        if (file && cloudResponse) {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};