import { IsEmail, IsNumberString, IsPhoneNumber, IsString, Length, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @Length(2, 30)
  name: string;

  @IsString()
  @Length(2, 30)
  first_name: string;
  @IsString()
  password : string
  @IsString()
  @Length(2, 30)
  last_name: string;

  @IsEmail() 
  email: string;
  // @IsPhoneNumber(null) // Validates based on phone number format of a specific country, or generic with `null`
  @IsNumberString() 
  phone_number: string;

  @IsNumberString() // Ensures that the field contains only numeric characters
  personal_number: string;
}
  export class LoginDto {
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(6) 
    password: string;
  }
