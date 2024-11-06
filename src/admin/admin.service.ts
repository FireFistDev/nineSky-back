import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { Repository } from 'typeorm';
import { Parcel } from 'libs/entities/parcel.entity';
import { ParcelService } from 'src/parcel/parcel.service';
import { privateDecrypt } from 'crypto';
import { UserService } from 'src/user/user.service';
import { UpdateParcelDto } from 'src/parcel/dto/update-parcel.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';


@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    private readonly parcelService: ParcelService,
    private readonly userService: UserService,
  ) { }
  async onModuleInit() {
    try {
      await this.userService.findOne({ email: process.env.ADMIN_EMAIL })
    } catch (error) {
      await this.userService.create({
        password: process.env.ADMIN_PASSWORD,
        email: process.env.ADMIN_EMAIL,
        first_name: 'ADMIN',
        last_name: 'ADMINADZE',
        phone_number: "123456789",
        personal_number: '12345678910',
        office: 'saburtalo',
        city: 'tbilisi ',
        address: 'tbilisi',
        accessLevel: 3,
      })
    }

  }


  async createParcels(createParcelDto: any[]) {
    try {
      return await this.parcelService.createMany(createParcelDto)
    } catch (error) {
      throw new Error(error)
    }

  }

  async getParcels(data: getParcelDto): Promise<{ parcels: Parcel[], totalPages: number, totalCount: number, currentPage: number }> {
    try {
      return await this.parcelService.findAll(data)
    } catch (error) {
      throw new Error(error)
    }
  }
  async deleteParcel(id: string): Promise<void> {
    try {

      const result = await this.parcelService.remove(id);
    } catch (error) {
      throw new Error(error)
    }
  }
  async updateParcel(id: string, updateParcelDto: UpdateParcelDto): Promise<Parcel> {
    try {

      return await this.parcelService.update(id, updateParcelDto);
    } catch (error) {
      throw new Error(error)
    }

  }
  async getUsers(data: getUserDto) {
    const users = this.userService.findAll(data)
    return users;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    await this.userService.update(id, { ...data })
  }

  async deleteUser(id: string) {
    await this.userService.remove(id)
  }

}