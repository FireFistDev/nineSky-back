import { IsEmail, IsEnum,  IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches } from 'class-validator';
import { AccessLevel } from 'libs/enums/accese.levels.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9]{11}$/, { message: 'Personal number must be exactly 11 digits' })
  personal_number: string;

  @IsNotEmpty()
  @IsString()
  office: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsEnum(AccessLevel)
  @IsOptional()
  accessLevel? : AccessLevel;
}
