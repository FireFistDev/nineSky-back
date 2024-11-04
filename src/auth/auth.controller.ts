import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body:RegisterDto ) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto ) {
    return this.authService.login(body);
  }

  @Post('forget-password')
  async forgetPassword(@Body() body :  { email : string}) {
    return this.authService.forgetPassword(body.email);
  }
  @Post('admin-login')
  async adminLogin(@Body() body: LoginDto ) {
    return this.authService.login(body);
  }
 
}
