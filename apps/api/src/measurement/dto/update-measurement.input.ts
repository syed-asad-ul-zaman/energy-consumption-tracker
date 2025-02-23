import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CreateMeasurementInput } from './create-measurement.input';

@InputType()
export class UpdateMeasurementInput extends PartialType(
  CreateMeasurementInput,
) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
