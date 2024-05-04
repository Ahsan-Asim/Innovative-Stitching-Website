const User = require("../Models/user");
const bodyParser = require("body-parser");
const express=require("express")
const router=express.Router();

router.use(bodyParser.json());
router.use(express.static('views'));
router.use(bodyParser.urlencoded({
    extended: true
}));

async function handleLogin(req,res){
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await User.findOne({ email });
        // If user not found or password doesn't match, return error
        if (!user || user.password !== password) {
            return res.status(400).send("Invalid email or password");
        }
        // If user and password are correct, redirect to home page
        return res.redirect('/');
    } catch (error) {
        console.error("Error occurred while logging in:", error);
        res.status(500).send("Internal Server Error: " + error.message);
    }
}

async function handleSign_Up(req,res){
    try {
        // Check if user already exists based on email
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send("User with the same email already exists.");
        }

        // Create a new user instance
        const newUser = new User({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            phone: req.body.phoneNumber,
            gender: req.body.gender,
            password: req.body.password
        });

        // Save the new user
        await newUser.save();
        console.log("Record inserted successfully");
        return res.redirect('/');
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}

async function handleIndexFile(req,res){
    res.sendFile(path.join(__dirname, 'views', 'index.html'));

}

async function handleSignUp(req,res){
    res.sendFile(path.join(__dirname, 'views', 'sign_up.html'));

}

async function handleForgotPassword(req,res){
    res.sendFile(path.join(__dirname, 'views', 'forgot.html'));

}

async function handleemailverification(req,res){
    res.sendFile(path.join(__dirname, 'views', 'emailverification.html'));

}

module.exports={
    handleLogin,
    handleSignUp,
    handleIndexFile,
    handleSign_Up,
    handleForgotPassword,
    handleemailverification
}