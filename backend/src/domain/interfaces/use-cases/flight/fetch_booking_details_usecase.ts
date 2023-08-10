
import { ResponseModel } from "../../../models/response.model";


export interface FetchBookingDetailsUseCase {
    execute(booking_reference:string): Promise<ResponseModel>;
}