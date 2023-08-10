
import * as Joi from "joi";

import { Cabin } from "../../domain/models/types/cabin";

export const validateFlightOfferRequestParams = (input:Object) => {
const schema = Joi.object().keys({
    adults: Joi.number().required(),
    cabin:  Joi.string().valid(Cabin.BUSINESS,Cabin.ECONOMY,Cabin.FIRST,Cabin.PREMIUM_ECONOMY).required(),
    departure_date: Joi.date().required(),
    destination: Joi.string().required(),
    origin: Joi.string().required(),
    children: Joi.number().required(),
    infants: Joi.number().required(),
    return_date: Joi.date(),

  });
  return schema.validate(input);
};
validateFlightOfferRequestParams({key:5})