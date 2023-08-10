import { ResponseModel } from "../../models/response.model";
import { FlightOfferQueryParams } from "../../models/types/flight_offer";



export interface FlightRepository {
    fetchFlightOffers(flightOfferQueryParams: FlightOfferQueryParams): Promise<ResponseModel>;
    confirmPrice(flight_id:string): Promise<ResponseModel>;
    fetchBookingDetails(booking_reference:string): Promise<ResponseModel>;
    processBookingAndissueTicket(booking_reference:string): Promise<ResponseModel>;
    handleWebHook(event: any): void
    getPaymentInvoiceWithGUID(guid:any): Promise<ResponseModel>
}