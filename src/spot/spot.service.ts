import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SpotService {
  constructor(private prisma: PrismaService) {}

  async readAll() {
    return this.prisma.spot.findMany({
      include: {
        tickets: {
          // Filter les tickets qui sont payés
          where: {
            end_time: null,
          },
          include: {
            vehicle: true,
          },
        },
      },
    });
  }
}
