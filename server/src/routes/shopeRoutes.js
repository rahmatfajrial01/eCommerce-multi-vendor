const express = require('express');
const router = express.Router();
const { register, currentShope, updatePictureShope, updateInfoShope, updateAddressShope, getMemberShope } = require('../controllers/shopeCtrls');
const { authGuard } = require('../middlewares/authMiddleware');

router.post("/register", authGuard, register);
router.get("/current-shope", authGuard, currentShope);
router.get("/member-shope/:id", authGuard, getMemberShope);
router.put("/update-picture/:id", authGuard, updatePictureShope);
router.put("/update-info/:id", authGuard, updateInfoShope);
router.put("/update-address/:id", authGuard, updateAddressShope);

module.exports = router;
