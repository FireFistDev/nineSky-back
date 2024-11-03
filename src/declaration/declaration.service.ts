import { Injectable } from '@nestjs/common';
import { CreateDeclarationDto } from './dto/create-declaration.dto';
import { UpdateDeclarationDto } from './dto/update-declaration.dto';
import { Declaration } from 'libs/entities/Declaration.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeclarationService {
  constructor(    @InjectRepository(Declaration)
  private declarationRepository: Repository<Declaration>,){}
  async create(createDeclarationDto: CreateDeclarationDto) {
  try {
    const {parcelId  , type , price ,website ,comment  } = createDeclarationDto;
    const  newDeclaration = this.declarationRepository.create({  type , price ,website ,comment })
    return await this.declarationRepository.save(newDeclaration);
  } catch (error) {
    throw new error;
  }
  }

  findAll() {
    return `This action returns all declaration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} declaration`;
  }

  update(id: number, updateDeclarationDto: UpdateDeclarationDto) {
    return `This action updates a #${id} declaration`;
  }

  remove(id: number) {
    return `This action removes a #${id} declaration`;
  }
}
