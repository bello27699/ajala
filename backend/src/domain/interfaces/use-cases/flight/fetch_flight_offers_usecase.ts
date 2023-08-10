
import { ResponseModel } from "../../../models/response.model";
import { FlightOfferQueryParams } from "../../../models/types/flight_offer";


export interface FetchFlightOffersUseCase {
    execute(flightOfferQueryParams:FlightOfferQueryParams): Promise<ResponseModel>;
}