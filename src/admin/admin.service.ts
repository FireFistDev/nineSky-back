import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { Repository } from 'typeorm';
import { Parcel } from 'libs/entities/parcel.entity';

@Injectable()
export class AdminService {
  // constructor(

  // ) {}

  // async getUsers(): Promise<User[]> {
  // }

  // async createParcel() { 
  
  // }
}