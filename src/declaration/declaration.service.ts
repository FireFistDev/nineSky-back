import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeclarationDto } from './dto/create-declaration.dto';
import { UpdateDeclarationDto } from './dto/update-declaration.dto';
import { Declaration } from 'libs/entities/Declaration.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parcel } from 'libs/entities/parcel.entity';

@Injectable()
export class DeclarationService {
  constructor(
    @InjectRepository(Parcel)
    private parcelRepository: Repository<Parcel>,
    @InjectRepository(Declaration)
    private declarationRepository: Repository<Declaration>,) { }


  async createDeclaration(createDeclarationDto: CreateDeclarationDto) {
    const { type, price, website, comment, invoice_Pdf, tracking_id } = createDeclarationDto;
    const declaration = this.declarationRepository.create({
      type,
      price,
      website,
      comment: comment || null,
      invoice_Pdf: invoice_Pdf || null,
    });
    const parcel = await this.parcelRepository.findOne({ where: { tracking_id } });
    declaration.parcel = parcel;

    return this.declarationRepository.save(declaration);
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
