const express = require("express")
const router = express.Router();
const { createProduct, getAProduct, deleteProduct, getAllProduct, sortProduct, updateProduct } = require('../controllers/productCtrls');
const { authGuard, adminGuard, sellerGuard } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer')

router.post("/", authGuard, sellerGuard, upload.single('image'), createProduct);
router.get("/", getAllProduct);
router.get("/filter", sortProduct);
router.get("/:slug", getAProduct);
router.delete("/:id", authGuard, adminGuard, deleteProduct);
router.put("/:id", authGuard, adminGuard, upload.single('image'), updateProduct);

module.exports = router