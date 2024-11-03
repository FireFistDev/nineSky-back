import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { ParcelModule } from 'src/parcel/parcel.module';

@Module({
  imports: [  ParcelModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}

