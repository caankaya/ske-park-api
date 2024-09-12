import { Injectable } from '@nestjs/common';
import { Ticket } from '@prisma/client';
import { CreateTicketDto } from '../dto/createTicket.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTicketDto: CreateTicketDto): Promise<Ticket | null> {
    const { id_vehicle, reference, spot_number, start_time } = createTicketDto;
    return await this.prisma.ticket.create({
      data: {
        reference: reference,
        start_time: start_time,
        spot_number: spot_number,
        id_vehicle: id_vehicle,
      },
    });
  }

  async readOne(reference: string): Promise<Ticket | null> {
    return await this.prisma.ticket.findFirst({
      where: {
        reference: reference,
      },
    });
  }

  generateReference(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let reference = '';

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      reference += characters[randomIndex];
    }
    return reference;
  }
}
