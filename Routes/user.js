const express=require("express")
const router=express.Router();
const path = require("path");
const User = require("../Models/user"); // Adjust the path as needed
const bodyParser = require("body-parser");
const {handleLogin,handleSignUp,handleIndexFile,handleSign_Up,handleForgotPassword,handleemailverification}=require('../controllers/user');

router.use(bodyParser.json());
router.use(express.static('views'));
router.use(bodyParser.urlencoded({
    extended: true
}));



// Route for serving index.html
// router.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });
router.get("/",handleIndexFile);

// Route for serving sign_up.html
// router.get("/sign_up", (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'sign_up.html'));
// });
router.get("/sign_up",handleSignUp);
router.get("/forgot",handleForgotPassword);
router.get("/emailverification",handleemailverification);





// Route for processing sign up form submission
// router.post("/sign_up", async (req, res) => {
//     try {
//         // Check if user already exists based on email
//         const existingUser = await User.findOne({ email: req.body.email });
//         if (existingUser) {
//             return res.status(400).send("User with the same email already exists.");
//         }

//         // Create a new user instance
//         const newUser = new User({
//             name: req.body.name,
//             age: req.body.age,
//             email: req.body.email,
//             phone: req.body.phoneNumber,
//             gender: req.body.gender,
//             password: req.body.password
//         });

//         // Save the new user
//         await newUser.save();
//         console.log("Record inserted successfully");
//         return res.redirect('/');
//     } catch (error) {
//         console.error("Error:", error);
//         return res.status(500).send("Internal Server Error");
//     }
// });
// router.post("/sign_up",handleSignUp);

///for login
// app.post("/login", async (req, res) => {
//     try {
//         const user = await db.collection('users').findOne({ email: req.body.email });

//         if (user && user.password === req.body.password) {
//             return res.redirect('/');
//         } else {
//             res.send("Wrong Password or User Not Found");
//         }
//     } catch (error) {
//         console.error("Error occurred while logging in:", error);
//         res.status(500).send("Internal Server Error: " + error.message);
//     }
// });

// Route for processing login form submission
// router.post("/log-in", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         // Find user by email
//         const user = await User.findOne({ email });
//         // If user not found or password doesn't match, return error
//         if (!user || user.password !== password) {
//             return res.status(400).send("Invalid email or password");
//         }
//         // If user and password are correct, redirect to home page
//         return res.redirect('/');
//     } catch (error) {
//         console.error("Error occurred while logging in:", error);
//         res.status(500).send("Internal Server Error: " + error.message);
//     }
// });
router.post("/sign_up",handleSign_Up);
router.post("/log-in",handleLogin);


module.exports=router;
