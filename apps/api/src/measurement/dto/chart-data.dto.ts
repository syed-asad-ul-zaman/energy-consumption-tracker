import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class ChartData {
  @Field()
  date: string; // Format: YYYY-MM-DD

  @Field(() => Float)
  totalGasConsumption: number;
}
