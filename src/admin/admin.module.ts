import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ParcelModule } from 'src/parcel/parcel.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ ParcelModule, UserModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}

