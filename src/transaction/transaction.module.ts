import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from 'libs/entities/transactions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([Transaction])],
  exports: [TransactionService],
  providers: [TransactionService],
})
export class TransactionModule {}
