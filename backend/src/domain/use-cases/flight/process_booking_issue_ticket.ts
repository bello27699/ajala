import { FlightRepository } from "../../interfaces/repositories/flight_repository"
import { ProcessBookingAndIssueTicketUseCase } from "../../interfaces/use-cases/flight/process_booking_and_issue_ticket_usecase"
import { ResponseModel } from "../../models/response.model"


export class ProcessBookingAndIssueTicket implements ProcessBookingAndIssueTicketUseCase {
    flightRepository: FlightRepository
    constructor(flightRepository: FlightRepository) {
        this.flightRepository = flightRepository
    }

    async execute(booking_reference:string): Promise<ResponseModel> {
        
       return await this.flightRepository.processBookingAndissueTicket(booking_reference)

    }
}