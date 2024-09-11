import { Module } from '@nestjs/common';
import { SpotController } from './spot.controller';
import { Spot } from './spot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpotService } from './spot.service';

@Module({
  imports: [TypeOrmModule.forFeature([Spot])],
  providers: [SpotService],
  controllers: [SpotController],
})
export class SpotModule {}
