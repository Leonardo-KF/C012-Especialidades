import { User } from '../entities/types/user.type';
import { UserEntity } from '../entities/user.entity';
import { IUsersRepository } from '../repositories/IUsersRepository';

export class CreateUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}
  async execute(user: User) {
    const newUser = new UserEntity(user);
    return await this.usersRepository.createUser(newUser.validate());
  }
}
