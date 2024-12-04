const Joi = require("joi");

const createSchema = Joi.object({
  login: Joi.string().required(),
  avatar_url: Joi.string(),
  html_url: Joi.string(),
  type: Joi.string(),
});

const getSchema = Joi.object({
  id: Joi.number(),
  login: Joi.string(),
}).xor("id", "login");

module.exports = { createSchema, getSchema };
