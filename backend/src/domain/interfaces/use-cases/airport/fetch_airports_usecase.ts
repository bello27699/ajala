
import { ResponseModel } from "../../../models/response.model";


export interface FetchAirPortsUseCase {
    execute(keyword: string): Promise<ResponseModel>;
}