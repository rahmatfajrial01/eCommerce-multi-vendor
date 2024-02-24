const express = require('express');
const { getAllProvince, getCity } = require('../controllers/rajaOngkir');
const router = express.Router();
const { authGuard } = require('../middlewares/authMiddleware');

router.get("/", authGuard, getAllProvince);
router.get("/:id", authGuard, getCity);

module.exports = router;
