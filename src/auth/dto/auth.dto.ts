import { IsEmail, IsString, Length, MinLength } from "class-validator";

export class RegisterDto {

  @IsEmail() 
  email: string;

  @IsString()
  @MinLength(6) 
  password : string

  @IsString()
  @Length(2, 30)
  first_name: string;

  @IsString()
  @Length(2, 30)
  last_name: string;

  @IsString()
  phone_number: string;

  @IsString() 
  personal_number: string;

  @IsString()
  office: string;

  @IsString()
  city: string;
  
  @IsString()
  address: string;
}



export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6) 
    password: string;
}
