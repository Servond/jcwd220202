const express = require("express");
const adminTransactionController = require("../controllers/adminTransactionController");
const { verifyToken } = require("../middlewares/loginMiddleware");

const router = express.Router();

router.get("/", verifyToken, adminTransactionController.getAllTransactionAdmin);

module.exports = router;
