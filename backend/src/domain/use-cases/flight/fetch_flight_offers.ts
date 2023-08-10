import { FlightRepository } from "../../interfaces/repositories/flight_repository"
import { FetchFlightOffersUseCase } from "../../interfaces/use-cases/flight/fetch_flight_offers_usecase"
import { ResponseModel } from "../../models/response.model"
import { FlightOfferQueryParams } from "../../models/types/flight_offer"

export class FetchFlightOffers implements FetchFlightOffersUseCase {
    flightRepository: FlightRepository
    constructor(flightRepository: FlightRepository) {
        this.flightRepository = flightRepository
    }

    async execute(flightOfferQueryParams:FlightOfferQueryParams): Promise<ResponseModel> {
        
       return await this.flightRepository.fetchFlightOffers(flightOfferQueryParams)

    }
}