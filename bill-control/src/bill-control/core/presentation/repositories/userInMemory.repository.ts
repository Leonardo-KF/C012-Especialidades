import { User } from '../../domain/types/user.type';
import { IUsersRepository } from '../../application/IRepositories/IUsersRepository';

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];
  findUserByAuth0Id(auth0UserId: string): Promise<User | undefined> {
    let userIndex = 0;
    const userByAuth0 = this.users.find((user, index) => {
      if (user.auth0UserId === auth0UserId) {
        userIndex = index;
        return user;
      }
    });

    return Promise.resolve(this.users[userIndex]);
  }

  createUser(user: User): Promise<User> {
    this.users.push(user);
    return Promise.resolve(user);
  }
}
