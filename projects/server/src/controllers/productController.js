const { Op } = require("sequelize");
const db = require("../../models");

const { sequelize } = require("../../models");

const productController = {
  showAllProducts: async (req, res) => {
    try {
      // const last_id = parseInt(req.query._lastId) || 0;
      // // const limit = parseInt(req.query._limit) || 6;
      // const search = req.query._keywordHandler || "";
      // const order = req.query._sortDir || "DESC";

      const userCoordinate = await db.Address.findOne({
        where: {
          UserId: req.user.id,
        },
        include: [
          {
            model: db.User,
          },
        ],
      });
      // console.log(JSON.parse(JSON.stringify(userCoordinate)))
      const lat = userCoordinate.latitude;
      const lon = userCoordinate.longitude;
      // console.log(userCoordinate);
      const query = `(6371 *
            acos(
              cos(radians(${lat})) *
                cos(radians(latitude)) *
                cos(radians(longitude) - radians(${lon})) +
                sin(radians(${lat})) * sin(radians(latitude))
            ))`;

      const pickBranch = await db.User.findAll({
        where: {
          RoleId: 2,
        },
        include: [
          {
            model: db.Address,
          },
        ],
        attributes: { include: [[sequelize.literal(query), "distance"]] },
        order: sequelize.col("distance"),
      });
      console.log(JSON.parse(JSON.stringify(pickBranch)));
      // const coba = JSON.parse(JSON.stringify(pickBranch[0].id));
      // console.log(coba);

      // let result = [];
      // if (last_id < 1) {
      //   const results = await db.Branch.findAndCountAll({
      //     subQuery: false,
      //     where: {
      //       UserId: pickBranch[0].id,
      //     },
      //     include: [
      //       {
      //         model: db.ProductBranch,
      //         include: [
      //           {
      //             model: db.Product,
      //             where: {
      //               [Op.or]: [
      //                 {
      //                   product_name: {
      //                     [Op.like]: "%" + search + "%",
      //                   },
      //                 },
      //                 {
      //                   product_price: {
      //                     [Op.like]: "%" + search + "%",
      //                   },
      //                 },
      //               ],
      //             },
      //             limit: limit,
      //             order: [["id", order]],
      //           },
      //         ],
      //       },
      //     ],
      //   });
      //   result = results;
      // } else {
      //   const results = await db.Branch.findAndCountAll({
      //     where: {
      //       UserId: pickBranch[0].id,
      //     },
      //     include: [
      //       {
      //         model: db.ProductBranch,
      //         include: [
      //           {
      //             model: db.Product,
      //             where: {
      //               id: {
      //                 [Op.lt]: last_id,
      //               },
      //               product_name: {
      //                 [Op.like]: "%" + search + "%",
      //               },
      //             },
      //             limit: limit,
      //             order: [["id", order]],
      //           },
      //         ],
      //       },
      //     ],
      //   });
      //   result = results;
      // }
      // --------------------------------------------------

      const {
        product_name = "",
        product_price = "",
        CategoryId = "",
        _sortBy = "product_name",
        _sortDir = "ASC",
        _limit = 12,
        _page = 1,
      } = req.query;

      if (
        _sortBy === "product_name" ||
        _sortBy === "CategoryId" ||
        _sortBy === "product_price" ||
        product_name ||
        product_price ||
        CategoryId
      ) {
        if (!Number(CategoryId)) {
          const findBranchById = await db.Branch.findAndCountAll({
            limit: Number(_limit),
            offset: (_page - 1) * _limit,
            subQuery: false,
            where: {
              UserId: pickBranch[0].id,
            },
            attributes: {
              exclude: ["branch_address", "distance", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.ProductBranch,
                include: [
                  {
                    model: db.Product,
                    where: {
                      [Op.or]: [
                        {
                          product_name: {
                            [Op.like]: `%${product_name}%`,
                          },
                        },
                      ],
                    },
                    include: [{ model: db.Category }],
                  },
                ],
              },
            ],
            order: [
              [
                { model: db.ProductBranch },
                { model: db.Product },
                _sortBy,
                _sortDir,
              ],
            ],
          });

          // const parseFindBranchById = JSON.parse(
          //   JSON.stringify(findBranchById)
          // );

          // const findBranchData = parseFindBranchById[0].ProductBranches;

          // console.log(findBranchData);

          return res.status(200).json({
            data: findBranchById.rows,
            dataCount: findBranchById.count,
            message: "get branch data",
          });
        }

        const findBranchById = await db.Branch.findAndCountAll({
          limit: Number(_limit),
          offset: (_page - 1) * _limit,
          subQuery: false,
          where: {
            UserId: pickBranch[0].id,
          },
          attributes: {
            exclude: ["branch_address", "distance", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: db.ProductBranch,
              include: [
                {
                  model: db.Product,
                  where: {
                    [Op.or]: [
                      {
                        product_name: {
                          [Op.like]: `%${product_name}%`,
                        },
                      },
                    ],
                    CategoryId: CategoryId,
                  },
                  include: [{ model: db.Category }],
                },
              ],
            },
          ],
          order: [
            [
              { model: db.ProductBranch },
              { model: db.Product },
              _sortBy,
              _sortDir,
            ],
          ],
        });

        // const parseFindBranchById = JSON.parse(JSON.stringify(findBranchById));

        // const findBranchData = parseFindBranchById[0].ProductBranches;

        return res.status(200).json({
          message: "get branch data",
          data: findBranchById.rows,
          dataCount: findBranchById.count,
        });
      }

      const findBranchById = await db.Branch.findAndCountAlll({
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        subQuery: false,
        where: {
          UserId: pickBranch[0].id,
        },
        attributes: {
          exclude: ["branch_address", "distance", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.ProductBranch,
            include: [
              {
                model: db.Product,
                include: [{ model: db.Category }],
              },
            ],
          },
        ],
      });

      // const parseFindBranchById = JSON.parse(JSON.stringify(findBranchById));

      // const findBranchData = parseFindBranchById[0].ProductBranches;
      // --------------------------------------------------
      return res.status(200).json({
        message: "Showing all products",
        result: result,
        lastId: result.length ? result[result.length - 1].id : 0,
        hasMore: result.length >= limit ? true : false,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error showing products",
      });
    }
  },
  detailProductByPk: async (req, res) => {
    try {
      const userCoordinate = await db.Address.findOne({
        where: {
          UserId: req.user.id,
        },
        include: [
          {
            model: db.User,
          },
        ],
      });
      const lat = userCoordinate.latitude;
      const lon = userCoordinate.longitude;

      const query = `(6371 *
            acos(
              cos(radians(${lat})) *
                cos(radians(latitude)) *
                cos(radians(longitude) - radians(${lon})) +
                sin(radians(${lat})) * sin(radians(latitude))
            ))`;

      const pickBranch = await db.User.findAll({
        where: {
          RoleId: 2,
        },
        include: [
          {
            model: db.Address,
          },
        ],
        attributes: { include: [[sequelize.literal(query), "distance"]] },
        order: sequelize.col("distance"),
      });
      const findBranchById = await db.Branch.findAll({
        subQuery: false,
        where: {
          UserId: pickBranch[0].id,
        },

        include: [
          {
            model: db.ProductBranch,
            where: { ProductId: req.params.id },
          },
        ],
      });
      // console.log(JSON.parse(JSON.stringify(findBranchById[0].id)))
      // console.log(findBranchById[0]);
      const detailProduct = await db.Product.findAll({
        where: { id: req.params.id },
        include: [
          {
            model: db.ProductBranch,
            where: { BranchId: findBranchById[0].id },
          },
        ],
      });

      return res.status(200).json({
        message: "Showing product details",
        data: detailProduct,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server error fetching details",
      });
    }
  },
  getNearestProductByCategory: async (req, res) => {
    try {
      const userCoordinate = await db.Address.findOne({
        where: {
          UserId: req.user.id,
        },
        include: [
          {
            model: db.User,
          },
        ],
      });
      const lat = userCoordinate.latitude;
      const lon = userCoordinate.longitude;

      const query = `(6371 *
              acos(
                cos(radians(${lat})) *
                  cos(radians(latitude)) *
                  cos(radians(longitude) - radians(${lon})) +
                  sin(radians(${lat})) * sin(radians(latitude))
              ))`;

      const pickBranch = await db.User.findAll({
        where: {
          RoleId: 2,
        },
        include: [
          {
            model: db.Address,
          },
        ],
        attributes: { include: [[sequelize.literal(query), "distance"]] },
        order: sequelize.col("distance"),
      });

      const parsePickBranch = JSON.parse(JSON.stringify(pickBranch));

      const {
        product_name = "",
        product_price = "",
        _sortBy = "product_name",
        _sortDir = "ASC",
        _limit = 12,
        _page = 1,
      } = req.query;

      const { CategoryId } = req.params;

      if (
        _sortBy === "product_name" ||
        _sortBy === "product_price" ||
        product_name ||
        product_price
      ) {
        const findBranchById = await db.Branch.findAndCountAll({
          limit: Number(_limit),
          offset: (_page - 1) * _limit,
          subQuery: false,
          where: {
            UserId: pickBranch[0].id,
          },
          attributes: {
            exclude: ["branch_address", "distance", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: db.ProductBranch,
              include: [
                {
                  model: db.Product,
                  where: {
                    [Op.or]: [
                      {
                        product_name: {
                          [Op.like]: `%${product_name}%`,
                        },
                      },
                    ],
                  },
                  include: [
                    {
                      model: db.Category,
                      where: {
                        id: CategoryId,
                      },
                    },
                  ],
                },
              ],
            },
          ],
          order: [
            [
              { model: db.ProductBranch },
              { model: db.Product },
              _sortBy,
              _sortDir,
            ],
          ],
        });

        return res.status(200).json({
          data: findBranchById.rows,
          dataCount: findBranchById.count,
          message: "get branch data",
        });
      }

      const findBranchById = await db.Branch.findAndCountAlll({
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        subQuery: false,
        where: {
          UserId: pickBranch[0].id,
        },
        attributes: {
          exclude: ["branch_address", "distance", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.ProductBranch,
            include: [
              {
                model: db.Product,
                include: [
                  {
                    model: db.Category,
                    where: {
                      id: CategoryId,
                    },
                  },
                ],
              },
            ],
          },
        ],
      });

      return res.status(200).json({
        data: findBranchById.rows,
        dataCount: findBranchById.count,
        message: "get branch data",
      });
    } catch (error) {
      console.log(err);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  getNearestProductByCategory: async (req, res) => {
    try {
      const userCoordinate = await db.Address.findOne({
        where: {
          UserId: req.user.id,
        },
        include: [
          {
            model: db.User,
          },
        ],
      });
      const lat = userCoordinate.latitude;
      const lon = userCoordinate.longitude;

      const query = `(6371 *
            acos(
              cos(radians(${lat})) *
                cos(radians(latitude)) *
                cos(radians(longitude) - radians(${lon})) +
                sin(radians(${lat})) * sin(radians(latitude))
            ))`;

      const pickBranch = await db.User.findAll({
        where: {
          RoleId: 2,
        },
        include: [
          {
            model: db.Address,
          },
        ],
        attributes: { include: [[sequelize.literal(query), "distance"]] },
        order: sequelize.col("distance"),
      });

      const parsePickBranch = JSON.parse(JSON.stringify(pickBranch));

      console.log(parsePickBranch[0].id);

      const {
        product_name = "",
        product_price = "",
        _sortBy = "product_name",
        _sortDir = "ASC",
        _limit = 12,
        _page = 1,
      } = req.query;

      const { CategoryId } = req.params;

      if (
        _sortBy === "product_name" ||
        _sortBy === "product_price" ||
        product_name ||
        product_price
      ) {
        const findBranchById = await db.Branch.findAndCountAll({
          limit: Number(_limit),
          offset: (_page - 1) * _limit,
          subQuery: false,
          where: {
            UserId: pickBranch[0].id,
          },
          attributes: {
            exclude: ["branch_address", "distance", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: db.ProductBranch,
              include: [
                {
                  model: db.Product,
                  where: {
                    [Op.or]: [
                      {
                        product_name: {
                          [Op.like]: `%${product_name}%`,
                        },
                      },
                    ],
                  },
                  include: [
                    {
                      model: db.Category,
                      where: {
                        id: CategoryId,
                      },
                    },
                  ],
                },
              ],
            },
          ],
          order: [
            [
              { model: db.ProductBranch },
              { model: db.Product },
              _sortBy,
              _sortDir,
            ],
          ],
        });

        return res.status(200).json({
          data: findBranchById.rows,
          dataCount: findBranchById.count,
          message: "get branch data",
        });
      }

      const findBranchById = await db.Branch.findAndCountAlll({
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        subQuery: false,
        where: {
          UserId: pickBranch[0].id,
        },
        attributes: {
          exclude: ["branch_address", "distance", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.ProductBranch,
            include: [
              {
                model: db.Product,
                include: [
                  {
                    model: db.Category,
                    where: {
                      id: CategoryId,
                    },
                  },
                ],
              },
            ],
          },
        ],
      });

      return res.status(200).json({
        data: findBranchById.rows,
        dataCount: findBranchById.count,
        message: "get branch data",
      });
    } catch (error) {
      console.log(err);
      return res.status(500).json({
        message: "server error",
      });
    }
  },
};

module.exports = productController;
