const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../Models/user"); // Adjust the path as needed
const bodyParser = require("body-parser");
const {
    handleLogin,
    handleSignUp,
    handleIndexFile,
    handleSign_Up,
    handleForgotPassword,
    handleemailverification,
    generateVerificationCode,
    sendVerificationEmail,
} = require('../controllers/user');

router.use(bodyParser.json());
router.use(express.static('views'));
router.use(bodyParser.urlencoded({
    extended: true
}));

// Route for serving index.html
router.get("/", handleIndexFile);

// Route for serving sign_up.html
router.get("/sign_up", handleSignUp);
router.get("/forgot", handleForgotPassword);
router.get("/emailverification", handleemailverification);

// Route for processing login form submission
router.post("/log-in", handleLogin);

// Route for processing sign up form submission
router.post("/sign_up", handleSign_Up);

// Route for processing email verification form submission
router.post("/emailverification", handleemailverification);

module.exports = router;
