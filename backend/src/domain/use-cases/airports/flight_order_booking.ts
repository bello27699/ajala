
import { AirportRepository } from "../../interfaces/repositories/airport_repository"
import { FlightOrderBookingUseCase } from "../../interfaces/use-cases/airport/flight_order_booking_usecase"
import { ResponseModel } from "../../models/response.model"
import { FlightOrderBookingParams } from "../../models/types/flight_order_booking"

export class FlightOrderBooking implements FlightOrderBookingUseCase {
    airportRepository: AirportRepository
    constructor(airportRepository: AirportRepository) {
        this.airportRepository = airportRepository
    }

    async execute(flightOrderBookingParams:FlightOrderBookingParams): Promise<ResponseModel> {
        
       return await this.airportRepository.flightOrderBooking(flightOrderBookingParams)

    }
}