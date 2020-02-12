const express = require("express");
const router = express.Router();
const utils = require("../utils");

const Orders = require("../models/order");

// @route   GET api/export
// @desc    Export orders in CSV file
// @access  Public
router.get("/", (req, res) => {
  // db.orders.aggregate([{ $match: { status: "approved" } }, { $group: { _id: {user_email: "$user_email", date: "$date"}, amount: { $sum: "$value" } } }, { $sort: { total: -1 } }])
  Orders.aggregate([
    { $match: { status: "approved" } },
    {
      $group: {
        _id: { user_email: "$user_email", date: "$date" },
        amount: { $sum: "$value" }
      }
    },
    { $sort: { total: -1 } }
  ])
    .then(orders => {
      const CSVString = utils.exportReport(orders);

      res.setHeader("Content-Disposition", "attachment; filename=testing.csv");
      res.set("Content-Type", "text/csv");
      res.status(200).send(CSVString);
    })
    .catch(err => res.json(err));
});

module.exports = router;
