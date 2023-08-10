import { ResponseModel } from "../../../models/response.model";

export interface LoginUseCase {
    execute(email:string,password:string): Promise<ResponseModel>;
}