import { User } from '../../domain/types/user.type';

export interface IUserService {
  findUserByAuth0Id(auth0Id: string): Promise<User>;
}
