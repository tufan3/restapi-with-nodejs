const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.singup = async (req, res, next) => {
    req.body.password = await bcrypt.hash(req.body.password, 11);
    const { name, email, username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const user = await User.create({ name, email, username, password });

        res.status(201).json({ 
            message: 'User created successfully',
            user: user,
        });
    } catch (error) {
        res.status(401).json({ 
            message: 'Server error',
        });
    }

}

// login controller
exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        } 
        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password doesn\'t match' });
        }

        const token = jwt.sign({username, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ 
            message: 'Login successful',
            user: user,
            token: token,
        });

    }catch (error) {
        res.status(401).json({ 
            message: 'Server error',
        });
    }
};