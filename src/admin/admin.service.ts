import {  ConflictException, Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { Repository } from 'typeorm';
import { Parcel } from 'libs/entities/parcel.entity';

import { UpdateUserDto } from 'libs/dtos/UserDto.ts/update-user.dto';
import { Flight } from 'libs/entities/flight.entity';
import {UploadParcelsDto } from 'libs/dtos/parcelDtos.ts/UploadParcelsDto';
import { UpdateParcelDto } from 'libs/dtos/parcelDtos.ts/update-parcel.dto';
import { Price } from 'libs/entities/prices.entity';
import { CreateFlightDto } from 'libs/dtos/flightDtos/createFlightDto';
import { PriceDto } from 'libs/dtos/PriceDto/updatePriceDto';
import { FlightFrom } from 'libs/enums/flightsFrom.enum';


@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    
    @InjectRepository(Flight)
    private readonly flightRepositry: Repository<Flight>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Parcel)
    private readonly parcelRepository: Repository<Parcel>,
    @InjectRepository(Price)
    private readonly PriceRepository: Repository<Price>,
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
      let price =await this.PriceRepository.findOne({where : { id : process.env.PRICE_ID }})
      if(!price){
         const price =  this.PriceRepository.create({ id : process.env.PRICE_ID, China: 9.90, Turkey: 3.00})
        await this.PriceRepository.save(price)
      } 
    
  }
  async uploadParcels(data :UploadParcelsDto) {
    try {
      const Flight = await this.createFlight(data.flight_info)
      if(!Flight){
        throw new ConflictException(`problem with flight`)
      }
      const price = await this.PriceRepository.findOne({where : { id : "1" }})
      if(!Flight){
        throw new NotFoundException(`Prices not found`)
      }

      const parcels: Parcel[] = [];

      for (const parcel of data.parcels) {
        let owner = await this.userRepository.findOne({where : {  id: parcel.ownerId }})
        if(!owner){
          throw new ConflictException(`owoner with this id ${parcel.ownerId} does not exist`)
        }
        const createdParcel = this.parcelRepository.create({
          id: parcel.tracking_id,
          price: Flight.flight_from === FlightFrom.CHINA ? parcel.weight * price.China : parcel.weight * price.Turkey,  
          owner: owner ? owner : null,
          weight: parcel.weight,
          flight : Flight,
        })
        parcels.push(createdParcel);
      }
      const createdParcel =  await this.parcelRepository.save(parcels);
      if(!createdParcel){
        throw new ConflictException(createdParcel)
      }
      return createdParcel
    } catch (error) {
      throw new ConflictException(error.message);
    
    }

  }
  async createFlight(createFlightDto : CreateFlightDto){
      const existingFlight = await this.flightRepositry.findOne({
        where : {flight_id : createFlightDto.flight_id}
      })
      if (existingFlight) {
        return existingFlight;
      }
      const newFlight = this.flightRepositry.create(createFlightDto)
      return await this.flightRepositry.save(newFlight)

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
  async getUsers(data: getUserDto) {
    try {
        const {
            personalNumber = '',
            page = 1,            
            limit = 10          
        } = data;

        const query = this.userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.userDetails', 'userDetails',)
        .leftJoinAndSelect('user.transactions', 'transactions',)
        
        if (personalNumber) {
            query.andWhere('user.personal_number = :personal_number', { personal_number: personalNumber });
        }

        const totalCount = await query.getCount();
        query.skip((page - 1) * limit).take(limit);
        const users = await query.getMany();
        const totalPages = Math.ceil(totalCount / limit);
        
        const parsedUser = users.map((user2) =>{
          const  { transactions , balance , ...rest} = user2;

          return {
            ...rest,
            balance,
          }
        })
        return {
          parsedUser,
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
    const { email, password, first_name, last_name, phone_number, city, address ,office , personal_number } = data;
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['userDetails'], // Ensures userDetails are loaded
    });

    if (!user) {
      throw new Error(`User with ID ${id} not found.`);
    }
    user.email = email ?? user.email;
    user.password = password ?? user.password;
      user.userDetails.first_name = first_name ?? user.userDetails.first_name;
      user.userDetails.last_name = last_name ?? user.userDetails.last_name;
      user.userDetails.phone_number = phone_number ?? user.userDetails.phone_number;
      user.userDetails.city = city ?? user.userDetails.city;
      user.userDetails.address = address ?? user.userDetails.address;
      user.userDetails.personal_number = personal_number ?? user.userDetails.personal_number;
      user.userDetails.office = office ?? user.userDetails.office;
      const updatedUser = await this.userRepository.save(user);
      return updatedUser

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



  async updatePrice(data : PriceDto ) : Promise<void> {
    try {
      const {china , turkey } = data;
      const PRICES = await this.PriceRepository.findOne({
        where: {  id :  process.env.PRICE_ID},
      
      });
      PRICES.China = china ?? PRICES.China
      PRICES.Turkey = turkey ?? PRICES.Turkey
      this.PriceRepository.save(PRICES);
    } catch (error) {
      
    }
  }

}