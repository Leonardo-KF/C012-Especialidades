import { IUsersRepository } from 'src/bill-control/core/application/IRepositories/IUsersRepository';
import { User } from 'src/bill-control/core/domain/types/user.type';
import { PrismaService } from '../database/prisma/prisma.service';

export class UsersRepositoryPrisma implements IUsersRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return {
      id: user.id,
      auth0UserId: user.auth0Id,
      bills: [],
    };
  }
  async findUserByAuth0Id(auth0UserId: string): Promise<User | undefined> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { auth0Id: auth0UserId },
      });

      return {
        id: user.id,
        auth0UserId: user.auth0Id,
        bills: [],
      };
    } catch {
      return undefined;
    }
  }
  async createUser(data: User): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        id: data.id,
        auth0Id: data.auth0UserId,
      },
    });

    return {
      id: user.id,
      auth0UserId: user.auth0Id,
      bills: [],
    };
  }
}
