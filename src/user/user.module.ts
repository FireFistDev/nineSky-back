import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../libs/entities/user.entity';
import { LocalStrategy } from 'libs/jwt/local.strategy';
import { JwtStrategy } from 'libs/jwt/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from 'libs/guards/Jwt.Auth.Guard';
import { TransactionModule } from 'src/transaction/transaction.module';


@Module({
  imports: [TypeOrmModule.forFeature([User]), 
  TransactionModule,
  JwtModule.register({
    secret: process.env.JWT_SECRET, 
    signOptions: { expiresIn: '30d' },  
  }),

  
 ],
  controllers: [UserController],
  providers: [UserService, LocalStrategy ,JwtStrategy, JwtGuard,],
  exports: [UserService]
})
export class UserModule {}

