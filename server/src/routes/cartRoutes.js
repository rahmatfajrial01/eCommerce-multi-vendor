const express = require('express');
const router = express.Router();
const { addCart, getCart, deleteCart } = require('../controllers/cartCtrls');
const { authGuard } = require('../middlewares/authMiddleware');

router.post("/", authGuard, addCart);
router.get("/", authGuard, getCart);
router.delete("/:id", authGuard, deleteCart);

module.exports = router;
