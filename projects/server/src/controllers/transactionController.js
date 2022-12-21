const { Op } = require("sequelize");
const db = require("../../models");
const moment = require("moment");

const transactionController = {
    updatePayment: async (req, res) => {
        try {
            const get = await db.Transaction.findOne({
                where: {
                    id: req.params.id,
                },
                attributes: ["expired_date"],
            });

            const getExpDate = Object.values(get.dataValues);
            const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
            const expDate = moment(getExpDate[0])
                .add(-7, "hours")
                .format("YYYY-MM-DD HH:mm:ss");

            if (currentDate > expDate) {
                return res.status(200).json({
                    message: "Payment expired",
                });
            }

            await db.Transaction.update(
                {
                    payment_proof_img: req.file.filename,
                },
                {
                    where: {
                        id: req.params.id,
                    },
                }
            );

            return res.status(200).json({
                message: "Payment uploaded",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Server error upload payment",
            });
        }
    },
    getTransactionData: async (req, res) => {
        try {
            const get = await db.Transaction.findOne({
                where: {
                    id: req.params.id,
                },
                attributes: ["expired_date", "total_price"],
            });

            const getExpDate = Object.values(get.dataValues);
            const price = Object.values(get.dataValues)[1];
            const expDate = moment(getExpDate[0])
                .add(-7, "hours")
                .format("LLL");

            return res.status(200).json({
                message: "Get successful",
                price,
                expDate,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: err.message,
            });
        }
    },
};

module.exports = transactionController;
