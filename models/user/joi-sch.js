const Joi = require("joi");


const registerSchema = Joi.object({
  password:Joi.string().required(),
  email:Joi.string().required(),
  subscription: Joi.string().valid("starter", "pro", "business").default("starter"),
});

const loginSchema = Joi.object({
  email:Joi.string().required(),
  password:Joi.string().required(),
 
});
const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
})

const vetifySchema = Joi.object({
  email:Joi.string().required(),
})

  const schemas = {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
    vetifySchema,

  }

  module.exports = schemas;
