const express = require('express');
const { createOrder, getOrder, updateShippment, updateShippmentCost, getCost, sendOrder, clearCost } = require('../controllers/orderCtrls');
const router = express.Router();
const { authGuard, adminGuard } = require('../middlewares/authMiddleware');

router.post("/", authGuard, createOrder);
router.get("/", authGuard, getOrder);
router.get("/cost", authGuard, getCost);
router.post("/send-order", authGuard, sendOrder);
router.put("/update-shippment", authGuard, updateShippment);
router.put("/update-shippment-cost", authGuard, updateShippmentCost);
router.patch("/clear-cost", authGuard, clearCost);

module.exports = router;