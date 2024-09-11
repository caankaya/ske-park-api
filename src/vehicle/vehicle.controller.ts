import { Controller, Get } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.entity';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get('all')
  async getAllVehicles(): Promise<Vehicle[] | null> {
    return this.vehicleService.readAll();
  }
}
