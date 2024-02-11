const express = require('express');
const router = express.Router();
const { register, resendOtp, verification, login, forgotPassword, resetPassword, loginGoogle, getAllUser, singleUser } = require('../controllers/userCtrls');
const { authGuard } = require('../middlewares/authMiddleware');

router.post("/register", register);
router.post("/verification", verification);
router.post("/resend-otp", resendOtp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.post("/google", loginGoogle);
router.get("/", getAllUser);
router.get("/current-user", authGuard, singleUser);


module.exports = router;
