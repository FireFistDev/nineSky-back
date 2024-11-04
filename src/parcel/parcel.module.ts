import { Module } from '@nestjs/common';
import { ParcelService } from './parcel.service';

import { Parcel } from 'libs/entities/parcel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  
  exports :[ParcelService],
  imports: [TypeOrmModule.forFeature([Parcel]), UserModule],
  providers: [ParcelService],
})
export class ParcelModule {}
