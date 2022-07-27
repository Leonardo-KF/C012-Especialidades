import { User } from '../entities/types/user.type';

export interface IUsersRepository {
  findUserByAuth0Id(auth0UserId: string): Promise<User | undefined>;

  createUser(user: User): Promise<User>;
}
