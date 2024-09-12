import { IsNumber, IsString, Matches, Max, Min } from 'class-validator';

export class tikcetReference {
  @IsString()
  @Matches(/^[A-Z0-9]{8}$/, {
    message:
      'La référence doit être une chaîne de 8 caractères composée de lettres majuscules et de chiffres.',
  })
  reference: string;

  @IsNumber({}, { message: 'Le numéro de place doit être un nombre' })
  @Min(101, { message: 'Le numéro de place doit être au moins 101' })
  @Max(106, { message: 'Le numéro de place doit être au maximum 106' })
  spotNumber: number;
}
