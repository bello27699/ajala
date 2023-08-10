import { UserRepository } from "../../interfaces/repositories/user_repository";
import { LoginUseCase } from "../../interfaces/use-cases/user/login_usecase";

import { ResponseModel } from "../../models/response.model";

export class Login implements LoginUseCase {
  userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(email: string, password: string): Promise<ResponseModel> {
    return await this.userRepository.login_user();
  }
}
