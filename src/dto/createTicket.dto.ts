import { IsString, Matches, IsNumber, Min, Max } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @Matches(/^[A-Z0-9]{8}$/, {
    message:
      'La référence doit être une chaîne de 8 caractères composée de lettres majuscules et de chiffres.',
  })
  reference: string;

  start_time: Date;

  @IsNumber({}, { message: 'Le numéro de place doit être un nombre.' })
  @Min(101, { message: 'Le numéro de place doit être au moins 101.' })
  @Max(106, { message: 'Le numéro de place doit être au maximum 106.' })
  spot_number: number;

  @IsNumber({}, { message: "L'ID du véhicule doit être un nombre." })
  id_vehicle: number;
}
