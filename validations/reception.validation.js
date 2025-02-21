import Joi from "joi";

export const ReceptionPOST = Joi.object({
   centerId: Joi.number().required(),
   filialId: Joi.number().optional(),
   majorId: Joi.number().required(),
   visitDate: Joi.date(),
});

export const ReceptionPATCH = Joi.object({
   status: Joi.string().valid("pending", "visit", "not visit").required(),
});
