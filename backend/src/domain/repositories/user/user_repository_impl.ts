import { DataSource } from "typeorm";
import { UserRepository } from "../../interfaces/repositories/user_repository";
import { ResponseModel } from "../../models/response.model";
import { send200, send400, signToken } from "../../../utils/helpers";
import { User } from "../../models/user.entity";
import passport from "passport";

export class UserRepositoryImpl implements UserRepository {
  db: DataSource | any;
  constructor(db: DataSource) {
    this.db = db.getRepository(User);
  }
  async handle_ldap_redirect(userx: any): Promise<any> {
    const accountDetails = {
      firstName: userx.displayName,
      middleName: "",
      lastName: "",
      directoryLogin: true,
      email: userx._json.email || userx._json.unique_name,
      _id: userx.oid,
    };

    const tokens = await signToken(accountDetails);

    return tokens;
  }

  async login_user() {
    try {
      passport.authenticate("azuread-openidconnect", { failureRedirect: "/" });
    } catch (error: any) {
      console.log(error);
    }
  }
}
