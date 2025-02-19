import Joi from "joi";

export const ValidationPOST = Joi.object({
    name: Joi.string().max(15).min(2).required(),
    image: Joi.string().required(),
});

export const ValidationPATCH = Joi.object({
    name: Joi.string().max(15).min(2).optional(),
    image: Joi.string().optional(),
});
