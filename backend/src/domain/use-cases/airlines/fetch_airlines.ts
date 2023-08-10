import { AirlineRepository } from "../../interfaces/repositories/airline_repository"
import { FetchAirlinesUseCase } from "../../interfaces/use-cases/airlines/fetch_airlines_usecase"
import { ResponseModel } from "../../models/response.model"

export class FetchAirlines implements FetchAirlinesUseCase {
    airlineRepository: AirlineRepository
    constructor(airlineRepository: AirlineRepository) {
        this.airlineRepository = airlineRepository
    }

    async execute(): Promise<ResponseModel> {
        console.log(`fetching airlines`)
       return await this.airlineRepository.fetchAirlines()

    }
}