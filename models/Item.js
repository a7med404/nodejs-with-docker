const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  description: String,
  price: String,
  gty: Number,
});

module.exports = mongoose.model("Item", schema);
