const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user_id: { type: Number, unique: true, require: true },
  login: { type: String, unique: true, require: true },
  avatar_url: { type: String },
  html_url: { type: String },
  type: { type: String },
});

module.exports = mongoose.model("user", schema);
