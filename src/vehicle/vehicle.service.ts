import { Injectable } from '@nestjs/common';
import { Vehicle, VehicleType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}

  async readAll(): Promise<Vehicle[] | null> {
    return await this.prisma.vehicle.findMany();
  }

  async readOne(immatriculation: string): Promise<Vehicle | null> {
    return this.prisma.vehicle.findFirst({
      where: {
        immatriculation: immatriculation,
      },
      include: {
        tickets: {
          where: {
            end_time: null,
            amount: null,
          },
        },
      },
    });
  }

  async create(data: {
    immatriculation: string;
    type: VehicleType;
  }): Promise<Vehicle | null> {
    const vehicle = await this.prisma.vehicle.create({
      data: {
        immatriculation: data.immatriculation,
        type: data.type,
      },
    });
    return vehicle; // Retourne le véhicule créé
  }
}
