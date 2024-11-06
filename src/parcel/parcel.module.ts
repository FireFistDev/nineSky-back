import { Module } from '@nestjs/common';
import { ParcelService } from './parcel.service';

import { Parcel } from 'libs/entities/parcel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { User } from 'libs/entities/user.entity';

@Module({
  
  exports :[ParcelService],
  imports: [TypeOrmModule.forFeature([Parcel, User]), UserModule],
  providers: [ParcelService],
})
export class ParcelModule {}
