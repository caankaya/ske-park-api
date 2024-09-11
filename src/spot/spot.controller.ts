import { Controller, Get, NotFoundException } from '@nestjs/common';
import { SpotService } from './spot.service';
import { Spot } from '@prisma/client';

@Controller('spots')
export class SpotController {
  constructor(private readonly spotService: SpotService) {}

  @Get('all')
  async getAllSpots(): Promise<any | null> {
    try {
      // Récupère toutes les places via le service
      const spots = await this.spotService.readAll();

      // Vérifie si des places ont été trouvées
      if (!spots || !spots.length) {
        throw new NotFoundException(
          'Une erreur est survenue lors de la recherche des places du parking',
        ); // Lance une exception si aucune place n'est trouvée
      }

      // Calcule le nombre total de places
      const total = spots.length;

      // Calcule le nombre de places disponibles (state == true)
      const available = spots.filter((e) => e.state).length;

      // Calcule le nombre de places occupées (state == false)
      const busy = spots.filter((e) => !e.state).length;

      // Calcule le pourcentage des places occupées
      const busyPercentage = (busy / total) * 100;

      return {
        spots,
        total,
        available,
        busy,
        busyPercentage: busyPercentage.toFixed(0),
      };
    } catch (error) {
      // En cas d'erreur, log l'erreur et renvoie une exception not found
      console.error(error);
      throw new NotFoundException(
        'Une erreur est survenue lors de la recherche des places du parking',
      );
    }
  }
}
