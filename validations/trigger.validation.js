const Joi = require("joi").extend(require("@joi/date"));

const searchSchema = Joi.object({
  query: Joi.string().required(),
  date: Joi.date().format("DD-MM-YYYY").utc().required(),
});

// const getSchema = Joi.object({
//   id: Joi.number(),
//   login: Joi.string(),
// }).xor("id", "login");

module.exports = { searchSchema };
