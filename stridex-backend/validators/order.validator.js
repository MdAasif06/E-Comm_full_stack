import Joi from "joi";

export const checkoutValidationSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        size: Joi.number().required(),
        quantity: Joi.number().required(),
      })
    )
    .required(),
});