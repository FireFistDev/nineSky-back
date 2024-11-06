import { IsNotEmpty, IsEnum, IsNumber, IsString, IsOptional, ValidateIf, IsUUID } from 'class-validator';
import { PaymentType } from 'libs/enums/payment.status.enum';
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

  @IsEnum(PaymentType)
  @IsString()
  payment_status?: PaymentType;

  @IsNotEmpty()
  @IsNumber()
  flight_id: string;

  @IsNotEmpty()
  @IsString()
  flight_from: string; // New field for origin

  @IsNotEmpty()
  @IsString()
  arrived_at: string; // New field for arrival timestamp

  @IsNotEmpty()
  ownerId: string;
}
