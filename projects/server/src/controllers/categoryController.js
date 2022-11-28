const db = require("../../models");

const categoryController = {
  getAllCategory: async (req, res) => {
    try {
      const findAllCategory = await db.Category.findAll();

      return res.status(200).json({
        message: "Get All Categories",
        data: findAllCategory,
      });
    } catch (error) {
      return res.status(500).json({
        message: "server error",
      });
    }
  },
};

module.exports = categoryController;
