import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parcel } from 'libs/entities/parcel.entity';
import { User } from 'libs/entities/user.entity';
import { Flight } from 'libs/entities/flight.entity';
import { Price } from 'libs/entities/prices.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parcel, User, Flight, Price])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}

