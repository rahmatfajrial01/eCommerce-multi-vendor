const express = require('express');
const router = express.Router();
const { createBanner, getAllBanner, deleteBanner } = require('../controllers/bannerCtrls');
const { authGuard, adminGuard } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer')

router.post("/", authGuard, adminGuard, upload.single('image'), createBanner);
router.get("/", getAllBanner);
router.delete("/:id", authGuard, adminGuard, deleteBanner);

module.exports = router;
