import {  Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { Repository } from 'typeorm';
import { Parcel } from 'libs/entities/parcel.entity';

import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { Flight } from 'libs/entities/flight.entity';
import { CreateFlightDto, UploadParcelsDto } from 'libs/dtos/parcelDtos.ts/UploadParcelsDto';
import { error } from 'console';
import { UpdateParcelDto } from 'libs/dtos/parcelDtos.ts/update-parcel.dto';


@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    
    @InjectRepository(Flight)
    private readonly flightRepositry: Repository<Flight>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Parcel)
    private readonly parcelRepository: Repository<Parcel>,
  ) { }

  async onModuleInit() {

      const admin =await this.userRepository.findOne({where : { email: process.env.ADMIN_EMAIL }})
      if(!admin){
        const admin = this.userRepository.create({
          password: process.env.ADMIN_PASSWORD,
          email: process.env.ADMIN_EMAIL,
          accessLevel: 3,
        })
        await this.userRepository.save(admin)
      }
    
  }
  async uploadParcels(data :UploadParcelsDto) {
    try {
      const createdFlight = await this.createFlight(data.flight_info)
      if(!createdFlight){
        throw new error('wrong with flight')
      }
      const parcels: Parcel[] = [];
      for (const parcel of data.parcels) {
        let owner = await this.userRepository.findOne({where : {  id: parcel.ownerId }})
        const createdParcel = this.parcelRepository.create({
          tracking_id: parcel.tracking_id,
          price: 100,  
          owner: owner ? owner : null,
          weight: parcel.weight,
          flight : createdFlight,
        })
        parcels.push(createdParcel);
      }
      return await this.parcelRepository.save(parcels);
    } catch (error) {
      throw new Error(error)
    }

  }
  async createFlight(createFlightDto : CreateFlightDto){
      const existingFlight = await this.flightRepositry.findOne({
        where : {flight_id : createFlightDto.flight_id}
      })
      if (existingFlight) {
        return existingFlight;
      }
      const flight = this.flightRepositry.create(createFlightDto)
      return await this.flightRepositry.save(flight)

  }


  async getAllParcel(_data: getParcelDto): Promise<{ parcels: Parcel[], totalPages: number, totalCount: number, currentPage: number }> {
    try {
        const {
            tracking_id = '',
            ownerId = null,     
            page = 1,          
            limit = 10         
        } = _data;

        const query = this.parcelRepository.createQueryBuilder('parcel')
        .leftJoin('parcel.owner', 'owner')
        .leftJoinAndSelect('parcel.declaration', 'declaration')
        .addSelect(['owner.id']);
        if (tracking_id) {
            query.andWhere('parcel.tracking_id = :tracking_id', { tracking_id });
        }
        if (ownerId) {
            query.andWhere('parcel.ownerId = :ownerId', { ownerId});
        }

        const totalCount = await query.getCount();

        // Set pagination
        query.skip((page - 1) * limit).take(limit);

        // Fetch parcels with related owner information
        const parcels = await query.getMany();

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / limit);

        return {
            parcels,
            totalPages,
            totalCount,
            currentPage: page
        };
    } catch (error) {
        console.error('Error fetching parcels:', error);
        throw new InternalServerErrorException('Failed to retrieve parcels');
    }
}
  async updateParcel(id: string, updateParcelDto: UpdateParcelDto): Promise<Parcel> {
    try {
      const parcel = await this.parcelRepository.preload({
        tracking_id: id,
        ...updateParcelDto,
      });

      if (!parcel) {
        throw new NotFoundException(`Parcel with ID ${id} not found`);
      }

      return await this.parcelRepository.save(parcel);
    } catch (error) {
      console.error(error); // Log the error for debugging
      throw new InternalServerErrorException(
        `Failed to update parcel with ID ${id}: ${error.message}`,
      );
    }
  }
  async deleteParcel(id: string): Promise<void> {
    try {
      const result = await this.parcelRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`Parcel with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete parcel with ID ${id}`,
      );
    }
  }
  async getUsers(data: getUserDto): Promise<{ users: User[], totalPages: number, totalCount: number, currentPage: number }> {
    try {
        const {
            personalNumber = '',
            page = 1,            
            limit = 10          
        } = data;

        const query = this.userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.userDetails', 'userDetails')
        .leftJoin('user.parcels', 'parcel')
        .addSelect(['parcel.tracking_id']);

        if (personalNumber) {
            query.andWhere('user.personal_number = :personal_number', { personal_number: personalNumber });
        }

        const totalCount = await query.getCount();

        query.skip((page - 1) * limit).take(limit);
        const users = await query.getMany();
        const totalPages = Math.ceil(totalCount / limit);

        return {
            users,
            totalPages,
            totalCount,
            currentPage: page
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
}
  async updateUser(id: string, data: UpdateUserDto) {
    const { email , password  , first_name , last_name , phone_number, city , address} = data;
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['userDetails'], // Ensures userDetails are loaded

    });
    const createdUser =  this.userRepository.create({email,password,userDetails : {first_name, last_name,phone_number,city,address}})
    await this.userRepository.save(createdUser);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      await this.userRepository.delete(id);
    } catch (error) {
      console.error('Error removing user:', error);
      throw new Error(error.message);
    }
  }

}