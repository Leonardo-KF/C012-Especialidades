import { User } from '../../domain/types/user.type';

export interface IUsersRepository {
  findUserByAuth0Id(auth0UserId: string): Promise<User | undefined>;

  createUser(user: User): Promise<User>;

  findUserById(id: string): Promise<User>;
}
