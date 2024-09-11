import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SpotService {
  constructor(private prisma: PrismaService) {}

  async readAll() {
    return this.prisma.spot.findMany({
      include: {
        tickets: {
          include: {
            vehicle: true,
          },
        },
      },
    });
  }
}
