import { IsEmail, IsString, IsOptional, Length, MinLength, Matches } from "class-validator";

export class RegisterDto {

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsString()
  @Length(2, 30, { message: 'First name must be between 2 and 30 characters long' })
  first_name: string;

  @IsString()
  @Length(2, 30, { message: 'Last name must be between 2 and 30 characters long' })
  last_name: string;

  @IsString()
  @Matches(/^[0-9]+$/, { message: 'Phone number must contain only digits' })
  @Length(9, 15, { message: 'Phone number must be between 9 and 15 digits' })
  phone_number: string;

  @IsString()
  @Matches(/^[0-9]+$/, { message: 'Personal number must contain only digits' })
  @Length(11, 11, { message: 'Personal number must be exactly 11 digits' })
  personal_number: string;

  @IsString()
  @IsOptional()  // Office might not always be required
  office: string;

  @IsString()
  @IsOptional()  // City might not always be required
  city: string;

  @IsString()
  @IsOptional()  // Address might not always be required
  address: string;
}




export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6) 
    password: string;
}
