import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpotController } from 'src/spot/spot.controller';
import { SpotService } from 'src/spot/spot.service';
import { Spot } from 'src/spot/spot.entity';
import { DataSource } from 'typeorm';
import { Ticket } from 'src/ticket/ticket.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      entities: [Spot, Ticket, Vehicle],
      synchronize: true, // à mettre sur `false` en production pour éviter de perdre des données
    }),
  ],

  controllers: [SpotController],
  providers: [SpotService],
})
export class AppModule {}
