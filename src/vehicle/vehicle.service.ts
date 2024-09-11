import { Injectable } from '@nestjs/common';
import { Vehicle } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

const vehicle = 'vehicle';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}

  async readAll(): Promise<Vehicle[] | null> {
    return await this.prisma.vehicle.findMany();
  }
}
