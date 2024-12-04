const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
});

module.exports = mongoose.model("members", schema);
