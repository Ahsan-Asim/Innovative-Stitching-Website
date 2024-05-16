// Import necessary modules and functions
const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");


// Middleware for parsing request body
router.use(bodyParser.json());
router.use(express.static('views'));
router.use(bodyParser.urlencoded({
    extended: true
}));

const {
    
    handleadd_tailor,
    generateVerificationCode,
    sendVerificationEmail
} = require('../controllers/manager');


router.post("/add_tailor",handleadd_tailor);
module.exports = router;