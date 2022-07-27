import { IUsersRepository } from '../../repositories/IUsersRepository';

export class UserExist {
  constructor(private readonly usersRepository: IUsersRepository) {}
  async execute(auth0UserId: string) {
    let user = await this.usersRepository.findUserByAuth0Id(auth0UserId);
    if (!user) {
      user = await this.usersRepository.createUser({
        auth0UserId: auth0UserId,
        bills: [],
      });
    }
    return user;
  }
}
