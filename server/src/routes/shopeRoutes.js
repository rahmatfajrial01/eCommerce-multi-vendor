const express = require('express');
const router = express.Router();
const { register, currentShope } = require('../controllers/shopeCtrls');
const { authGuard } = require('../middlewares/authMiddleware');

router.post("/register", authGuard, register);
router.get("/current-shope/:id", authGuard, currentShope);

module.exports = router;
