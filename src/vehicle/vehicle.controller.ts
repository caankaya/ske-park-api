import { Controller, Get, NotFoundException } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { Vehicle } from '@prisma/client';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get('all')
  async getAllVehicles(): Promise<{
    cars: Vehicle[];
    motors: Vehicle[];
  } | null> {
    try {
      const results = await this.vehicleService.readAll();

      if (results.length === 0) {
        throw new NotFoundException(
          "Il n'y a pas de véhicules dans le parking",
        );
      }
      const cars = results.filter((e) => e.type === 'Car');
      const motors = results.filter((e) => e.type === 'Motor');

      // Utiliser la syntaxe correcte pour créer un objet
      return { cars, motors };
    } catch (error) {
      throw new NotFoundException("Il n'y a pas de véhicules dans le parking");
    }
  }
}
