import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { FlightModule } from 'src/flight/flight.module';
import { ParcelModule } from 'src/parcel/parcel.module';

@Module({
  imports: [ FlightModule , ParcelModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
