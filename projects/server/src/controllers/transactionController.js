const { Op } = require("sequelize");
const db = require("../../models");

const transactionController = {
  addToCart: async (req, res) => {
    const { ProductBranchId, quantity, total_product_price, current_price } =
      req.body;

    try {
      const conditionDouble = await db.Cart.findOne({
        where: {
          [Op.and]: [
            { ProductBranchId: req.body.ProductBranchId },
            { UserId: req.user.id },
          ],
        },
      });
      if (conditionDouble) {
        return res.status(400).json({
          message: "Product already added",
        });
      } else {
        const addProduct = await db.Cart.create({
          UserId: req.user.id,
          ProductBranchId,
          quantity,
          current_price: current_price,
          total_product_price: current_price * quantity,
        });
        return res.status(200).json({
          message: "Added to cart",
          data: addProduct,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  showUserCart: async (req, res) => {
    const { ProductBranchId, quantity, total_product_price } = req.body;

    try {
      const userCart = await db.Cart.findAll({
        where: {
          UserId: req.user.id,
        },
        include: [
          { model: db.ProductBranch, include: [{ model: db.Product }] },
        ],
      });

      return res.status(200).json({
        message: "Showing user cart",
        data: userCart,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  checkoutItems: async (req, res) => {
    try {
      const currentCart = await db.Cart.findAll({
        where: {
          UserId: req.user.id,
        },
        include: [{ model: db.ProductBranch }],
      });
      // console.log(currentCart.id);
      console.log(JSON.parse(JSON.stringify(currentCart)));

      const totalBayar = currentCart.quantity * currentCart.current_price;

      const createTransaction = await db.Transaction.create({
        BranchId: currentCart.BranchId,
        total_quantity: currentCart.quantity,
        total_price: totalBayar,
        UserId: req.user.id,
      });

      currentCart.map((val) => {
        db.TransactionItem.create({
          TransactionId: createTransaction.id,
          // applied_discount,
          ProductBranchId: val.ProductBranchId,
          quantity: val.quantity,
          current_price: val.current_price,
          price_per_product: val.current_price * val.quantity,
          applied_discount: val.applied_discount,
        });
      });

      return res.status(200).json({
        message: "Product checked out",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error handling cart",
      });
    }
  },
  updateQuantity: async (req, res) => {
    try {
      const qtyqty = await db.Cart.update(
        {
          quantity: req.body.quantity,
        },
        { where: { id: req.params.id } }
      );

      return res.status(200).json({
        message: "Product added",
        data: qtyqty,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Failed to add product",
      });
    }
  },
  deleteItem: async (req, res) => {
    try {
      await db.Cart.destroy({
        where: { id: req.params.id },
      });

      return res.status(200).json({
        message: "Product deleted",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Failed to delete product",
      });
    }
  },
};

module.exports = transactionController;

// PurwadhikaJCWD2202
