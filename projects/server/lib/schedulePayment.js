const schedule = require("node-schedule");
const db = require("../models");

const checkPayment = (objectTransaction) => {
    schedule.scheduleJob(objectTransaction).expired_date,
        async () => {
            const getTransaction = await db.Transaction.findByPk(
                objectTransaction.id
            );

            if (objectTransaction.status === "waiting for payment") {
                await db.Transaction.update(
                    {
                        transaction_status: "cancel",
                    },
                    {
                        where: {
                            id: getTransaction.id,
                        },
                    }
                );
            }
        };
};

module.exports = checkPayment;
