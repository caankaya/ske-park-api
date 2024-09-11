import { Module } from '@nestjs/common';
import { CarController } from './vehicle.controller';
import { CarService } from './vehicle.service';

@Module({
  controllers: [CarController],
  providers: [CarService]
})
export class CarModule {}
