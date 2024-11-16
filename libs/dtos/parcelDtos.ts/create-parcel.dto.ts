import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { ShippingStatus } from 'libs/enums/shipping.status.enum';

export class CreateParcelDto {
  @IsNotEmpty()
  @IsString()
  tracking_id: string;

  @IsOptional()
  @IsNumber()
  weight: number;

  @IsOptional()
  @IsEnum(ShippingStatus)
  shipping_status?: ShippingStatus;

  @IsNotEmpty()
  @IsString()
  ownerId: string; // Assuming you want to refer to the user ID for ownership
}
