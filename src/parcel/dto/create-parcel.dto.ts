import { IsNotEmpty, IsEnum, IsNumber, IsString, IsOptional, ValidateIf, IsUUID } from 'class-validator';
import { ShippingStatus } from 'libs/enums/shipping.status.enum';

export class CreateParcelDto {
  @IsNotEmpty()
  @IsNumber()
  tracking_id: string;

  // Custom validation to check if either weight or vol_weight is provided
  @ValidateIf((o) => !o.vol_weight)
  @IsNotEmpty({ message: 'Either weight or vol_weight must be provided, but not both.' })
  @IsString()
  weight?: number;

  @ValidateIf((o) => !o.weight)
  @IsNotEmpty({ message: 'Either vol_weight or weight must be provided, but not both.' })
  @IsString()
  vol_weight?: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsEnum(ShippingStatus)
  @IsOptional()
  shipping_status?: ShippingStatus;

  @IsNotEmpty()
  @IsString()
  payment_status: string;

  @IsNotEmpty()
  @IsNumber()
  flight_id: string;

  @IsNotEmpty()
  @IsString()
  flight_from: string; // New field for origin

  @IsNotEmpty()
  @IsString()
  arrived_at: string; // New field for arrival timestamp

  @IsOptional()
  @IsString()
  description?: string; // Optional field for additional info

  @IsOptional()
  @IsString()
  recipient_name?: string; // Optional field for recipient's name

  @IsNotEmpty()
  @IsUUID() // Ensuring that user_id is a valid UUID
  ownerId: string;
}
