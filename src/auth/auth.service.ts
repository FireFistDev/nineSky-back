import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService : MailerService
  ) {}

  async register(registerDto: RegisterDto) {
    try {
    const registeredUser = await this.userService.create(registerDto);
    const payload = { username: registeredUser.email, sub: registeredUser.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  } catch (error) {
    // Catch and handle potential errors
    throw new InternalServerErrorException('Failed to register user.');
  }

  }

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.userService.findOne(undefined,email);
      // const passwordValid = await bcrypt.compare(password, user.password);
      const passwordValid = password
      if (!user || ! passwordValid) {
        throw new UnauthorizedException('Invalid credentials.');
      }
      const payload = { username: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Invalid credentials.');
      }
      throw new InternalServerErrorException('Login failed.');
    }
  }

  async forgetPassword(email : string){
    const user = await this.userService.findOne(undefined,email);
    if (!user) {
      throw new NotFoundException('User with this email does not exist.');
    }
    const payload = { email: user.email, sub: user.id };
    const resetToken = this.jwtService.sign(payload, {
      secret: 'reset-secret', // Use a separate secret for reset tokens
      expiresIn: '1h', // Token valid for 1 hour
    });

    await this.mailerService.sendActivationEmail(resetToken, user.email);
  }
  
}
