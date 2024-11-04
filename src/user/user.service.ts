import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../libs/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }


  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.save(createUserDto);
      console.log('User created:', user);
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error(error.message);
    }
  }

  async findAll(data : getUserDto): Promise<User[]> {
    try {
      
      const {
        personalNumber = '', // Default to empty string if not provided
        page = 1,            // Default to 1 if not provided
        limit = 2            // Default to 5 if not provided
    } = data;

      const query = this.userRepository.createQueryBuilder('user')
        .leftJoin('user.parcels', 'parcel')
        .addSelect(['parcel.tracking_id',]);
      // Apply filter for personal number if provided
      if (data.personalNumber) {
        query.andWhere('user.personal_number = :personal_number', { personal_number: personalNumber });
      }
      query.skip((page - 1) * limit).take(limit);
        // Fetch users and their related parcels and transactions
        const users = await query.getMany();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }


  async findOne(criteria: { [key: string]: any }): Promise<User> {

    console.log(criteria)
    try {

      const user = await this.userRepository.findOne({
        where: criteria,
        relations: ['transactions',],
      });
      if (!user) {
        throw new NotFoundException('მომხმარებელი ამ ID-ით ვერ მოიძებნა.');
      }
      return { ...user, balance: user.balance, isAdmin: user.isAdmin }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message)

      }
      throw new InternalServerErrorException('Internal server error.');

    }
  }

  async update(id: string, updateUserDto: any): Promise<any> {
    try {
      console.log('Updating user with ID:', id);  // Add this line
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('მომხმარებელი ამ ID-ით ვერ მოიძებნა.');
      }
      await this.userRepository.update(id, updateUserDto);
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('Internal server error.');
    }
  }

  async remove(id: string): Promise<void> {
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
