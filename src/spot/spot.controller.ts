import { Controller, Get } from '@nestjs/common';
import { SpotService } from './spot.service';
import { Spot } from './spot.entity';

@Controller('spots')
export class SpotController {
  constructor(private readonly spotService: SpotService) {}

  @Get('all')
  async getAllSpots(): Promise<Spot[] | null> {
    return await this.spotService.readAll();
  }
}
