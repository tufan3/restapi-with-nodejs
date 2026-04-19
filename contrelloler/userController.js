const User = require('../models/userModel');
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(401).json({ 
            message: 'Server error',
        });
    }
};

// update user profile
exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        const updatedUser = await User.findByIdAndUpdate(
             userId,
             req.body,
            { new: true }
        );
        res.status(200).json({ 
            message: 'User updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        res.status(401).json({ 
            message: 'You can update only your profile',
            error: error.message
        });
    }
};

//delete user profile
exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const deletedUser = await User.findByIdAndDelete(userId);
        res.status(200).json({ 
            message: 'User deleted successfully',
            user: deletedUser,
        });
    } catch (error) {
        res.status(401).json({
            message: 'You can delete only your profile',
            error: error.message
        });
    }
};