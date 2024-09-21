import { IsEmail, IsNumberString, IsPhoneNumber, IsString, Length, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @Length(2, 30)
  name: string;

  @IsString()
  @Length(2, 30)
  first_name: string;
  @IsString()
  @MinLength(6) 
  password : string
  @IsString()
  @Length(2, 30)
  last_name: string;

  @IsEmail() 
  email: string;
  // @IsPhoneNumber(null) // Validates based on phone number format of a specific country, or generic with `null`
  @IsString()
  phone_number: string;

  @IsString() 
  personal_number: string;



  // @IsString()
  // office: string;
  // @IsString()
  // city: string;
  // @IsString()
  // address: string;
}
  export class LoginDto {
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(6) 
    password: string;
  }
