import { ResponseModel } from "../../models/response.model";
import { User } from "../../models/user.entity";

export interface UserRepository {
  login_user(): any;
  handle_ldap_redirect(userx: any): Promise<any>;
}
