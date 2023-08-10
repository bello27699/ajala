import { FlightRepository } from "../../interfaces/repositories/flight_repository"
import { ConfirmPriceUseCase } from "../../interfaces/use-cases/flight/confirm_price_usecase"
import { ResponseModel } from "../../models/response.model"

export class ConfirmPrice implements ConfirmPriceUseCase {
    flightRepository: FlightRepository
    constructor(flightRepository: FlightRepository) {
        this.flightRepository = flightRepository
    }

    async execute(flight_id:string): Promise<ResponseModel> {
        
       return await this.flightRepository.confirmPrice(flight_id)

    }
}