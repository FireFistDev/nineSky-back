import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { ParcelModule } from 'src/parcel/parcel.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAdminGuard } from 'libs/guards/jwt.Admin.Guard';

@Module({
  imports: [ ParcelModule, UserModule],
  controllers: [AdminController],
  providers: [AdminService , ],
})
export class AdminModule {}

