const express = require("express");
const router = express.Router();
const momment = require("moment");
const utils = require("../utils");

const Orders = require("../models/order");

// @route   GET api/orders
// @desc    Get all orders
// @access  Public
router.get("/", (req, res) => {
  Orders.find()
    .then(orders => {
      const ordersOnCurrentPage = utils.paging(orders, 0);
      res.json(ordersOnCurrentPage);
    })
    .catch(err => res.json(err));
});

// @route   GET api/orders/:pageID
// @desc    Get orders by page
// @access  Public
router.get("/:pageID", (req, res) => {
  Orders.find()
    .then(orders => {
      const ordersOnCurrentPage = utils.paging(orders, +req.params.pageID);
      res.json(ordersOnCurrentPage);
    })
    .catch(err => res.json(err));
});

// @route   POST api/orders
// @desc    Inser a new one order
// @access  Public
router.post("/", (req, res) => {
  const order = new Orders({
    user_email: req.body.user_email,
    date: req.body.date,
    value: req.body.value,
    currency: req.body.currency,
    status: req.body.status
  });

  order
    .save()
    .then(newOrder => res.json(newOrder))
    .catch(err => res.json(err));
});

// @route   POST api/orders/upload
// @desc    Inser orders from CSV file
// @access  Public
router.post("/upload", async (req, res) => {
  const files = req.files;
  try {
    const parsedFileObj = await utils.readFileForExport(files.file);

    const newOrders = parsedFileObj.orders.map(
      order =>
        new Orders({
          user_email: order.user_email,
          value: +order.value,
          status: order.status,
          date: momment(order.date, "DD.MM.YYYY HH:mm:ss"),
          currency: order.currency
        })
    );
    Orders.insertMany(newOrders)
      .then(orders => res.json(orders))
      .catch(err => res.json(err));
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
