import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Measurement } from '../entities/measurement.entity';

@ObjectType()
export class PaginatedMeasurements {
  @Field(() => [Measurement])
  data: Measurement[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalPages: number;
}
