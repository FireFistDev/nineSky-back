import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../libs/entities/user.entity';
import { JwtAuthGuard } from 'libs/guards/Jwt.Auth.Guard';
import { Parcel } from 'libs/entities/parcel.entity';
import { Declaration } from 'libs/entities/declaration.entity';
import { Transaction } from 'libs/entities/transactions.entity';
import { JwtStrategy } from 'libs/jwt/jwt.strategy';


@Module({
  imports: [TypeOrmModule.forFeature([User, Parcel, Declaration, Transaction])],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard , JwtStrategy],
  exports: [UserService]
})
export class UserModule { }

