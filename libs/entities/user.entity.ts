import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Parcel } from './parcel.entity';
import { AccessLevel } from 'libs/enums/accese.levels.enum';
import { Transaction } from './transactions.entity';
import { TransactionType } from 'libs/enums/transactions.enum';
import { UserDetails } from './userDetails.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: AccessLevel,
    default: AccessLevel.USER,
  })
  accessLevel: AccessLevel;

  @OneToOne(() => UserDetails, { cascade: true })
  @JoinColumn()
  userDetails: UserDetails;

  @OneToMany(() => Parcel, (parcel) => parcel.owner)
  parcels: Parcel[];
  
  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  get balance(): number {
    const deposits = this.transactions
      .filter((transaction) => transaction.transactionType === TransactionType.DEPOSIT)
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    const payments = this.transactions
      .filter((transaction) => transaction.transactionType === TransactionType.PAYMENT)
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    return deposits - payments;
  }
}
