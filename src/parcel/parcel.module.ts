import { Module } from '@nestjs/common';
import { ParcelService } from './parcel.service';

import { Parcel } from 'libs/entities/parcel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Parcel])],
  providers: [ParcelService],
})
export class ParcelModule {}
