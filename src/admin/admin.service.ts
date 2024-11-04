import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { Repository } from 'typeorm';
import { Parcel } from 'libs/entities/parcel.entity';
import { ParcelService } from 'src/parcel/parcel.service';
import { privateDecrypt } from 'crypto';
import { UserService } from 'src/user/user.service';
import { UpdateParcelDto } from 'src/parcel/dto/update-parcel.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly parcelService: ParcelService,
  ) {}

  async createParcels(createParcelDto : any[]){
    try {
      return await this.parcelService.createMany(createParcelDto)
    } catch (error) {
      throw new Error(error)
    }

  }
  
  async getParcels(data : getParcelDto): Promise<Parcel[]>{
    try {
      return  await this.parcelService.findAll(data)
    } catch (error) {
      throw new Error(error)
    }
  }
  async deleteParcel(id: number): Promise<void> {
    try{

      const result = await this.parcelService.remove(id);
      } catch (error) {
      throw new Error(error)
    }
  }
  async updateParcel(id: string, updateParcelDto: UpdateParcelDto): Promise<Parcel> {
    try{

    return await this.parcelService.update(id, updateParcelDto);
  } catch (error) {
    throw new Error(error)
  }
  }






















  getUsers(searchTerm: string, pageNumber: number, limitNumber: number) {
    throw new Error('Method not implemented.');
  }


}
    // if (searchTerm) {
    //   queryBuilder.where('user.email LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
    //               .orWhere('user.first_name LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
    //               .orWhere('user.last_name LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
    //               .orWhere('user.personal_number LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
    //               .orWhere('user.office LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
    //               .orWhere('user.city LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
    //               .orWhere('user.address LIKE :searchTerm', { searchTerm: `%${searchTerm}%` });
  //   // }

  // async createParcel(createParcelDto : any) { 
  
  // }
// }
