import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number): Promise<any> {
    try {
      return await this.prisma.user.findUnique({ where: { id } });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch user: ${error.message}`);
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Failed to fetch user: ${error.message}`);
      } else {
        throw new Error('Failed to fetch user');
      }
    }
  }
}
