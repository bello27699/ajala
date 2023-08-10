import { Cabin } from "./cabin";

export interface FlightOrderBookingParams {
  flight_id: string;
  passengers: [Passenger];
}

interface Passenger {
  passenger_type: string;
  first_name: string;
  last_name: string;
  dob: Date;
  gender: string;
  title: string;
  email: string;
  phone_number: string;
}
