const User = require("../Models/user");
const bodyParser = require("body-parser");
const express=require("express")
const router=express.Router();
const path = require("path");
const nodemailer = require('nodemailer');



router.use(bodyParser.json());
router.use(express.static('views'));
router.use(bodyParser.urlencoded({
    extended: true
}));

let role="";


// Function to generate a random 8-digit verification code
function generateVerificationCode() {
    return Math.floor(10000000 + Math.random() * 90000000);
}

// Function to send verification email
async function sendVerificationEmail(email, verificationCode) {
    try {
        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Your App" <f219202@cfd.nu.edu.pk>',
            to: email,
            subject: 'Email Verification',
            text: `Your verification code is: ${verificationCode}`
        });
        console.log('Verification email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}
////////////////////////



async function handleadd_tailor(req, res) {
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
            role:req.body.role,
            password: req.body.password
        });

        // Save the new user
        await newUser.save();
        console.log("Record inserted successfully");

        // Generate verification code
        const verificationCode = generateVerificationCode();

        // Send verification email
        await sendVerificationEmail(newUser.email, verificationCode);

        // Store verification code in a global variable or session (not recommended for production)
        global.verificationCode = verificationCode;
        role=newUser.role;

        // Redirect to email verification page
        return res.redirect('/admin.html');
    
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}




module.exports={
    generateVerificationCode,
    sendVerificationEmail,
    handleadd_tailor
}
