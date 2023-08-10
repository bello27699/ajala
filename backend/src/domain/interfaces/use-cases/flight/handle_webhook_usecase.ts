

import { ResponseModel } from "../../../models/response.model";


export interface HandleWebHookUseCase {
    execute(event:any): void;
}