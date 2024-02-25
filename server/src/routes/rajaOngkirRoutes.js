const express = require('express');
const { getAllProvince, getCity, getCost } = require('../controllers/rajaOngkir');
const router = express.Router();
const { authGuard } = require('../middlewares/authMiddleware');

router.get("/", authGuard, getAllProvince);
router.get("/:id", authGuard, getCity);
router.post("/cost", authGuard, getCost);

module.exports = router;
