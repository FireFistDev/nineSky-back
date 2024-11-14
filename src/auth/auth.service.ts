import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';
import { User } from 'libs/entities/user.entity';
import { EntityManager } from 'typeorm';
import { UserDetails } from 'libs/entities/userDetails.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly entityManager: EntityManager,
    private readonly mailerService: MailerService
  ) { }
  async register(registerDto: RegisterDto) {
    try {
      return await this.entityManager.transaction(async (transactionalEntityManager) => {

        const user = transactionalEntityManager.create(User, {
          email: registerDto.email,
          password: await bcrypt.hash(registerDto.password, 10),
        });

        const createdUser = await transactionalEntityManager.save(user);
        const userDetails = transactionalEntityManager.create(UserDetails, {
          id: createdUser.id,
          user: user,
          first_name: registerDto.first_name,
          last_name: registerDto.last_name,
          phone_number: registerDto.phone_number,
          personal_number: registerDto.personal_number,
          office: registerDto.office,
          city: registerDto.city,
          address: registerDto.address,
        });

        await transactionalEntityManager.save(userDetails);

        const payload = {
          email: createdUser.email,
          sub: createdUser.id,
          accessLevel: createdUser.accessLevel,
        };

        return {
          access_token: this.jwtService.sign(payload),
        };
      });
    } catch (error) {
      if (error.code === '23505') { 
        throw new ConflictException('user With this email or personal number already exists');
      } else if (error.code) {
        throw new InternalServerErrorException(`Database error: ${error.detail}`);
      } else {
        throw new InternalServerErrorException('Failed to register user.');
      }
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;

      const user = await this.entityManager.findOne(User, { where: { email } });

      let passwordValid = await bcrypt.compare(password, user.password);
      if (!user || !passwordValid) throw new UnauthorizedException('პაროლი ან  ელ-ფოსტა არასწორია.');

      const payload = {
        email: user.email,
        sub: user.id,
        accessLevel: user.accessLevel
      };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message)
      }
      throw new InternalServerErrorException('Login failed.');
    }
  }

  async forgetPassword(email: string) {
    const user = await this.entityManager.findOne(User, { where: { email } });
    if (!user) {
      throw new NotFoundException('მომხმარებელი ამ ელ-ფოსტით ვერ მოიძებნა.');
    }
    const payload = {
      email: user.email,
      sub: user.id,
      accessLevel: user.accessLevel,
    };
    const resetToken = this.jwtService.sign(payload);

    await this.mailerService.sendActivationEmail(resetToken, user.email);
  }

}
