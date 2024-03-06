const express = require('express');
const { getOrder2, getOrder2ByShope, changeOrderStatus } = require('../controllers/order2Ctrls');
const router = express.Router();
const { authGuard, adminGuard } = require('../middlewares/authMiddleware');


router.get("/", authGuard, getOrder2);
router.get("/order-by-shope", authGuard, getOrder2ByShope);
router.patch("/:id", authGuard, changeOrderStatus);

module.exports = router;