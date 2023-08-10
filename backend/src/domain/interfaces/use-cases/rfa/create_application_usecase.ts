import { RFARequestParams } from "@/domain/models/tour/rfa/rfa_request_params";
import { ResponseModel } from "../../../models/response.model";

export interface CreateApplicationUseCase {
 execute(params: RFARequestParams): Promise<ResponseModel>;
}
