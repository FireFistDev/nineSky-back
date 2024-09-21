import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateFlightDto {
  @IsNotEmpty()
  @IsString()
  flight_from: string;

  @IsNotEmpty()
  arrival_date: string;
}
