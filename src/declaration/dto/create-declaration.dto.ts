// create-declaration.dto.ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeclarationDto {
  @IsString()
  tracking_id: string;
  
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsNotEmpty()
  @IsString()
  website: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsString()
  invoice_Pdf?: Buffer;

}
