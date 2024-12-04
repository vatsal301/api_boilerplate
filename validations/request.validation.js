const Joi = require("joi");

const requestFullNameSchema = Joi.object({
  owner: Joi.string().required(),
  name: Joi.string().required(),
});
const requestIdSchema = Joi.object({
  id: Joi.number().required(),
});


module.exports = { requestFullNameSchema, requestIdSchema };
