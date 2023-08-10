import { ResponseModel } from "../../../models/response.model";

export interface HandleLDAPRedirectUseCase {
    execute(userx:any): Promise<any>;
}