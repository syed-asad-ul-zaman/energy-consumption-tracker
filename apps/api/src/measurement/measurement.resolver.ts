import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MeasurementService } from './measurement.service';
import { Measurement } from './entities/measurement.entity';
import { CreateMeasurementInput } from './dto/create-measurement.input';
import { UpdateMeasurementInput } from './dto/update-measurement.input';
import { ChartData } from './dto/chart-data.dto';
import { PaginationArgs } from '../common/pagination.args';
import { PaginatedMeasurements } from './dto/paginated-measurements.dto';

@Resolver(() => Measurement)
export class MeasurementResolver {
  constructor(private readonly measurementService: MeasurementService) {}

  @Query(() => [ChartData], { name: 'totalGasConsumptionByDate' })
  async getTotalGasConsumptionByDate() {
    return this.measurementService.getChartData();
  }

  @Query(() => PaginatedMeasurements, { name: 'measurements' })
  async getAllMeasurements(@Args() { page, limit }: PaginationArgs) {
    return await this.measurementService.findAll({ page, limit });
  }

  @Query(() => Measurement, { name: 'measurement', nullable: true })
  async getMeasurementById(@Args('id', { type: () => Int }) id: number) {
    return await this.measurementService.findOne(id);
  }

  @Mutation(() => Measurement)
  async createMeasurement(@Args('input') input: CreateMeasurementInput) {
    return await this.measurementService.create(input);
  }

  @Mutation(() => Measurement)
  async updateMeasurement(@Args('input') input: UpdateMeasurementInput) {
    return await this.measurementService.update(input);
  }

  @Mutation(() => Boolean)
  async removeMeasurement(@Args('id', { type: () => Int }) id: number) {
    return await this.measurementService.remove(id);
  }
}
