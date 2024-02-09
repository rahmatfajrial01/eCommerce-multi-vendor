const express = require('express');
const router = express.Router();
const { register, resendOtp, verification, login, forgotPassword, resetPassword } = require('../controllers/userCtrls');

router.post("/register", register);
router.post("/verification", verification);
router.post("/resend-otp", resendOtp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

module.exports = router;
