import { Module } from '@nestjs/common';
import { DeclarationService } from './declaration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Declaration } from 'libs/entities/Declaration.entity';
import { ParcelModule } from 'src/parcel/parcel.module';
import { Parcel } from 'libs/entities/parcel.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Declaration, Parcel])],
  providers: [DeclarationService],
  exports:[DeclarationService]
})
export class DeclarationModule {}
