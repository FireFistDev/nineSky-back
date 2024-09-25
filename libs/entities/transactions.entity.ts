import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn,  } from 'typeorm';
import { User } from './user.entity';
import { TransactionType } from 'libs/enums/transactions.enum';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  transactionType: TransactionType;
  @Column()
  userId: string; 

  @ManyToOne(() => User, (user) => user.transactions, { eager: false })
  @JoinColumn({ name: 'userId' }) 
  user: User;

  @CreateDateColumn()
  date: Date;

}