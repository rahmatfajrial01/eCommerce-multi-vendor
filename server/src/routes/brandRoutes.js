const express = require('express');
const router = express.Router();
const { createBrand, getAllBrand, deleteBrand } = require('../controllers/brandCtrls');
const { authGuard, adminGuard } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer')

router.post("/", authGuard, adminGuard, upload.single('image'), createBrand);
router.get("/", getAllBrand);
router.delete("/:id", authGuard, adminGuard, deleteBrand);

module.exports = router;
