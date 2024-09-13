import { Injectable } from '@nestjs/common';
import { Spot } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SpotService {
  constructor(private prisma: PrismaService) {}

  async readAll(): Promise<Spot[] | null> {
    return this.prisma.spot.findMany({
      include: {
        tickets: {
          include: {
            vehicle: true,
          },
        },
      },
      orderBy: {
        number: 'asc',
      },
    });
  }

  async readOne(number: number): Promise<Spot | null> {
    return await this.prisma.spot.findUnique({
      where: {
        number: number,
      },
    });
  }

  async update({
    number,
    column,
    value,
  }: {
    number: number;
    column: string;
    value: boolean;
  }): Promise<Spot> {
    return this.prisma.spot.update({
      where: {
        number: number,
      },
      data: {
        [column]: value,
      },
    });
  }
}
