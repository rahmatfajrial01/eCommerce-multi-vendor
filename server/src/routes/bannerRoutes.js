const express = require('express');
const router = express.Router();
const { createBanner } = require('../controllers/bannerCtrls');
const { authGuard } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer')

router.post("/", upload.single('image'), createBanner);

module.exports = router;
