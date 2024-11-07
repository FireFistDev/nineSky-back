import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';

export class CreateParcelDto {
  @IsNotEmpty()
  @IsString()
  tracking_id: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsNotEmpty()
  @IsString()
  ownerId: string; // Assuming you want to refer to the user ID for ownership
}
