import { Field, InputType } from '@nestjs/graphql';
import { CreateBillInput } from '../../../core/presentation/inputs/create-bill.input';

@InputType()
export class CreateBillInputNest implements CreateBillInput {
  @Field()
  barcode: string;
  @Field()
  dueDate: Date;
  @Field()
  total: number;
  @Field()
  isPaid: boolean;
  @Field()
  title: string;
}
