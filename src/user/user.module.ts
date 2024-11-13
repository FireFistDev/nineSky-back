import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../libs/entities/user.entity';
import { JwtStrategy } from 'libs/jwt/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from 'libs/guards/Jwt.Auth.Guard';
import { TransactionModule } from 'src/transaction/transaction.module';
import { Parcel } from 'libs/entities/parcel.entity';
import { Declaration } from 'libs/entities/declaration.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User ,Parcel, Declaration]), 
  TransactionModule,
 ],
  controllers: [UserController],
  providers: [UserService ,JwtStrategy, JwtGuard],
  exports: [UserService]
})
export class UserModule {}

