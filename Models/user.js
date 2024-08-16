const mongoose = require("mongoose");

// Define user schema
const userSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    age: Number,
    email: { type: String, unique: true },
    phone: String,
    gender: String,
    role: String,
    password: String,
    imageUrl: String // Add this field
});


// Create user model
const User = mongoose.model('User', userSchema);

module.exports=User;