const express = require("express");
const bodyParser = require("body-parser");
const userRouter=require("./Routes/user")
const {connectMongoDb}=require('./connection');
const {logReqRes}=require("./middlewares")
// const User = require("./Models/user"); // Import User model

const app = express();

app.use(bodyParser.json());
app.use(express.static('views'));
app.use(bodyParser.urlencoded({
    extended: true
}));

connectMongoDb('mongodb://localhost:27017/WEBO');

app.use(logReqRes("log.txt"));

app.use("/",userRouter);


// // Route for serving index.html
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

// // Route for serving sign_up.html
// app.get("/sign_up", (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'sign_up.html'));
// });



// // Route for processing sign up form submission
// app.post("/sign_up", async (req, res) => {
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

// ///for login
// // app.post("/login", async (req, res) => {
// //     try {
// //         const user = await db.collection('users').findOne({ email: req.body.email });

// //         if (user && user.password === req.body.password) {
// //             return res.redirect('/');
// //         } else {
// //             res.send("Wrong Password or User Not Found");
// //         }
// //     } catch (error) {
// //         console.error("Error occurred while logging in:", error);
// //         res.status(500).send("Internal Server Error: " + error.message);
// //     }
// // });

// // Route for processing login form submission
// app.post("/log-in", async (req, res) => {
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


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


















//////////////without login functionality/////////////
// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const path = require("path");

// const app = express();

// app.use(bodyParser.json());
// app.use(express.static('views'));
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// mongoose.connect('mongodb://localhost:27017/WEB_DB', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', () => console.log("Error in connectivity to DB"));
// db.once('open', () => console.log("Connected to Database"));

// // Define user schema
// const userSchema = new mongoose.Schema({
//     name: { type: String, unique: true }, // Make 'name' field unique
//     age: Number,
//     email: String,
//     phone: String,
//     gender: String,
//     password: { type: String, unique: true } // Make 'password' field unique
// });

// // Create user model
// const User = mongoose.model('User', userSchema);

// // Route for serving index.html
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

// // Route for serving sign_up.html
// app.get("/sign_up", (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'sign_up.html'));
// });

// app.post("/sign_up", async (req, res) => {
//     try {
//         // Check if user already exists based on name and password
//         const existingUser = await User.findOne({ name: req.body.name, password: req.body.password });
//         if (existingUser) {
//             return res.status(400).send("User with the same name and password already exists.");
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

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// });


















////////////2nd part////////////////
// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const path = require("path"); // Import path module to handle file paths

// const app = express();

// app.use(bodyParser.json());
// app.use(express.static('views'));
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// mongoose.connect('mongodb://localhost:27017/WEB_DB', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', () => console.log("Error in connectivity to DB"));
// db.once('open', () => console.log("Connected to Database"));

// // Route for serving index.html
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

// // Route for serving sign_up.html
// app.get("/sign_up", (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'sign_up.html'));
// });

// app.get("/emailverification", (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'emailverification.html'));
// });

// app.get("/log-in", (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'log-in.html'));
//   });

// app.get("/forgot", (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'forgot.html'));
//   });

// app.post("/sign_up", (req, res) => {
//     var name = req.body.name;
//     var age = req.body.age;
//     var email = req.body.email;
//     var phoneNumber = req.body.phoneNumber;
//     var gender = req.body.gender;
//     var password = req.body.password;

//     var data = {
//         "name": name,
//         "age": age,
//         "email": email,
//         "phone": phoneNumber,
//         "gender": gender,
//         "password": password
//     };
//     db.collection('users').insertOne(data, (err, collection) => {
//         if (err) {
//             throw err;
//         }
//         console.log("record inserted successfully");
//     });
//     return res.redirect('/'); // Redirect to index.html after sign up
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// });




















// //////////////////////2nd code/////////////////////
// var express=require("express")
// var bodyParser=require("body-parser")
// var mongoose=require("mongoose")
// const { Console } = require("console")

// const app=express()

// app.use(bodyParser.json())
// app.use(express.static('views'))
// app.use(bodyParser.urlencoded({
//     extended:true
// }))

// mongoose.connect('mongodb://localhost:27017/WEB_DB')
// var db=mongoose.connection
// db.on('error',()=>Console.log("Error in connectivity to DB"))
// db.once('open',()=>console.log("connected to Database"))



// app.post("/sign_up",(req,res)=>{
//     var name=req.body.name
//     var age=req.body.age
//     var email=req.body.email
//     var phoneNumber=req.body.phoneNumber
//     var gender=req.body.gender
//     var password=req.body.password
    

//     var data={
//         "name":name,
//         "age":age,
//         "email":email,
//         "phone":phoneNumber,
//         "gender":gender,
//         "password":password
//     }
//     db.collection('users').insertOne(data,(err,collection)=>{
//         if(err){
//             throw err;
//         }
//         console.log("record inserted successfully")
//     })
//     return res.redirect('log-in.html')
// })

// // app.get("/",(req,res)=>{
// //     res.set({
// //         "Allow-acces-Allow-Origin":'*'
// //     })
// //     return res.sendFile(path.join(__dirname, 'views', 'sign_up.html'));
// // }).listen(3000);

// app.get("/", (req, res) => {
//   res.set({
//       "Allow-acces-Allow-Origin":'*'
//   })
//   return res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });



// // app.get('/', (req, res) => {
// //   res.set({
// //     "Allow-acces-Allow-Origin":'*'
// // })
// //     res.status(200);
// //     return res.sendFile(path.join(__dirname, 'views', 'index.html'));
// //   }).listen(3000);

// //   app.get('/sign_up', (req, res) => {
// //     res.set({
// //       "Allow-acces-Allow-Origin":'*'
// //   })
// //     return res.sendFile(path.join(__dirname, 'views', 'login.html'));
// //   }).listen(3000);
  
// //   app.get('/log-in', (req, res) => {
// //     res.set({
// //       "Allow-acces-Allow-Origin":'*'
// //   })
// //     return res.sendFile(path.join(__dirname, 'views', 'login.html'));
// //   }).listen(3000);
  

// app.listen(3000, () => {
//   console.log("Server is listening on port 3000");
// });



// ///////////////////////last code///////



























// // const express = require('express');
// // const path = require('path');
// // const bodyParser = require('body-parser');
// // const mongoose = require('mongoose');
// // const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
// // const User = require('./user');

// // const app = express();

// // // Serve static files such as HTML, CSS, and JavaScript
// // app.use(express.static(path.join(__dirname, 'views')));
// // app.use(express.static(path.join(__dirname, 'views', 'assets')));

// // // Body parser middleware
// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(bodyParser.json());

// // // MongoDB connection
// // mongoose.connect('mongodb://localhost:27017/connectiondb', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // });
// // const db = mongoose.connection;
// // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// // db.once('open', () => {
// //   console.log('Connected to MongoDB');
// // });

// // // Function to hash the password before saving the user
// // const hashPassword = async (password) => {
// //   const saltRounds = 10;
// //   return await bcrypt.hash(password, saltRounds);
// // };

// // // Routes
// // app.get('/', (req, res) => {
// //   res.status(200);
// //   return res.sendFile(path.join(__dirname, 'views', 'index.html'));
// // });

// // app.get('/login', (req, res) => {
// //   return res.sendFile(path.join(__dirname, 'views', 'login.html'));
// // });

// // app.post('/signup', async (req, res) => {
// //   const { firstName, lastName, email, password,confirmPassword, phoneNumber } = req.body;

// //   try {
// //     const hashedPassword = await hashPassword(password); // Hash the password
// //     const newUser = new User({ firstName, lastName, email, password: hashedPassword,confirmPassword:hashedPassword, phoneNumber }); // Save hashed password
// //     await newUser.save();
// //     res.send('User signed up successfully!');
// //   } catch (error) {
// //     console.error('Error signing up:', error);
// //     res.status(500).send('Error signing up. Please try again later.');
// //   }
// // });

// // const PORT = process.env.PORT || 8000;

// // app.listen(PORT, (error) => {
// //   if (!error)
// //     console.log("Server is Successfully Running, and App is listening on port " + PORT);
// //   else
// //     console.log("Error occurred, server can't start", error);
// // });
