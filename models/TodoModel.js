const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  text: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
