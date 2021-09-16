import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(20).required(),
  location: Joi.string().required(),
});

export default schema;
