import { Auth } from "../model/auth.js";
import { passwordComparison, passwordHashing } from "../util/bcryptPassword.js";
import { generateToken } from "../util/generateToken.js";
import { success, error } from "../util/responseAPI.js";

export const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const account = await Auth.findOne({ email })
        if (account) {
            return res.status(400).json(error("Email already exists", 400));
        }
        const hashedPassword = await passwordHashing(password, 10);
        if (hashedPassword === null) {
            return res.status(500).json(error("Error in password hashing", 500));
        }
        console.log(hashedPassword, name, email);
        const data = await Auth.create({ name, email, password: hashedPassword });
        console.log(data);
        res.status(201).json(success("User created successfully", data, 201));
    } catch (err) {
        res.status(500).json(error("Internal Server Error", 500, err));
    }
}

export const logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json(error("Email and password are required", 400));
        }
        const account = await Auth.findOne({ email })
        if (!account) {
            return res.status(400).json(error("Account does not exist", 400));
        }
        const isPasswordValid = await passwordComparison(password, account.password);
        if (!isPasswordValid) {
            return res.status(400).json(error("Invalid email or password", 400));
        }
        // Generate JWT token
        const token = generateToken({ id: account._id });
        res.status(200).json(success("User logged in successfully", { token }, 200));
    } catch (err) {
        res.status(500).json(error("Internal Server Error", 500, err));
    }
}

export const logoutUser = (req, res) => {
    res.send("User logout")
}

export const refreshToken = (req, res) => {
    res.send("Refresh token")
}

export const changePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user.id;

    try {
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json(error("All fields are required", 400));
        }
        if (oldPassword === newPassword) {
            return res.status(400).json(error("New password must be different from old password", 400));
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json(error("New password and confirm password do not match", 400));
        }
        const account = await Auth.findById(userId);
        if (!account) {
            return res.status(400).json(error("Account does not exist", 400));
        }
        const isPasswordValid = await passwordComparison(oldPassword, account.password);
        if (!isPasswordValid) {
            return res.status(400).json(error("Old password is incorrect", 400));
        }
        const hashedPassword = await passwordHashing(newPassword, 10);
        await Auth.findByIdAndUpdate(userId, { password: hashedPassword });
        res.status(200).json(success("Password changed successfully", null, 200));

    } catch (err) {
        return res.status(500).json(error("Internal Server Error", 500, err));
    }
}

export const resetPassword = (req, res) => {
    res.send("Reset password")
}


export const getProfile = async (req, res) => {
    try {
        const { id } = req.user;
        if (!id) {
            return res.status(400).json(error("User ID is required", 400));
        }
        const user = await Auth.findById(id).select('-password');
        if (!user) {
            return res.status(404).json(error("User not found", 404));
        }
        res.status(200).json(success("User profile fetched successfully", user, 200));
    } catch (err) {
        return res.status(500).json(error("Internal Server Error", 500, err));
    }
}