import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMeasurementInput } from './dto/create-measurement.input';
import { UpdateMeasurementInput } from './dto/update-measurement.input';
import { ChartData } from './dto/chart-data.dto';
import { PaginationArgs } from '../common/pagination.args';

@Injectable()
export class MeasurementService {
  constructor(private readonly prisma: PrismaService) {}

  async getChartData(): Promise<ChartData[]> {
    const measurements = await this.prisma.measurement.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });

    const chartMap: { [date: string]: number } = {};

    measurements.forEach((measurement) => {
      const date = measurement.createdAt.toISOString().split('T')[0];
      if (!chartMap[date]) {
        chartMap[date] = 0;
      }
      chartMap[date] += parseFloat(measurement.gasConsumption.toString());
    });

    const chartData: ChartData[] = Object.entries(chartMap).map(
      ([date, total]) => ({
        date,
        totalGasConsumption: total,
      }),
    );

    return chartData;
  }

  async findAll({ page, limit }: PaginationArgs): Promise<any> {
    const skip = (page - 1) * limit;
    const data = await this.prisma.measurement.findMany({
      where: { deletedAt: null },
      include: { user: true },
      skip,
      take: limit,
    });
    const totalCount = await this.prisma.measurement.count({
      where: { deletedAt: null },
    });

    const totalPages = Math.ceil(totalCount / limit);

    return { data, totalCount, currentPage: page, totalPages };
  }

  async findOne(id: number): Promise<any> {
    const measurement = await this.prisma.measurement.findFirst({
      where: { id, deletedAt: null },
      include: { user: true },
    });
    if (!measurement) {
      throw new NotFoundException('Measurement not found or has been deleted.');
    }
    return measurement;
  }

  async create(input: CreateMeasurementInput): Promise<any> {
    return await this.prisma.measurement.create({
      data: {
        userId: 1,
        gasConsumption: input.gasConsumption,
        comment: input.comment,
      },
      include: {
        user: true,
      },
    });
  }

  async update(input: UpdateMeasurementInput): Promise<any> {
    const measurement = await this.findOne(input.id);
    if (!measurement) {
      throw new NotFoundException('Measurement not found or has been deleted.');
    }
    return await this.prisma.measurement.update({
      where: { id: input.id },
      data: {
        gasConsumption: input.gasConsumption,
        comment: input.comment,
      },
      include: {
        user: true,
      },
    });
  }

  async remove(id: number): Promise<boolean> {
    const measurement = await this.findOne(id);
    if (!measurement) {
      throw new NotFoundException('Measurement not found or has been deleted.');
    }
    await this.prisma.measurement.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return true;
  }
}
