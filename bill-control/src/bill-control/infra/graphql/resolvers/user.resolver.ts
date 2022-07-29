import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BillService } from '../../../core/application/services/bill.service';
import { UserService } from '../../../core/application/services/user.service';
import { UserResolver } from '../../../core/presentation/resolvers/user.resolver';
import { BillModelNest } from '../models/bill.model';
import { UserModelNest } from '../models/user.model';

@Resolver(() => UserModelNest)
export class UserResolverNest extends UserResolver {
  constructor(userService: UserService, private billService: BillService) {
    super(userService);
  }

  @Query(() => UserModelNest)
  async Me() {
    const user = await this.me('auth012345');
    return user;
  }

  @ResolveField(() => [BillModelNest])
  async userBills(@Parent() user: UserModelNest) {
    console.log(user.id);
    const bills = await this.billService.findBillsByUserId(user.id);
    return bills;
  }
}
