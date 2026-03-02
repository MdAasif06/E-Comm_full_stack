import Joi from "joi";

export const productValidationSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(5).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().valid("Sneakers", "Formal", "Sports","Fitness","Casual").required(),
  image: Joi.string().uri().required(),
  sizes: Joi.array()
    .items(
      Joi.object({
        size: Joi.number().required(),
        stock: Joi.number().min(0).required(),
      }),
    )
    .min(1)
    .required(),
});
