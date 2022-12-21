const express = require("express");
const transactionController = require("../controllers/transactionController");
const { verifyToken } = require("../middlewares/loginMiddleware");
const router = express.Router();
const { uploader } = require("../../lib/uploader");

router.patch(
    "/:id",
    uploader({
        acceptedFileTypes: ["png", "jpg"],
        filePrefix: "PROF",
    }).single("payment_proof_img"),
    transactionController.updatePayment
);
router.get("/:id", transactionController.getTransactionData);

module.exports = router;
