import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateParcelDto } from './dto/create-parcel.dto';
import { UpdateParcelDto } from './dto/update-parcel.dto';
import { Parcel } from 'libs/entities/parcel.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'libs/entities/user.entity';

@Injectable()
export class ParcelService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Parcel)
    private readonly parcelRepository: Repository<Parcel>,
  ) { }

  async create(createParcelDto: CreateParcelDto): Promise<Parcel> {
    try {
      let owner = await this.userRepository.findOne({where: { id : createParcelDto.ownerId}})
      if (!owner) return owner = null
      const parcel = this.parcelRepository.create({ ...createParcelDto, owner });
      return await this.parcelRepository.save(parcel);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create a new parcel');
    }
  }

  async createMany(createParcelDtos: CreateParcelDto[]): Promise<Parcel[]> {
    try {

      const parcels: Parcel[] = [];
      for (const dto of createParcelDtos) {
        let owner = await this.userRepository.findOne({where : {  id: dto.ownerId }})
        const parcel = this.parcelRepository.create({
          tracking_id: dto.tracking_id,
          flight_id: dto.flight_id,
          flight_from: dto.flight_from,
          arrived_at: dto.arrived_at,
          weight: dto.weight,
          vol_weight: dto.vol_weight,
          price: dto.price,
          owner: owner ? owner : null, // Set user to null if not found
        });


        parcels.push(parcel);
      }

      return await this.parcelRepository.save(parcels);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }


  async findAll(_data: getParcelDto): Promise<{ parcels: Parcel[], totalPages: number, totalCount: number, currentPage: number }> {
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
        .addSelect(['owner.personal_number']);
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


  async findOne(id: string): Promise<Parcel> {
    try {
      const parcel = await this.parcelRepository.findOneBy({ tracking_id: id });
      if (!parcel) {
        throw new NotFoundException(`Parcel with ID ${id} not found`);
      }
      return parcel;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve parcel with ID ${id}`,
      );
    }
  }

  async update(id: string, updateParcelDto: UpdateParcelDto): Promise<Parcel> {
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
  async remove(id: string): Promise<void> {
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
}
