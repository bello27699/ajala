
import { ResponseModel } from "../../../models/response.model";


export interface FetchAirlinesUseCase {
    execute(): Promise<ResponseModel>;
}