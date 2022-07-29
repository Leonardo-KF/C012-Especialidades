import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BillModel } from '../../../core/presentation/models/bill.model';

@ObjectType()
export class BillModelNest implements BillModel {
  @Field(() => ID)
  id: string;
  @Field()
  title: string;
  @Field()
  dueDate: Date;
  @Field()
  total: number;
  @Field()
  isPaid: boolean;
  @Field()
  barcode: string;
}
