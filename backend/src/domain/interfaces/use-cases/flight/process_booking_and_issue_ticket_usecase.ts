

import { ResponseModel } from "../../../models/response.model";


export interface ProcessBookingAndIssueTicketUseCase {
    execute(booking_reference:string): Promise<ResponseModel>;
}