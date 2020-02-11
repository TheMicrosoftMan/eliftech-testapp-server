const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user_email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("Order", OrderSchema);
