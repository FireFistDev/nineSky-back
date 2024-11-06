import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeclarationDto } from './dto/create-declaration.dto';
import { UpdateDeclarationDto } from './dto/update-declaration.dto';
import { Declaration } from 'libs/entities/Declaration.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParcelService } from 'src/parcel/parcel.service';
import { Parcel } from 'libs/entities/parcel.entity';

@Injectable()
export class DeclarationService {
  constructor(
    @InjectRepository(Parcel)
    private parcelRepositry: Repository<Parcel>,
    @InjectRepository(Declaration)
    private declarationRepository: Repository<Declaration>,) { }


    async createDeclaration(createDeclarationDto: CreateDeclarationDto): Promise<Declaration> {
      const { type, price, website, comment, invoice_Pdf, parcel_Id } = createDeclarationDto;
  
      // Use repository's create method to initialize the entity
      const declaration = this.declarationRepository.create({
          type,
          price,
          website,
          comment: comment || null,
          invoice_Pdf: invoice_Pdf || null,
      });
  
      // If parcelId is provided, find the Parcel and link it
      if (parcel_Id) {
          const parcel = await this.parcelRepositry.findOne({ where: { tracking_id: parcel_Id } });
          if (!parcel) {
              throw new NotFoundException(`Parcel with tracking ID ${parcel_Id} not found.`);
          }
          declaration.parcel = parcel;
      }
  
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
