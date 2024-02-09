const express = require('express');
const router = express.Router();
const { register, resendOtp, verification, login } = require('../controllers/userCtrls');

router.post("/register", register);
router.post("/verification", verification);
router.post("/resend-otp", resendOtp);
router.post("/login", login);

module.exports = router;
