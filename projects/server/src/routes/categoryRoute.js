const express = require("express");
const categoryController = require("../controllers/categoryController");
const { verifyToken } = require("../middlewares/loginMiddleware");

const router = express.Router();

router.get("/", categoryController.getAllCategory);

module.exports = router;
