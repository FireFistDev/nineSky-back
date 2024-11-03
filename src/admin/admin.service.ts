import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(searchTerm: string, page: number = 1, limit: number = 10): Promise<{ data: User[]; total: number; totalPages: number; currentPage: number }> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (searchTerm) {
      queryBuilder.where('user.email LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
                  .orWhere('user.first_name LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
                  .orWhere('user.last_name LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
                  .orWhere('user.personal_number LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
                  .orWhere('user.office LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
                  .orWhere('user.city LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
                  .orWhere('user.address LIKE :searchTerm', { searchTerm: `%${searchTerm}%` });
    }

    // Set pagination parameters
    const total = await queryBuilder.getCount(); // Total number of matching records
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;

    // Apply pagination
    queryBuilder.skip(offset).take(limit);

    // Execute query and return paginated results
    const data = await queryBuilder.getMany();

    return {
      data,
      total,
      totalPages,
      currentPage: page,
    };
  }
}
