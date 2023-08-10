
import { ResponseModel } from "../../../models/response.model";
import { FlightOrderBookingParams } from "../../../models/types/flight_order_booking";


export interface FlightOrderBookingUseCase {
    execute(flightOrderBookingParams:FlightOrderBookingParams): Promise<ResponseModel>;
}