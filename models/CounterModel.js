const mongoose = require("mongoose");

const counterSchema = mongoose.Schema({
  addCalls: {
    type: Number,
    default: 0,
  },
  updateCalls: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Counter", counterSchema);
