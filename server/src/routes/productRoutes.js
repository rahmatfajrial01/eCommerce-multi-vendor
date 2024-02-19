const express = require("express")
const router = express.Router();
const { createProduct, getAProduct, deleteProduct, getAllProduct } = require('../controllers/productCtrls');
const { authGuard, adminGuard } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer')

router.post("/", authGuard, adminGuard, upload.single('image'), createProduct);
router.get("/", getAllProduct);
router.get("/:id", getAProduct);
router.delete("/:id", authGuard, adminGuard, deleteProduct);

module.exports = router