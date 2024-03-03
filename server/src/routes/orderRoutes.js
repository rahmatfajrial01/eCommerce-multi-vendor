const express = require('express');
const { createOrder, getOrder, updateShippment, updateShippmentCost } = require('../controllers/orderCtrls');
const router = express.Router();
const { authGuard, adminGuard } = require('../middlewares/authMiddleware');

router.post("/", authGuard, createOrder);
router.get("/", authGuard, getOrder);
router.put("/update-shippment", authGuard, updateShippment);
router.put("/update-shippment-cost", authGuard, updateShippmentCost);

module.exports = router;