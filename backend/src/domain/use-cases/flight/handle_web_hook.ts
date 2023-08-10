import { FlightRepository } from "../../interfaces/repositories/flight_repository"
import { HandleWebHookUseCase } from "../../interfaces/use-cases/flight/handle_webhook_usecase"

export class HandleWebHook implements HandleWebHookUseCase {
    flightRepository: FlightRepository
    constructor(flightRepository: FlightRepository) {
        this.flightRepository = flightRepository
    }

  execute(event: any): void {
       this.flightRepository.handleWebHook(event)
    }
}