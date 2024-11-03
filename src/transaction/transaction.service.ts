import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from 'libs/entities/transactions.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) { }
  create(createTransactionDto: CreateTransactionDto) {
    try {
   const transaction = this.transactionRepo.save(createTransactionDto);
      console.log(transaction ,  `transaction crreated` )
      return transaction

    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error(error.message);
    }
  }

  // findAll() {
  //   return `This action returns all transaction`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} transaction`;
  // }

  // update(id: number, updateTransactionDto: UpdateTransactionDto) {
  //   return `This action updates a #${id} transaction`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} transaction`;
  // }
}
