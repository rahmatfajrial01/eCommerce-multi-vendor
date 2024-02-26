const express = require('express');
const router = express.Router();
const { createMidtrans } = require('../controllers/midtransCtrls');
const { authGuard, adminGuard } = require('../middlewares/authMiddleware');

router.post("/", authGuard, createMidtrans);

module.exports = router;
