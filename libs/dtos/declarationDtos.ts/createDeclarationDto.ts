import { IsString, IsNumber, IsOptional, IsUrl, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDeclarationDto {
    @IsString()
  @IsNotEmpty()
  tracking_id: string;
  
  @IsString()
  @IsNotEmpty()
  type: string;

  // @IsNumber()  // Transform string to number
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  website: string;

  @IsString()
  @IsOptional()  // Optional field
  comment?: string;

  @IsOptional()
  invoice_Pdf?: Buffer;  // This will accept a file buffer
}
