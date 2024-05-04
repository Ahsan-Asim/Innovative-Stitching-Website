const mongoose = require("mongoose");

// Define user schema
const userSchema = new mongoose.Schema({
    name: { type: String, unique: true }, // Make 'name' field unique
    age: Number,
    email: { type: String, unique: true }, // Make 'email' field unique
    phone: String,
    gender: String,
    password: String
});

// Create user model
const User = mongoose.model('User', userSchema);

module.exports=User;