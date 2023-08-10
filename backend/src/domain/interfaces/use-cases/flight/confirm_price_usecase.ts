
import { ResponseModel } from "../../../models/response.model";


export interface ConfirmPriceUseCase {
    execute(flight_id:string): Promise<ResponseModel>;
}