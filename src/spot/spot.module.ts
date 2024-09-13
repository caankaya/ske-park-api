import { Module } from '@nestjs/common';
import { SpotController } from './spot.controller';
import { SpotService } from './spot.service';

@Module({
  providers: [SpotService],
  controllers: [SpotController],
})
export class SpotModule {}
