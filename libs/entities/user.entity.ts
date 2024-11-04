import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Parcel } from './parcel.entity';
import { AccessLevel } from 'libs/enums/accese.levels.enum';
import { Transaction } from './transactions.entity';
import { TransactionType } from 'libs/enums/transactions.enum';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  password: string;
  @Column({ unique: true })
  email: string;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column()
  phone_number: number;
  @Column({ unique: true })
  personal_number: string;
  @Column()
  office: string;
  @Column()
  city: string;
  @Column()
  address: string;
  @OneToMany(() => Parcel, (parcel) => parcel.owner)
  parcels: Parcel[];  
  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
  @Column({ nullable: true ,  default: 0 })
  accessLevel: number;

  get isAdmin(): boolean {
    return this.accessLevel >= AccessLevel.ADMIN;
  }
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
