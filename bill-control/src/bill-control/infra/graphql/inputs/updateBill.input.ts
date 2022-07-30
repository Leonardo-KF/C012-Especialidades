import { Field, InputType } from '@nestjs/graphql';
import { UpdateBillInput } from '../../../core/presentation/inputs/update-bill.input';

@InputType()
export class UpdateBillInputNest implements UpdateBillInput {
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  total?: number;
  @Field({ nullable: true })
  isPaid?: boolean;
}
