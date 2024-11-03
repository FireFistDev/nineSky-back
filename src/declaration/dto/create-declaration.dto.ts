import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsNumber,
    ValidateIf,
  } from 'class-validator';
  
  export class CreateDeclarationDto {
    @IsNotEmpty()
    @IsNumber()
    parcelId: string;
  
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
  
    // // If price is greater than 100, the pdf_path becomes required
    // @ValidateIf((o) => parseFloat(o.price) > 300)
    // @IsNotEmpty({ message: 'PDF path is required when the price exceeds 100' })
    // @IsString()
    // pdf_path: string;
  }