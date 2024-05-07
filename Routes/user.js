// Import necessary modules and functions
const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const {
    handleLogin,
    handleSignUp,
    handleIndexFile,
    handleSign_Up,
    handleForgotPassword,
    handleForgotPasswordSubmit, // New controller function
    handleemailverification,
    generateVerificationCode,
    sendVerificationEmail,
} = require('../controllers/user');

// Middleware for parsing request body
router.use(bodyParser.json());
router.use(express.static('views'));
router.use(bodyParser.urlencoded({
    extended: true
}));

// Routes
router.get("/", handleIndexFile);
router.get("/sign_up", handleSignUp);
router.get("/forgot", handleForgotPassword);
router.get("/emailverification", handleemailverification);

router.post("/log-in", handleLogin);
router.post("/sign_up", handleSign_Up);
router.post("/emailverification", handleemailverification);

// New route for handling forgot password form submission
router.post("/forgotpassword", handleForgotPasswordSubmit);

module.exports = router;