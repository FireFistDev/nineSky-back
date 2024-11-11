import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { UserDetails } from 'libs/entities/userDetails.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserDetails)
    private readonly userDetailsRepository: Repository<UserDetails>,
    private readonly jwtService: JwtService,
    private readonly entityManager: EntityManager, 
    private readonly mailerService: MailerService
  ) { }
  async register(registerDto: RegisterDto) {
    try {
      // Start a transaction using the entity manager
      return await this.entityManager.transaction(async (transactionalEntityManager) => {
        const userDetails = this.userDetailsRepository.create({
          first_name: registerDto.first_name,
          last_name: registerDto.last_name,
          phone_number: registerDto.phone_number,
          personal_number: registerDto.personal_number,
          office: registerDto.office,
          city: registerDto.city,
          address: registerDto.address,
        });

        const savedUserDetails = await transactionalEntityManager.save(userDetails);

        const user = this.userRepository.create({
          email: registerDto.email,
          password: registerDto.password, // Make sure to hash this password before saving!
          userDetails: savedUserDetails,
        });

        const createdUser = await transactionalEntityManager.save(user);

        const payload = {
          email: createdUser.email,
          sub: createdUser.id,
          AccessLevel: createdUser.accessLevel, // Make sure `accessLevel` exists on your User entity
        };

        return {
          access_token: this.jwtService.sign(payload),
        };
      });
    } catch (error) {

      if (error.message) {
        throw new ConflictException(error.detail);
      }
      throw new InternalServerErrorException('Failed to register user.');
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.userRepository.findOne({ where : {email } });
      let passwordValid = await bcrypt.compare(password, user.password);
      // passwordValid = password
      if (!user || !passwordValid) {
        throw new UnauthorizedException('პაროლი ან  ელ-ფოსტა არასწორია.');
      }
      const payload = {
        email: user.email,
        sub: user.id,
        AccessLevel: user.accessLevel
      };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new  UnauthorizedException(error.message)
      }
      throw new InternalServerErrorException('Login failed.');
    }
  }

  async forgetPassword(email: string) {
    const user = await this.userRepository.findOne({ where : {email } });
    if (!user) {
      throw new NotFoundException('მომხმარებელი ამ ელ-ფოსტით ვერ მოიძებნა.');
    }
    const payload = {
      email: user.email,
      sub: user.id,
      AccessLevel: user.accessLevel,
    };
    const resetToken = this.jwtService.sign(payload);

    await this.mailerService.sendActivationEmail(resetToken, user.email);
  }

}
