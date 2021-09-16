import Joi from "joi";

const schema = Joi.object({
  username: Joi.string()
    .pattern(new RegExp("^[A-Za-z0-9_-]*$"))
    .min(5)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^[A-Za-z0-9_@./#&+-]*$"))
    .min(6)
    .max(20)
    .required(),
});

export default schema;
