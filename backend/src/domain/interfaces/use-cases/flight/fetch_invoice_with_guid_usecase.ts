
import { ResponseModel } from "../../../models/response.model";



export interface FetchInvoiceWithGuidUsecase {
    execute(guid:any): Promise<ResponseModel>;
}