import { Injectable } from '@nestjs/common';
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
  ) {}

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

  async findOne(id?: string, email?: string): Promise<User> {
    try {
      let user: User;

      if (id) {
        user = await this.userRepository.findOneBy({ id });
      } else if (email) {
        user = await this.userRepository.findOneBy({ email });
      } else {
        throw new Error('Either ID or email must be provided.');
      }
  
      if (!user) {
        throw new Error(`User with ${id ? `ID ${id}` : `email ${email}`} not found`);
      }
  
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error(error.message);
    }
  }
  
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      await this.userRepository.update(id, updateUserDto);
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error(error.message);
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