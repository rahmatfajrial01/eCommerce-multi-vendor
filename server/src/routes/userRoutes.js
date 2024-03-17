const express = require('express');
const router = express.Router();
const { register, resendOtp, verification, login, forgotPassword, resetPassword, loginGoogle, getAllUser, singleUser, addAddress, deleteAddress, addToWishlist, getWishlist, updateProfile, updateProfilePicture } = require('../controllers/userCtrls');
const { authGuard } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');

router.post("/register", register);
router.post("/verification", verification);
router.post("/resend-otp", resendOtp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.post("/google", loginGoogle);
router.get("/", getAllUser);
router.get("/current-user", authGuard, singleUser);
router.get("/wishlist", authGuard, getWishlist);
router.patch("/wishlist/:productId", authGuard, addToWishlist);
router.post("/add-address", authGuard, addAddress);
router.delete("/delete-address/:id", authGuard, deleteAddress);
router.put("/update-profile", authGuard, updateProfile);
router.put("/update-profile-picture", authGuard, upload.single('profilePicture'), updateProfilePicture);



module.exports = router;
