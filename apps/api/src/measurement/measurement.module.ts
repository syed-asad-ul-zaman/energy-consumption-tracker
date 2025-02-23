import { Module } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { MeasurementResolver } from './measurement.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [MeasurementResolver, MeasurementService, PrismaService],
})
export class MeasurementModule {}
