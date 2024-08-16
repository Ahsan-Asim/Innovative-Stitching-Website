// Import necessary modules and functions
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { handleAddProduct, handleCustomerDashboard } = require('../controllers/product');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Routes
router.post("/addProduct", upload.single('image'), handleAddProduct);
router.get("/customer_dashboard", handleCustomerDashboard);

module.exports = router;
