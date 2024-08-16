const User = require("../Models/user");
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const path = require("path");
const nodemailer = require("nodemailer");

router.use(bodyParser.json());
router.use(express.static("views"));
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

let role = "";

/////for the forgot hndler///
async function handleForgotPasswordSubmit(req, res) {
  try {
    const { name, password } = req.body;

    // Check if user exists based on name
    const user = await User.findOne({ name });
    if (!user) {
      // If user doesn't exist, redirect to signup page with an alert
      return res.redirect(
        "/sign_up.html?alert=User%20does%20not%20exist.%20Please%20sign%20up."
      );
    }

    // Update the user's password
    user.password = password;
    await user.save();

    // Redirect to login page with a success alert
    return res.redirect(
      "/log-in.html?alert=Password%20updated%20successfully.%20Please%20login."
    );
  } catch (error) {
    console.error("Error occurred during password update:", error);
    // Redirect to signup page with an error alert
    return res.redirect(
      "/sign_up.html?alert=An%20error%20occurred.%20Please%20try%20again."
    );
  }
}

///////////

////////////nodemailer code///
// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "f219202@cfd.nu.edu.pk",
    pass: "Ahsan123#",
  },
});

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
      subject: "Email Verification",
      text: `Your verification code is: ${verificationCode}`,
    });
    console.log("Verification email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}
////////////////////////

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).send("Invalid email or password");
    }

    if (user.role == "customer") {
      return res.redirect("/dynamic_customer_dashboard.html");
    } else if (user.role == "manager") {
      return res.redirect(`/admin?email=${email}`);
    } else {
      return res.redirect("/log-in.html");
    }
  } catch (error) {
    console.error("Error occurred while logging in:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
}


// async function handleSign_Up(req,res){
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
//         // Inside handleSign_Up function
// // Generate verification code
// const verificationCode = generateVerificationCode();

// // Send verification email
// await sendVerificationEmail(newUser.email, verificationCode);

// // Store verification code in a global variable or session (not recommended for production)
// global.verificationCode = verificationCode;

// // Redirect to email verification page
// return res.redirect('/emailverification');

//         // return res.redirect('/');
//     } catch (error) {
//         console.error("Error:", error);
//         return res.status(500).send("Internal Server Error");
//     }
// }

async function handleSign_Up(req, res) {
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
          role: req.body.role,
          password: req.body.password,
          imageUrl: req.file ? req.file.filename : null // Save the uploaded image filename
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
      role = newUser.role;

      // Redirect to email verification page
      return res.redirect("/emailverification.html");
  } catch (error) {
      console.error("Error:", error);
      return res.status(500).send("Internal Server Error");
  }
}

async function handleIndexFile(req, res) {
  res.sendFile(path.join(__dirname, "views", "index.html"));
}

async function handleSignUp(req, res) {
  res.sendFile(path.join(__dirname, "views", "sign_up.html"));
}

async function handleForgotPassword(req, res) {
  res.sendFile(path.join(__dirname, "views", "forgot.html"));
}

// async function handleemailverification(req,res){
//     res.sendFile(path.join(__dirname, 'views', 'emailverification.html'));

// }

async function handleemailverification(req, res) {
  try {
    const { verificationCode } = req.body;

    // Check if the verification code matches the global verification code
    if (verificationCode == global.verificationCode) {
      // If the verification code is correct, clear the global verification code
      global.verificationCode = null;

      // Redirect to the home page or any other page as needed
      if (role == "customer") {
        return res.redirect("/dynamic_customer_dashboard.html");
      } else if (role == "manager") {
        return res.redirect("/admin.html");
      } else {
        return res.redirect("/log-in.html");
      }
    } else {
      // If the verification code is incorrect, return an error message
      return res.status(400).send("Invalid verification code");
    }
  } catch (error) {
    console.error("Error occurred during email verification:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
}

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
      role: req.body.role,
      password: req.body.password,
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
    role = newUser.role;

    // Redirect to email verification page
    return res.redirect("/admin.html");
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
}

async function handleFindTailorByEmail(req, res) {
  try {
    // Find tailor by email
    const foundTailor = await User.findOne({ email: req.body.email });

    // If tailor not found, send response
    if (!foundTailor) {
      return res.status(404).send("Tailor not found.");
    }

    // Redirect to update.html with tailor details as query parameters
    return res.redirect(
      `/update_tailor.html?name=${foundTailor.name}&age=${foundTailor.age}&email=${foundTailor.email}&phone=${foundTailor.phone}&gender=${foundTailor.gender}&role=${foundTailor.role}`
    );
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
}

// async function handleUpdateTailor(req, res) {
//     try {
//         // Extract data from the request body
//         const { name, age, email, phone, gender, role,password } = req.body;

//         // Find the tailor by ID
//         const foundTailor = await User.findOne({ email });

//         // If tailor not found, send response
//         if (!foundTailor) {
//             return res.status(404).send("Tailor not found.");
//         }

//         // Update tailor details
//         foundTailor.name = name;
//         foundTailor.age = age;
//         foundTailor.email = email;
//         foundTailor.phone = phone;
//         foundTailor.gender = gender;
//         foundTailor.role = role;
//         foundTailor.password = password;

//         // Save the updated tailor
//         await foundTailor.save();

//         return res.redirect('/admin.html');

//         // Redirect to a success page or send a success response
//         // return res.status(200).send("Tailor updated successfully.");

//     } catch (error) {
//         console.error("Error:", error);
//         return res.status(500).send("Internal Server Error");
//     }
// }

async function handleUpdateTailor(req, res) {
  try {
    // Extract data from the request body
    const { name, age, email, phone, gender, role, password } = req.body;

    // Find the tailor by email
    const foundTailor = await User.findOne({ email });

    // If tailor not found, send response
    if (!foundTailor) {
      return res.status(404).send("Tailor not found.");
    }

    // Update tailor details
    foundTailor.name = name;
    foundTailor.age = age;
    foundTailor.phone = phone;
    foundTailor.gender = gender;
    foundTailor.role = role;
    foundTailor.password = password;

    // Save the updated tailor
    await foundTailor.save();

    // Send email to updated tailor with new password
    const mailOptions = {
      from: "f219202@cfd.nu.edu.pk.com",
      to: email,
      subject: "Your password has been updated",
      text: `Dear ${name}, your password has been updated successfully. Your new password is: ${password}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent to updated tailor with new password.");

    // Redirect to admin.html
    return res.redirect("admin");
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
}

async function handleDeleteTailorbyEmail(req, res) {
  try {
    // Find tailor by email
    const foundTailor = await User.findOneAndDelete({
      email: req.body.email,
      role: "tailor",
    });

    // If tailor not found, send response
    if (!foundTailor) {
      return res.status(404).send("Tailor not found.");
    }

    // Redirect to admin.html with tailor details as query parameters
    return res.redirect(
      `admin?name=${foundTailor.name}&age=${foundTailor.age}&email=${foundTailor.email}&phone=${foundTailor.phone}&gender=${foundTailor.gender}&role=${foundTailor.role}`
    );
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
}



async function handleGetUserByEmail(req, res) {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
};



async function handleAdminPanel(req, res) {
  try {
      const tailors = await User.find({ role: 'tailor' }); // Adjust query based on your role definition
      res.render('admin', { tailors });
  } catch (error) {
      console.error("Error fetching tailors:", error);
      res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  handleLogin,
  handleSignUp,
  handleIndexFile,
  handleSign_Up,
  handleForgotPassword,
  handleemailverification,
  generateVerificationCode,
  sendVerificationEmail,
  handleForgotPasswordSubmit,
  handleadd_tailor,
  handleFindTailorByEmail,
  handleUpdateTailor,
  handleDeleteTailorbyEmail,
  handleGetUserByEmail,
  handleAdminPanel,
};
