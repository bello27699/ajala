import { FlightRepository } from "../../interfaces/repositories/flight_repository"
import { FetchInvoiceWithGuidUsecase } from "../../interfaces/use-cases/flight/fetch_invoice_with_guid_usecase"
import { ResponseModel } from "../../models/response.model"

export class FetchInvoiceWithGUID implements FetchInvoiceWithGuidUsecase {
    flightRepository: FlightRepository
    constructor(flightRepository: FlightRepository) {
        this.flightRepository = flightRepository
    }

    async execute(guid:string): Promise<ResponseModel> {
       return await this.flightRepository.getPaymentInvoiceWithGUID(guid)

    }
}