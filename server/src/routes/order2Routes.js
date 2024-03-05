const express = require('express');
const { getOrder2 } = require('../controllers/order2Ctrls');
const router = express.Router();
const { authGuard, adminGuard } = require('../middlewares/authMiddleware');


router.get("/", authGuard, getOrder2);

module.exports = router;