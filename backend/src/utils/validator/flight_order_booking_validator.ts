import Joi from "joi";
import { Gender } from "../../domain/models/types/gender";
import { PassengerType } from "../../domain/models/types/passenger";
import { Title } from "../../domain/models/types/title";

const passenger = Joi.object({
  passenger_type: Joi.string()
    .valid(PassengerType.ADULT, PassengerType.CHILD, PassengerType.INFANT)
    .required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  dob: Joi.date().required(),
  gender: Joi.string().valid(Gender.MALE, Gender.FEMALE).required(),
  title: Joi.string()
    .valid(Title.MR, Title.MISS, Title.MRS, Title.MS)
    .required(),
  email: Joi.string().required(),
  phone_number: Joi.string().required(),
  created: Joi.date(),
});

export const validateFlightOrderBookingRequestParams = (input: Object) => {
  const schema = Joi.object({
    flight_id: Joi.string().trim().required(),
    passengers: Joi.array().items(passenger).required(),
  });
  return schema.validate(input);
};
validateFlightOrderBookingRequestParams({ key: 5 });
