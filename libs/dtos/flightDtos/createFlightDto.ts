import { IsNotEmpty, IsEnum, IsString, IsOptional  } from 'class-validator';
import { FlightFrom } from 'libs/enums/flightsFrom.enum';

export class CreateFlightDto {
    @IsNotEmpty()
    @IsString() 
    flight_id: string;
    
    @IsNotEmpty()
    @IsEnum(FlightFrom)
    flight_from: FlightFrom; 

    @IsOptional()
    @IsString()
    arrived_at?: string; 
  }