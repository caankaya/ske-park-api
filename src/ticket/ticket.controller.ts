import {
  Controller,
  NotFoundException,
  Post,
  Body,
  ConflictException,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { SpotService } from 'src/spot/spot.service';
import { Ticket, VehicleType } from '@prisma/client';
import { entryVehicle } from '../dto/entryVehicle.dto';
import { CreateTicketDto } from 'src/dto/createTicket.dto';
import { tikcetReference } from 'src/dto/ticketReference.dto';

@Controller('ticket')
export class TicketController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly vehicleService: VehicleService,
    private readonly spotService: SpotService,
  ) {}

  @Post('/create')
  async createTicket(
    @Body() entryVehicle: entryVehicle,
  ): Promise<{ message: string }> {
    try {
      const { number, immatriculation, type } = entryVehicle;

      // Vérifier si le véhicule est déja dans le parking et qui a un ticket en cours
      const existingTicket = await this.vehicleService.readOne(immatriculation);

      if (existingTicket) {
        throw new ConflictException('Le véhicule est déja dans le parking');
      }

      // Ensuite je vérifie si la place est disponible
      const spot = await this.spotService.readOne(number);
      if (!spot || !spot.state) {
        throw new ConflictException("La place n'est disponible");
      }

      // Si la place est disponible, je mets à jour l'état de la place
      await this.spotService.update({
        number: number,
        column: 'state',
        value: false,
      });

      // Ensuite je crée l'entrée du véhicule dans le parking
      const vehicle = await this.vehicleService.create({
        immatriculation: immatriculation,
        type: type as VehicleType,
      });

      // Puis je générère un numéro unique pour la référence de ticket
      let reference: string;
      let isThereTicket: Ticket;
      do {
        reference = this.ticketService.generateReference();
        isThereTicket = await this.ticketService.readOne(reference);
      } while (isThereTicket); // Tant que la référence existe, générez une autre référence

      // Je prépare le terrain pour la création de ticket
      const ticket = {
        reference: reference,
        start_time: new Date(),
        spot_number: number,
        id_vehicle: vehicle.immatriculation,
      };

      // Finalement je crée le ticket et je retourne un message de succès
      await this.ticketService.create(ticket);

      return {
        message: 'Ticket a été créé avec succès',
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('/delete')
  async deleteTicket(@Body() ticketReference: tikcetReference): Promise<{
    message: string;
  }> {
    try {
      if (!ticketReference) {
        throw new HttpException(
          'Le numéro de référence est requis',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Vérifier si le ticket et la voiture qui est attaché à ce qui ticket existent
      const ticket = await this.ticketService.readOne(
        ticketReference.reference,
      );

      if (!ticket || !ticket.vehicle) {
        throw new ConflictException("Le ticket n'est pas valide");
      }

      // Supprimer le ticket
      await this.ticketService.delete(ticketReference);

      // Supprimer le véhicule
      await this.vehicleService.delete(ticket.vehicle.immatriculation);

      // Changer l'état de la place en 'libre' (true)
      await this.spotService.update({
        number: ticketReference.spotNumber,
        column: 'state',
        value: true,
      });

      return {
        message: 'Le ticket a été supprimé, et la place est désormais libre.',
      };
    } catch (error) {
      console.warn(error);
      throw error;
    }
  }
}
