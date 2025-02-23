import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNumber, IsPositive, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateMeasurementInput {
  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  gasConsumption: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  comment?: string;
}
