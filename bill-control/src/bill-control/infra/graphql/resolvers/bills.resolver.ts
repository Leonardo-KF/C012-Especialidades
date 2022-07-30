import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersRepositoryPrisma } from 'src/repositories/user.repository';
import { BillService } from '../../../core/application/services/bill.service';
import { BillsResolver } from '../../../core/presentation/resolvers/bills.resolver';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Auth0Id, CurrentUser } from '../../auth/getCurrentUser';
import { CreateBillInputNest } from '../inputs/createBill.input';
import { UpdateBillInputNest } from '../inputs/updateBill.input';
import { BillModelNest } from '../models/bill.model';

@UseGuards(AuthorizationGuard)
@Resolver(() => BillModelNest)
export class BillsResolverNest extends BillsResolver {
  constructor(billsService: BillService, private user: UsersRepositoryPrisma) {
    super(billsService);
  }

  @Mutation(() => BillModelNest)
  async CreateBill(
    @Args('data') data: CreateBillInputNest,
    @CurrentUser() auth0Id: Auth0Id,
  ) {
    return await this.createBill(data, auth0Id.sub);
  }

  @Mutation(() => BillModelNest)
  async UpdateBill(
    @Args('data') data: UpdateBillInputNest,
    @Args('billId') billId: string,
    @CurrentUser() auth0Id: Auth0Id,
  ) {
    return await this.updateBill(data, billId, auth0Id.sub);
  }

  @Mutation(() => BillModelNest)
  async DeleteBill(
    @Args('billId') billId: string,
    @CurrentUser() auth0Id: Auth0Id,
  ) {
    return await this.deleteBill(billId, auth0Id.sub);
  }
}
