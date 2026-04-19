const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        trim: true,
        default: "Admin"
    },
    category: {
        type: Array,
        required: false,
    },
    photo: {
        type: String,
        default: "post.png"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);