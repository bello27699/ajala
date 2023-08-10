import { RFARepository } from "@/domain/interfaces/repositories/rfa_repository";
import { CreateApplicationUseCase } from "@/domain/interfaces/use-cases/rfa/create_application_usecase";
import { ResponseModel } from "@/domain/models/response.model";
import { RFARequestParams } from "@/domain/models/tour/rfa/rfa_request_params";

export class CreateApplication implements CreateApplicationUseCase {
  rfaRepository: RFARepository;
  constructor(rfaRepository: RFARepository) {
    this.rfaRepository = rfaRepository;
  }

 async execute(params: RFARequestParams): Promise<ResponseModel> {
    return this.rfaRepository.createApplication(params)
  }
}
