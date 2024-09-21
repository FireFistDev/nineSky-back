import { IsNotEmpty, IsEnum, IsNumber, IsString, IsOptional, ValidateIf ,IsUUID  } from 'class-validator';
import { ShippingStatus } from 'libs/enums/shipping.status.enum';
export class CreateParcelDto {
  @IsNotEmpty()
  @IsNumber()
  tracking_id: number;

  // Custom validation to check if either weight or vol_weight is provided
  @ValidateIf((o) => !o.vol_weight)
  @IsNotEmpty({ message: 'Either weight or vol_weight must be provided, but not both.' })
  @IsString()
  weight?: string;

  @ValidateIf((o) => !o.weight)
  @IsNotEmpty({ message: 'Either vol_weight or weight must be provided, but not both.' })
  @IsString()
  vol_weight?: string;

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
  flight_id: number;

  @IsNotEmpty()
  @IsUUID()  // Ensuring that user_id is a valid UUID
  user_id: string; 
  
}
