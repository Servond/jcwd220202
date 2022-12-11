const db = require("../../models");
const { Op } = require("sequelize");

const adminTransactionController = {
  getAllTransactionAdmin: async (req, res) => {
    try {
      const {
        username = "",
        transaction_status = "",
        _sortBy = "createdAt",
        _sortDir = "ASC",
        _limit = 12,
        _page = 1,
      } = req.query;

      const findAdmin = await db.Branch.findOne({
        where: {
          UserId: req.user.id,
        },
      });

      if (_sortBy === "createdAt" || username || transaction_status) {
        if (!transaction_status) {
          const findAllTransaction = await db.Transaction.findAndCountAll({
            limit: Number(_limit),
            offset: (_page - 1) * _limit,
            where: {
              BranchId: findAdmin.id,
            },
            include: [
              {
                model: db.User,
                where: {
                  [Op.or]: [
                    {
                      username: {
                        [Op.like]: `%${username}%`,
                      },
                    },
                  ],
                },
              },
              {
                model: db.TransactionItem,
                separate: true,
                include: [
                  {
                    model: db.ProductBranch,
                    include: [
                      {
                        model: db.Product,
                        paranoid: false,
                      },
                    ],
                  },
                ],
              },
            ],
            order: [[_sortBy, _sortDir]],
          });

          return res.status(200).json({
            message: "get all user transaction",
            data: findAllTransaction.rows,
            dataCount: findAllTransaction.count,
          });
        }

        const findAllTransaction = await db.Transaction.findAndCountAll({
          limit: Number(_limit),
          offset: (_page - 1) * _limit,
          where: {
            BranchId: findAdmin.id,
            transaction_status: transaction_status,
          },
          include: [
            {
              model: db.User,
              where: {
                [Op.or]: [
                  {
                    username: {
                      [Op.like]: `%${username}%`,
                    },
                  },
                ],
              },
            },
            {
              model: db.TransactionItem,
              separate: true,
              include: [
                {
                  model: db.ProductBranch,
                  include: [
                    {
                      model: db.Product,
                      paranoid: false,
                    },
                  ],
                },
              ],
            },
          ],
          order: [[_sortBy, _sortDir]],
        });

        return res.status(200).json({
          message: "get all user transaction",
          data: findAllTransaction.rows,
          dataCount: findAllTransaction.count,
        });
      }

      const findAllTransaction = await db.Transaction.findAndCountAll({
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        where: {
          BranchId: findAdmin.id,
        },
        include: [
          {
            model: db.User,
          },
          {
            model: db.TransactionItem,
            separate: true,
            include: [
              {
                model: db.ProductBranch,
                include: [
                  {
                    model: db.Product,
                    paranoid: false,
                  },
                ],
              },
            ],
          },
        ],
      });

      return res.status(200).json({
        message: "get all user transaction",
        data: findAllTransaction.rows,
        dataCount: findAllTransaction.count,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
};

module.exports = adminTransactionController;
