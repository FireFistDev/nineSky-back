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

@Injectable()
export class ParcelService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Parcel)
    private readonly parcelRepository: Repository<Parcel>,
  ) { }

  async create(createParcelDto: CreateParcelDto): Promise<Parcel> {
    try {
      let owner = await this.userService.findOne({ id: createParcelDto.ownerId })
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
        let owner = await this.userService.findOne({ id: dto.ownerId })
        console.log(owner, dto.ownerId)
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
      throw new InternalServerErrorException('Failed to create parcels');
    }
  }


  async findAll(_data : getParcelDto ): Promise<Parcel[]> {
    try {
      const query = this.parcelRepository.createQueryBuilder('parcel')
      .leftJoin('parcel.owner', 'owner')
      .addSelect(['owner.id', 'owner.first_name' , 'owner.personal_number', 'owner.last_name']);
      if (_data.tracking_id) {
        query.andWhere('parcel.tracking_id = :tracking_id', { tracking_id: _data.tracking_id });
      }
      if (_data.owner) {
        query.andWhere('parcel.ownerId = :ownerId', { ownerId : _data.owner });
      }
      // Set pagination
      query.skip((_data.page - 1) * _data.limit).take(_data.limit);
      const data = await query.getMany();
      return data
    } catch (error) {
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
  async remove(id: number): Promise<void> {
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
