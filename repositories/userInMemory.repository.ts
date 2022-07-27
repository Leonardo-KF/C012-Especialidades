import { User } from '../entities/types/user.type';
import { IUsersRepository } from './IUsersRepository';

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];
  findUserByAuth0Id(auth0UserId: string): Promise<User | undefined> {
    const userByAuth0 = this.users.find(
      (user) => user.auth0UserId === auth0UserId,
    );
    return Promise.resolve(userByAuth0);
  }

  createUser(user: User): Promise<User> {
    this.users.push(user);
    return Promise.resolve(user);
  }
}
