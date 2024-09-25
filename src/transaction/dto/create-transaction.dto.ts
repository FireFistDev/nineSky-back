import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { TransactionType } from 'libs/enums/transactions.enum';


export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  transactionType: TransactionType;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
