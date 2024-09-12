import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SpotController } from 'src/spot/spot.controller';
import { SpotService } from 'src/spot/spot.service';
import { VehicleController } from 'src/vehicle/vehicle.controller';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketService } from 'src/ticket/ticket.service';
import { TicketController } from 'src/ticket/ticket.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],

  controllers: [SpotController, VehicleController, TicketController],
  providers: [SpotService, VehicleService, TicketService, PrismaService],
})
export class AppModule {}
