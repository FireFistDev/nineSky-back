import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService
  ) { }
  async register(registerDto: RegisterDto) {
    try {
      const registeredUser = await this.userService.create(registerDto);
      const payload = {email: registeredUser.email, sub: registeredUser.id, AccessLevel :registeredUser.accessLevel};

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {

      if (error instanceof ConflictException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to register user.');
      }
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.userService.findOne({ email });
      // const passwordValid = await bcrypt.compare(password, user.password);
      const passwordValid = password
      if (!user || !passwordValid) {
        throw new UnauthorizedException('პაროლი ან  ელ-ფოსტა არასწორია.');
      }
      console.log(user)
      const payload = { username: user?.first_name, email: user.email, userId: user.id,level : user.accessLevel };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error
      }
      throw new InternalServerErrorException('Login failed.');
    }
  }

  async forgetPassword(email: string) {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new NotFoundException('მომხმარებელი ამ ელ-ფოსტით ვერ მოიძებნა.');
    }
    const payload = { email: user.email, sub: user.id };
    const resetToken = this.jwtService.sign(payload);

    await this.mailerService.sendActivationEmail(resetToken, user.email);
  }

}
