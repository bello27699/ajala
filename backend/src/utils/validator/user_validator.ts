
import * as Joi from "joi";
import { Role } from "../../domain/models/types/roles";

export const validateUser = (input:Object) => {
const schema = Joi.object().keys({
    email: Joi.string().required(),
    password:  Joi.string().required(),
    role: Joi.date().valid(Role.ADMIN,Role.STAFF,Role.USER).required()

  });
  return schema.validate(input);
};
validateUser({key:5})