import { Module } from '@nestjs/common';
import { DeclarationService } from './declaration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Declaration } from 'libs/entities/Declaration.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Declaration])],
  providers: [DeclarationService],
  exports:[DeclarationService]
})
export class DeclarationModule {}
