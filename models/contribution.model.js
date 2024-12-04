const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user: { type: Number, ref: "user", require: true },
  repository: {
    type: Number,
    ref: "repository",
    require: true,
  },
  line_count: { type: Number },
});

module.exports = mongoose.model("contribution", schema);
