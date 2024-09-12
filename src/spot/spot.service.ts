import { Injectable } from '@nestjs/common';
import { Spot } from '@prisma/client';
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

  async update({ number, column, value }) {
    return this.prisma.spot.update({
      where: {
        number: number, // Utiliser le champ number pour la recherche
      },
      data: {
        [column]: value, // Utilisation de la clé dynamique
      },
    });
  }
}
