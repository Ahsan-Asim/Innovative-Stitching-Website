const express = require("express");
const router = express.Router();
const multer = require("multer");

const bodyParser = require("body-parser");
const {
    handleLogin,
    handleSignUp,
    handleIndexFile,
    handleSign_Up,
    handleForgotPassword,
    handleForgotPasswordSubmit,
    handleemailverification,
    generateVerificationCode,
    sendVerificationEmail,
    handleadd_tailor,
    handleFindTailorByEmail,
    handleUpdateTailor,
    handleDeleteTailorbyEmail,
    handleGetUserByEmail,
    handleAdminPanel,
} = require('../controllers/user');

//multer
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


router.use(bodyParser.json());
router.use(express.static('views'));
router.use(bodyParser.urlencoded({ extended: true }));

// Routes
router.get("/", handleIndexFile);
router.get("/sign_up", handleSignUp);
router.get("/forgot", handleForgotPassword);
router.get("/emailverification", handleemailverification);
router.get("/admin", handleAdminPanel);

router.post("/log-in", handleLogin);
router.post('/sign_up', upload.single('image'), handleSign_Up); // Ensure upload is used correctly here
router.post("/emailverification", handleemailverification);
router.post("/forgot", handleForgotPasswordSubmit);

// Routes for tailor management
router.post("/add_tailor", handleadd_tailor);
router.post("/find_tailor", handleFindTailorByEmail);
router.post("/update_tailor", handleUpdateTailor);
router.post("/delete_tailor", handleDeleteTailorbyEmail);
router.get("/getUserByEmail", handleGetUserByEmail);

module.exports = router;
