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

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
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
      return {...user, balance : user.balance , isAdmin : user.isAdmin}
    } catch (error) {
      if(error instanceof  NotFoundException){
       throw new NotFoundException(error.message)
         
      }
      throw new InternalServerErrorException('Internal server error.');

    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
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
