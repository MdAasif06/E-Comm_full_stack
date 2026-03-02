import Joi from "joi";

export const checkoutValidationSchema = Joi.object({
  productId: Joi.string().required(),
  size: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});