import { IsNotEmpty, IsEnum, IsString, IsOptional, IsObject, ValidateNested } from 'class-validator';
import { Type as TransformType } from 'class-transformer'; // For nested objects validation
import { CreateParcelDto } from './create-parcel.dto';
  // Assuming CreateParcelDto is also imported correctly
export class CreateFlightDto {
    @IsNotEmpty()
    @IsString() // Changed to IsString as flight_id is usually a string
    flight_id: string;
  
    @IsOptional()
    @IsString()
    flight_from?: string; // New field for origin
  
    @IsOptional()
    @IsString()
    arrived_at?: string; // New field for arrival timestamp
  }
export class UploadParcelsDto {
  @IsObject()
  @ValidateNested() // Ensures the nested object is validated
  @TransformType(() => CreateFlightDto) // This is used to transform the plain object to an instance of CreateFlightDto
  flight_info: CreateFlightDto;

  @IsNotEmpty()
  @ValidateNested({ each: true }) // Ensures each item in the parcels array is validated
  @TransformType(() => CreateParcelDto) // Transforms the array of parcels to CreateParcelDto instances
  parcels: CreateParcelDto[];
}


