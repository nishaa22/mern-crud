import User from "../model/user.js";
import { error, success } from "../util/responseAPI.js";

export const getUsers = async (req, res) => {
    try {
        const data = await User.find();
        res.status(200).json(success("Users fetched successfully", data, 200));
    } catch (error) {
        res.status(500).json(error("Failed to get users", 500, error));
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, email, address } = req.body;

        // 1. Basic validation
        if (!name || !email || !address) {
            return res.status(400).json(error("All fields are required", 400) );
        }

        // 2. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json(error("User already exists", 409) );
        }
        // 3. Create user
        const user = await User.create({
            name,
            email,
            address
        });

        await user.save();

        // 4. Send response
        res.status(201).json(success("User created successfully", user, 201));

    } catch (error) {
        console.error(error);
        res.status(500).json(error("Server error", 500, error) );
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json(error("ID is required", 400) );
        } else {
            const user = await User.findOne({ "_id": id });
            if (!user) {
                return res.status(404).json(error("User not found", 404) );
            }   
            res.status(200).json(success("User fetched successfully", user, 200));
        }

    } catch (error) {
        console.error(error);
        res.status(500).json(error("Server error", 500, error) );
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, address } = req.body;
    try {
        if (!id) {
            return res.status(400).json(error("ID is required", 400) );
        } else {
            const user = await User.findOne({ "_id": id });
            if (!user) {
                return res.status(404).json(error("User not found", 404) );
            }
            user.name = name;
            user.email = email;
            user.address.city = address.city;
            user.address.state = address.state;
            user.address.pincode = address.pincode;
            await user.save();
            res.status(200).json(success("User updated successfully", user, 200));
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(error("Server error", 500, error) );
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json(error("ID is required", 400) );
        } else {
            const user = await User.findOneAndDelete({ "_id": id });
            if (!user) {
                return res.status(404).json(error("User not found", 404) );
            }
            res.status(200).json(success("User deleted successfully", user, 200));
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(error("Server error", 500, error) );
    }
}
