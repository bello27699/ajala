import { AirportRepository } from "../../interfaces/repositories/airport_repository"
import { UserRepository } from "../../interfaces/repositories/user_repository"
import { FetchAirPortsUseCase } from "../../interfaces/use-cases/airport/fetch_airports_usecase"
import { ResponseModel } from "../../models/response.model"

export class FetchAirports implements FetchAirPortsUseCase {
    airportRepository: AirportRepository
    constructor(airportRepository: AirportRepository) {
        this.airportRepository = airportRepository
    }

    async execute(keyword: string): Promise<ResponseModel> {
        console.log(`here is the keyword ${keyword}`)
       return await this.airportRepository.fetchAirports(keyword)

    }
}