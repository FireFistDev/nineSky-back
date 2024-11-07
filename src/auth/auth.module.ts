import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from 'src/mailer/mailer.module';
import { User } from 'libs/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetails } from 'libs/entities/userDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserDetails]),
    MailerModule,
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '60m' },
    }),
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
