const express = require('express');
const router = express.Router();
const { addCart, getCart, deleteCart, changeQtyCart } = require('../controllers/cartCtrls');
const { authGuard } = require('../middlewares/authMiddleware');

router.post("/", authGuard, addCart);
router.get("/", authGuard, getCart);
router.delete("/:id/:idShope", authGuard, deleteCart);
router.patch("/:id", authGuard, changeQtyCart);

module.exports = router;
