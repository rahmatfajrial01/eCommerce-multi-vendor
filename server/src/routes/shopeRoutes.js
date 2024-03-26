const express = require('express');
const router = express.Router();
const { register, currentShope, updatePictureShope } = require('../controllers/shopeCtrls');
const { authGuard } = require('../middlewares/authMiddleware');

router.post("/register", authGuard, register);
router.get("/current-shope", authGuard, currentShope);
router.put("/update-picture/:id", authGuard, updatePictureShope);

module.exports = router;
