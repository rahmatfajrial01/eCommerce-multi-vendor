const express = require('express');
const { createOrder } = require('../controllers/orderCtrls');
const router = express.Router();
const { authGuard, adminGuard } = require('../middlewares/authMiddleware');

router.post("/", authGuard, createOrder);

module.exports = router;