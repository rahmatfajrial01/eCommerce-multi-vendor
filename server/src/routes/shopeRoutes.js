const express = require('express');
const router = express.Router();
const { register, currentShope, updatePictureShope, updateInfoShope, updateAddressShope, getMemberShope, getNewMember, acceptMember, getAllShope, getShope } = require('../controllers/shopeCtrls');
const { authGuard } = require('../middlewares/authMiddleware');

router.post("/register", authGuard, register);
router.get("/current-shope", authGuard, currentShope);
router.get("/", authGuard, getAllShope);
router.get("/:shopeName", getShope);
router.get("/member-shope/:id", authGuard, getMemberShope);
router.post("/new-member", authGuard, getNewMember);
router.put("/update-picture/:id", authGuard, updatePictureShope);
router.put("/update-info/:id", authGuard, updateInfoShope);
router.put("/update-address/:id", authGuard, updateAddressShope);
router.put("/accept-member/:id/:shopeId", authGuard, acceptMember);

module.exports = router;
