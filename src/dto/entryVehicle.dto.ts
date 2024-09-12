import { IsString, Matches, IsIn, IsNumber, Min, Max } from 'class-validator';

export class entryVehicle {
  @IsString()
  @Matches(/^[A-Z]{2,3}-\d{2,3}-[A-Z]{2,3}$/, {
    message:
      "Le format de l'immatriculation est invalide. Format attendu : AA-123-AA",
  })
  immatriculation: string;

  @IsString()
  @IsIn(['Car', 'Motor'], {
    message: "Le type de véhicule doit être 'Car' ou 'Motor'",
  })
  type: string;

  @IsNumber({}, { message: 'Le numéro de place doit être un nombre' })
  @Min(101, { message: 'Le numéro de place doit être au moins 101' })
  @Max(106, { message: 'Le numéro de place doit être au maximum 106' })
  number: number;
}
