import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../../../core/presentation/models/user.model';
import { BillModelNest } from './bill.model';

@ObjectType()
export class UserModelNest implements UserModel {
  @Field(() => ID)
  id: string;
  @Field()
  auth0UserId: string;
  @Field(() => [BillModelNest])
  bills: BillModelNest[];
}
