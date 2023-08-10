import { ResponseModel } from "../../models/response.model";
import { FlightOrderBookingParams } from "../../models/types/flight_order_booking";



export interface AirportRepository {
    fetchAirports(keyword: string): Promise<ResponseModel>;
    flightOrderBooking(flightOrderBookingParams:FlightOrderBookingParams): Promise<ResponseModel>;
}