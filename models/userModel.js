const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profile:{
    type: String,
    default: "avatar.png"
  }
},
{ 
    timestamps: true,
}
);

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;