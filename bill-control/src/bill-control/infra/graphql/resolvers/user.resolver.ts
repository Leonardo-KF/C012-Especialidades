import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BillService } from '../../../core/application/services/bill.service';
import { UserService } from '../../../core/application/services/user.service';
import { UserResolver } from '../../../core/presentation/resolvers/user.resolver';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Auth0Id, CurrentUser } from '../../auth/getCurrentUser';
import { UserModelNest } from '../models/user.model';

@UseGuards(AuthorizationGuard)
@Resolver(() => UserModelNest)
export class UserResolverNest extends UserResolver {
  constructor(userService: UserService, private billService: BillService) {
    super(userService);
  }

  @Query(() => UserModelNest)
  async Me(@CurrentUser() auth0Id: Auth0Id) {
    console.log(auth0Id);
    const user = await this.me(auth0Id.sub);
    return user;
  }

  @ResolveField()
  async bills(@Parent() user: UserModelNest) {
    const bills = await this.billService.findBillsByUserId(user.id);
    return bills;
  }
}
