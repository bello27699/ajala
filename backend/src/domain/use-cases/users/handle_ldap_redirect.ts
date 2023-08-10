import { UserRepository } from "../../interfaces/repositories/user_repository";
import { HandleLDAPRedirectUseCase } from "../../interfaces/use-cases/user/handle_ldap_redirect_usecase";


export class HandleLDAPRedirect implements HandleLDAPRedirectUseCase {
  userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userx:any): Promise<any> {
    return await this.userRepository.handle_ldap_redirect(userx);
  }
}
