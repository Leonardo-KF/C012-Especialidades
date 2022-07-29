import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BillService } from '../../../core/application/services/bill.service';
import { BillsResolver } from '../../../core/presentation/resolvers/bills.resolver';
import { CreateBillInputNest } from '../inputs/createBill.input';
import { BillModelNest } from '../models/bill.model';

@Resolver(() => BillModelNest)
export class BillsResolverNest extends BillsResolver {
  constructor(billsService: BillService) {
    super(billsService);
  }

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Mutation(() => BillModelNest)
  async CreateBill(@Args('data') data: CreateBillInputNest) {
    return await this.createBill(data, 'auth012345');
  }
}
