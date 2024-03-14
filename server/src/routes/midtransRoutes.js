const express = require('express');
const router = express.Router();
const { createMidtrans, getStatusOrder } = require('../controllers/midtransCtrls');
const { authGuard, adminGuard } = require('../middlewares/authMiddleware');

router.post("/", authGuard, createMidtrans);
router.get("/", authGuard, getStatusOrder);

module.exports = router;
