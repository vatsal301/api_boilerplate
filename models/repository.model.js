const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  repository_id: { type: Number, unique: true, require: true },
  owner: { type: String, require: true },
  full_name: { type: String, require: true, unique: true },
  description: { type: String },
  html_url: { type: String },
  language: { type: String },
  stargazers_count: { type: Number },
});

module.exports = mongoose.model("repository", schema);
