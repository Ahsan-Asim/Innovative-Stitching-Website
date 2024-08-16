const mongoose = require("mongoose");

// Define product schema
const proSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    price: Number,
    email: { type: String, unique: true },
    phone: String,
    code: String,
    image: String  // Add this line
});

// Create product model
const Pro = mongoose.model('Pro', proSchema);

module.exports = Pro;
