import { FlightRepository } from "../../interfaces/repositories/flight_repository"
import { FetchBookingDetailsUseCase } from "../../interfaces/use-cases/flight/fetch_booking_details_usecase"
import { ResponseModel } from "../../models/response.model"


export class FetchBookingDetails implements FetchBookingDetailsUseCase {
    flightRepository: FlightRepository
    constructor(flightRepository: FlightRepository) {
        this.flightRepository = flightRepository
    }

    async execute(booking_reference:string): Promise<ResponseModel> {
        
       return await this.flightRepository.fetchBookingDetails(booking_reference)

    }
}