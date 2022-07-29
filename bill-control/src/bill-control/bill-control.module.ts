import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { resolve } from 'path';
import { IBillsRepository } from './core/application/IRepositories/IBillsRepository';
import { IUsersRepository } from './core/application/IRepositories/IUsersRepository';
import { BillService } from './core/application/services/bill.service';
import { UserService } from './core/application/services/user.service';
import { CreateBillUseCase } from './core/application/useCases/createBill.useCase';
import { DeleteBillUseCase } from './core/application/useCases/deleteBill.useCase';
import { FindBillsByUserUseCase } from './core/application/useCases/findBillsByUser.useCase';
import { FindBillsDueToday } from './core/application/useCases/findBillsDueToday.useCase';
import { UpdateBillUseCase } from './core/application/useCases/updateBillUseCase';
import { UserValidation } from './core/application/utils/userValidationservice';
import { BillsRepositoryInMemory } from './core/presentation/repositories/billsInMemory.repository';
import { UsersRepositoryInMemory } from './core/presentation/repositories/userInMemory.repository';
import { BillsResolverNest } from './infra/graphql/resolvers/bills.resolver';
import { UserResolverNest } from './infra/graphql/resolvers/user.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],

  providers: [
    BillsResolverNest,
    UserResolverNest,
    {
      provide: BillsRepositoryInMemory,
      useClass: BillsRepositoryInMemory,
    },
    {
      provide: UsersRepositoryInMemory,
      useClass: UsersRepositoryInMemory,
    },
    {
      provide: UserValidation,
      useFactory: (
        usersRepository: IUsersRepository,
        billsRepository: IBillsRepository,
      ) => {
        return new UserValidation(usersRepository, billsRepository);
      },
      inject: [UsersRepositoryInMemory, BillsRepositoryInMemory],
    },
    {
      provide: CreateBillUseCase,
      useFactory: (
        billsRepository: IBillsRepository,
        userValidation: UserValidation,
      ) => {
        return new CreateBillUseCase(billsRepository, userValidation);
      },
      inject: [BillsRepositoryInMemory, UserValidation],
    },
    {
      provide: DeleteBillUseCase,
      useFactory: (
        billsRepository: IBillsRepository,
        userValidation: UserValidation,
      ) => {
        return new DeleteBillUseCase(billsRepository, userValidation);
      },
      inject: [BillsRepositoryInMemory, UserValidation],
    },
    {
      provide: UpdateBillUseCase,
      useFactory: (
        billsRepository: IBillsRepository,
        userValidation: UserValidation,
      ) => {
        return new UpdateBillUseCase(billsRepository, userValidation);
      },
      inject: [BillsRepositoryInMemory, UserValidation],
    },
    {
      provide: FindBillsByUserUseCase,
      useFactory: (billsRepository: IBillsRepository) => {
        return new FindBillsByUserUseCase(billsRepository);
      },
      inject: [BillsRepositoryInMemory],
    },
    {
      provide: FindBillsDueToday,
      useFactory: (billsRepository: IBillsRepository) => {
        return new FindBillsDueToday(billsRepository);
      },
      inject: [BillsRepositoryInMemory],
    },
    {
      provide: BillService,
      useFactory: (
        createBillUseCase: CreateBillUseCase,
        updateBillUseCase: UpdateBillUseCase,
        deleteBillUseCase: DeleteBillUseCase,
        findBillsByUserUseCase: FindBillsByUserUseCase,
        findBillsDueToday: FindBillsDueToday,
      ) => {
        return new BillService(
          createBillUseCase,
          updateBillUseCase,
          deleteBillUseCase,
          findBillsByUserUseCase,
          findBillsDueToday,
        );
      },
      inject: [
        CreateBillUseCase,
        UpdateBillUseCase,
        DeleteBillUseCase,
        FindBillsByUserUseCase,
        FindBillsDueToday,
      ],
    },
    {
      provide: UserService,
      useFactory: (userValidation: UserValidation) => {
        return new UserService(userValidation);
      },
      inject: [UserValidation],
    },
  ],
})
export class BillControlModule {}
